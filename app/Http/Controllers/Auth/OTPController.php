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

        // ✅ Jika sudah verified langsung ke dashboard
        if ($user->email_verified_at) {
            session(['otp_verified' => true]);
            return redirect()->route('dashboard')->with('success', 'Email Anda sudah terverifikasi!');
        }

        // generate OTP random 6 digit
        $otp = rand(100000, 999999);

        // simpan ke DB
        $userOtp = UserOtp::updateOrCreate(
            ['user_id' => $user->id],
            [
                'otp'        => $otp,
                'expires_at' => now()->addMinutes(2),
                'updated_at' => now(),
            ]
        );

        // kirim email
        Mail::to($user->email)->send(new \App\Mail\SendOtpMail($otp));

        // ✅ kirim expires_at ke React
        return inertia('Auth/VerifyOtp', [
            'email'      => $user->email,
            'expires_at' => $userOtp->expires_at,
        ]);
    }

    public function showVerifyForm(Request $request)
    {
        $user = $request->user();

        // ✅ Jika sudah verified langsung ke dashboard
        if ($user->email_verified_at) {
            session(['otp_verified' => true]);
            return redirect()->route('dashboard')->with('success', 'Email Anda sudah terverifikasi!');
        }

        $userOtp = UserOtp::where('user_id', $user->id)->first();

        return inertia('Auth/VerifyOtp', [
            'email'      => $user->email,
            'expires_at' => optional($userOtp)->expires_at,
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
            return redirect()->back()->withErrors(['otp' => 'OTP tidak ditemukan, silakan kirim ulang']);
        }

        $expiresAt = $userOtp->expires_at instanceof Carbon 
            ? $userOtp->expires_at 
            : Carbon::parse($userOtp->expires_at);

        // cek expired
        if ($expiresAt->isPast()) {
            return redirect()->back()->withErrors(['otp' => 'OTP expired, silakan kirim ulang']);
        }

        // cek valid
        if ((string)$userOtp->otp !== (string)$request->otp) {
            return redirect()->back()->withErrors(['otp' => 'OTP tidak valid']);
        }

        // ✅ update email_verified_at
        if (!$user->email_verified_at) {
            $user->email_verified_at = now();
            $user->save();
        }

        // hapus OTP
        $userOtp->delete();

        // tandai session verified
        session(['otp_verified' => true]);

        return redirect()->route('dashboard');
    }

    public function resendOtp(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->back()->withErrors(['otp' => 'User tidak ditemukan.']);
        }

        // generate OTP baru
        $otp = rand(100000, 999999);

        // update atau buat ulang OTP
        $userOtp = UserOtp::updateOrCreate(
            ['user_id' => $user->id],
            [
                'otp'        => $otp,
                'expires_at' => now()->addMinutes(2),
                'updated_at' => now(),
            ]
        );

        // kirim OTP via email
        Mail::to($user->email)->send(new \App\Mail\SendOtpMail($otp));

        // ✅ render ulang VerifyOtp dengan expires_at baru
        return inertia('Auth/VerifyOtp', [
            'email'      => $user->email,
            'expires_at' => $userOtp->expires_at,
            'success'    => 'OTP baru telah dikirim ke email Anda.',
        ]);
    }
}
