<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserOtp;
use Illuminate\Support\Facades\Mail;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

    $request->session()->regenerate();

    $user = $request->user();

    // ✅ Jika email sudah verified, set session dan langsung ke dashboard
    if ($user->email_verified_at) {
        session(['otp_verified' => true]);
        return redirect()->intended(route('dashboard'));
    }

        // Generate OTP
        $otp = rand(100000, 999999);

        UserOtp::create([
            'user_id' => $user->id,
            'otp' => $otp,
            'expires_at' => now()->addMinutes(2),
        ]);

        // Kirim email OTP
        Mail::raw("Kode OTP Anda adalah: {$otp}", function ($message) use ($user) {
            $message->to($user->email)
                ->subject('Verifikasi OTP - Sistem Pendukung Keputusan');
        });

    // ✅ Jika belum verified, redirect ke halaman OTP
    return redirect()->route('otp.verify.form');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
