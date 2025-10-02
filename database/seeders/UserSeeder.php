<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Admin User',
            'email' => '22670154@upgris.ac.id',
            'password' => Hash::make('password123'), // ganti sesuai kebutuhan
            'role' => 'admin',
            'email_verified_at' => null,
        ]);

        // Guest user
        // User::create([
        //     'name' => 'Guest User',
        //     'email' => 'guest@gmail.com',
        //     'password' => Hash::make('password123'), // ganti sesuai kebutuhan
        //     'role' => 'guest',
        // ]);
    }
}
