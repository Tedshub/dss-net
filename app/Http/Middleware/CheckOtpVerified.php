<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckOtpVerified
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
     {
        $user = $request->user();

        // ✅ Jika email sudah verified, auto set session dan lanjutkan
        if ($user->email_verified_at) {
            if (!session('otp_verified')) {
                session(['otp_verified' => true]);
            }
            return $next($request);
        }

        // ✅ Jika session ada, lanjutkan
        if (session('otp_verified')) {
            return $next($request);
        }

        // ✅ Jika belum verified, redirect ke form OTP
        return redirect()->route('otp.verify.form')->withErrors([
            'otp' => 'Anda harus verifikasi OTP terlebih dahulu.'
        ]);
    }
}