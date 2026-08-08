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
        
        if ($user->role === 'sub_guest') {
            return redirect()->intended(route('alternatives.index'));
        }
        
        return redirect()->intended(route('dashboard'));
    }

    // ✅ Jika belum verified, redirect ke route send-otp untuk generate & kirim OTP
    return redirect()->route('otp.send');
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
