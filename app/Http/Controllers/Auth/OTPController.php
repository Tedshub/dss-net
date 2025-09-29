<?php

// app/Http/Controllers/Auth/OTPController.php
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

        // generate OTP random 6 digit
        $otp = rand(100000, 999999);

        // simpan ke DB
        UserOtp::updateOrCreate(
            ['user_id' => $user->id],
            ['otp' => $otp, 'expires_at' => Carbon::now()->addMinutes(1)]
        );

        // kirim email
        Mail::to($user->email)->send(new \App\Mail\SendOtpMail($otp));

        return inertia('Auth/VerifyOtp', [
            'email' => $user->email,
        ]);
    }
    public function showVerifyForm(Request $request)
    {
        return inertia('Auth/VerifyOtp', [
            'email' => $request->user()->email,
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|digits:6',
        ]);

        $user = $request->user();
        $userOtp = UserOtp::where('user_id', $user->id)->first();

        if (!$userOtp || $userOtp->expires_at < now()) {
            return back()->withErrors(['otp' => 'OTP expired, silakan kirim ulang']);
        }

        if ($userOtp->otp !== $request->otp) {
            return back()->withErrors(['otp' => 'OTP tidak valid']);
        }

        // Jika valid → hapus OTP
        $userOtp->delete();

        // Set session "verified"
        session(['otp_verified' => true]);

        return redirect()->route('dashboard');
    }
}

