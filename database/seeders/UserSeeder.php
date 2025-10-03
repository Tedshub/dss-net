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
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password123'), // ganti sesuai kebutuhan
            'role' => 'admin',
        ]);

        // Guest user
        User::create([
            'name' => 'Tedy',
            'email' => 'guest@gmail.com',
            'password' => Hash::make('password123'), // ganti sesuai kebutuhan
            'role' => 'guest',
        ]);
    }
}
