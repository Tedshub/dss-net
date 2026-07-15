<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use App\Models\UserOtp;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        $schools = User::where('role', 'guest')
            ->whereNotNull('school_name')
            ->get(['id', 'name', 'school_name']);
        return Inertia::render('Auth/Register', [
            'schools' => $schools,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'role' => 'required|in:guest,sub_guest',
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'school_name' => 'required_if:role,guest|nullable|string|max:255',
            'parent_id' => 'required_if:role,sub_guest|nullable|exists:users,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'school_name' => $request->role === 'guest' ? $request->school_name : null,
            'parent_id' => $request->role === 'sub_guest' ? $request->parent_id : null,
        ]);

        event(new Registered($user));

        // Generate OTP
        $otp = rand(100000, 999999);

        UserOtp::create([
        'user_id' => $user->id,
        'otp' => $otp,
        'expires_at' => now()->addMinutes(10),
    ]);

        // Kirim email OTP
        Mail::raw("Kode OTP Anda adalah: {$otp}", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Verifikasi OTP - Sistem Pendukung Keputusan');
        });

        // Jangan login dulu, tunggu OTP verifikasi
        return redirect()->route('otp.verify', ['email' => $user->email]);
    }
}
