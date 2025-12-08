<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules; // Penting untuk validasi password
use App\Notifications\WelcomeEmail;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        // Search logic bisa ditambahkan nanti jika perlu
        $users = User::latest()->paginate(10);

        return Inertia::render("Users/Index", [
            "users" => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render("Users/Create");
    }

    public function store(Request $request)
        {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:'.User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
    
            // 1. Simpan user ke variabel $user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
    
            // 2. Kirim Notifikasi Welcome Email
            // Kita kirimkan password mentah ($request->password) agar bisa ditampilkan di email
            try {
                $user->notify(new WelcomeEmail($request->password));
            } catch (\Exception $e) {
                // Opsional: Tangkap error jika email gagal kirim agar aplikasi tidak crash
                // Log::error("Gagal kirim email: " . $e->getMessage());
            }
    
            return redirect()->route('users.index')->with('message', 'User berhasil ditambahkan dan email telah dikirim.');
        }

    public function edit(User $user)
    {
        return Inertia::render("Users/Edit", [
            "user" => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $rules = [
            'name' => 'required|string|max:255',
            // Ignore ID user saat ini agar validasi unique tidak error saat update diri sendiri
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id, 
            'role' => 'required|string|in:admin,guest,sub_guest',
        ];

        // Jika password diisi, validasi passwordnya. Jika kosong, abaikan.
        if ($request->filled('password')) {
            $rules['password'] = ['confirmed', Rules\Password::defaults()];
        }

        $request->validate($rules);

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        // Hanya update password jika input tidak kosong
        if ($request->filled('password')) {
            $userData['password'] = Hash::make($request->password);
        }

        $user->update($userData);

        return redirect()->route('users.index')->with('message', 'User berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('message', 'User berhasil dihapus.');
    }
}