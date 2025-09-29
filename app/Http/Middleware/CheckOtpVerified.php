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
        // Cukup cek session saja, JANGAN cek database
        // Karena OTP sudah dihapus setelah verifikasi berhasil
        if (!session('otp_verified')) {
            return redirect()->route('otp.verify.form')->withErrors([
                'otp' => 'Anda harus verifikasi OTP terlebih dahulu.'
            ]);
        }

        return $next($request);
    }
}