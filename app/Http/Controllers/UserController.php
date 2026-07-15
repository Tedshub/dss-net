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
        $user = auth()->user();

        if ($user->role === 'admin') {
            // Admin melihat daftar Kepala Sekolah (guest)
            $users = User::where('role', 'guest')->latest()->paginate(10);
        } else if ($user->role === 'guest') {
            // Kepala Sekolah melihat daftar Komitenya (sub_guest yang parent_id nya adalah ID guest ini)
            $users = User::where('parent_id', $user->id)->latest()->paginate(10);
        } else {
            abort(403);
        }

        return Inertia::render("Users/Index", [
            "users" => $users,
        ]);
    }

    public function show(User $user)
    {
        // Hanya admin yang bisa melihat detail sekolah (beserta komitenya)
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        // Ambil komite bawahan dari user guest ini
        $committees = User::where('parent_id', $user->id)->latest()->get();

        return Inertia::render("Users/Show", [
            "schoolUser" => $user,
            "committees" => $committees,
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
        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->has('role') ? $request->role : 'sub_guest',
        ];

        if ($request->has('school_name')) {
            $userData['school_name'] = $request->school_name;
        }
        
        // Jika yang membuat adalah guest (Kepala Sekolah), otomatis set parent_id
        if (auth()->user()->role === 'guest') {
            $userData['parent_id'] = auth()->user()->id;
            $userData['role'] = 'sub_guest'; // Guest hanya bisa buat sub_guest
        } else if ($request->has('parent_id')) {
            $userData['parent_id'] = $request->parent_id;
        }

        $user = User::create($userData);
    
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
        ];

        // Hanya admin yang bisa mengubah role
        if (auth()->user()->role === 'admin') {
            $userData['role'] = $request->role;
        }

        if ($request->has('school_name')) {
            $userData['school_name'] = $request->school_name;
        }
        
        if (auth()->user()->role === 'guest') {
            // Guest tidak bisa merubah parent_id komitenya
        } else if ($request->has('parent_id')) {
            $userData['parent_id'] = $request->parent_id;
        }

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