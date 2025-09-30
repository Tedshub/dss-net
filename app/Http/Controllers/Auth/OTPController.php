<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserOtp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class OTPController extends Controller
{
    public function sendOtp(Request $request)
    {
        $user = $request->user();

        // ✅ CEK: Jika email sudah verified, langsung ke dashboard
        if ($user->email_verified_at) {
            session(['otp_verified' => true]);
            return redirect()->route('dashboard')->with('success', 'Email Anda sudah terverifikasi!');
        }
        // generate OTP random 6 digit
        $otp = rand(100000, 999999);

        // simpan ke DB
        UserOtp::updateOrCreate(
            ['user_id' => $user->id],
            [
                'otp' => $otp,
                'expires_at' => Carbon::now()->addMinutes(2),
                'updated_at' => Carbon::now(),
            ]
        );

        // kirim email
        Mail::to($user->email)->send(new \App\Mail\SendOtpMail($otp));

        return inertia('Auth/VerifyOtp', [
            'email' => $user->email,
        ]);
    }

    public function showVerifyForm(Request $request)
    {
        $user = $request->user();

        // ✅ CEK: Jika email sudah verified, langsung ke dashboard
        if ($user->email_verified_at) {
            session(['otp_verified' => true]);
            return redirect()->route('dashboard')->with('success', 'Email Anda sudah terverifikasi!');
        }

        return inertia('Auth/VerifyOtp', [
            'email' => $user->email,
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|digits:6',
        ]);

        $user = $request->user();
        $userOtp = UserOtp::where('user_id', $user->id)->first();

        if (!$userOtp) {
            // GANTI back() dengan redirect()->back()
            return redirect()->back()->withErrors(['otp' => 'OTP tidak ditemukan, silakan kirim ulang']);
        }

        $expiresAt = $userOtp->expires_at instanceof Carbon 
            ? $userOtp->expires_at 
            : Carbon::parse($userOtp->expires_at);
        
        $now = Carbon::now();

        \Log::info('Check OTP Debug', [
            'expires_at_carbon' => $expiresAt->toDateTimeString(),
            'now' => $now->toDateTimeString(),
            'isPast' => $expiresAt->isPast(),
        ]);

        // Cek expired
        if ($expiresAt->isPast()) {
            \Log::warning('OTP Expired');
            return redirect()->back()->withErrors(['otp' => 'OTP expired, silakan kirim ulang']);
        }

        // Cek valid
        if ((string)$userOtp->otp !== (string)$request->otp) {
            \Log::warning('OTP Invalid', [
                'expected' => $userOtp->otp,
                'received' => $request->otp,
            ]);
            return redirect()->back()->withErrors(['otp' => 'OTP tidak valid']);
        }

        // ✅ UPDATE: Set email_verified_at di table users
        if (!$user->email_verified_at) {
            $user->email_verified_at = now();
            $user->save();
            
            \Log::info('Email verified', ['user_id' => $user->id]);
        }

        // Jika valid → hapus OTP
        $userOtp->delete();

        // Tandai session verified
        session(['otp_verified' => true]);

        \Log::info('OTP Verified Successfully - Redirecting to dashboard');

        // REDIRECT KE DASHBOARD (tanpa back())
        return redirect()->route('dashboard');
    }

    public function resendOtp(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->back()->withErrors(['otp' => 'User tidak ditemukan.']);
        }

        // Generate OTP baru
        $otp = rand(100000, 999999);

        // Update atau buat ulang OTP di tabel user_otps
        UserOtp::updateOrCreate(
            ['user_id' => $user->id],
            [
                'otp' => $otp,
                'expires_at' => Carbon::now()->addMinutes(2),
                'updated_at' => Carbon::now(),
            ]
        );

        // Kirim OTP lewat email
        Mail::to($user->email)->send(new \App\Mail\SendOtpMail($otp));

        return redirect()->back()->with('success', 'OTP baru telah dikirim ke email Anda.');
    }
}