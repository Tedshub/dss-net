<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SchoolUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Membuat 3 sekolah, masing-masing dengan 1 Kepala Sekolah dan 3 Komite.
     */
    public function run(): void
    {
        $schools = [
            [
                'school_name' => 'SDN Merdeka 01',
                'kepala_sekolah' => [
                    'name' => 'Budi Santoso, S.Pd',
                    'email' => 'budi.santoso@sdnmerdeka01.sch.id',
                    'password' => 'Password@123',
                ],
                'komite' => [
                    ['name' => 'Hendra Wijaya',    'email' => 'hendra.w@gmail.com',    'password' => 'Password@123'],
                    ['name' => 'Siti Rahayu',      'email' => 'siti.rahayu@gmail.com', 'password' => 'Password@123'],
                    ['name' => 'Ahmad Fauzi',      'email' => 'ahmad.fauzi@gmail.com', 'password' => 'Password@123'],
                ],
            ],
            [
                'school_name' => 'SDN Harapan Bangsa 02',
                'kepala_sekolah' => [
                    'name' => 'Dewi Kurniawati, M.Pd',
                    'email' => 'dewi.kurniawati@harapanbangsa02.sch.id',
                    'password' => 'Password@123',
                ],
                'komite' => [
                    ['name' => 'Rizky Pratama',    'email' => 'rizky.pratama@gmail.com',  'password' => 'Password@123'],
                    ['name' => 'Rina Marlina',     'email' => 'rina.marlina@gmail.com',   'password' => 'Password@123'],
                    ['name' => 'Doni Setiawan',    'email' => 'doni.setiawan@gmail.com',  'password' => 'Password@123'],
                ],
            ],
            [
                'school_name' => 'SDN Cendekia Utama 03',
                'kepala_sekolah' => [
                    'name' => 'Agus Purnomo, S.Pd',
                    'email' => 'agus.purnomo@cendekiautama03.sch.id',
                    'password' => 'Password@123',
                ],
                'komite' => [
                    ['name' => 'Fitri Handayani',  'email' => 'fitri.handayani@gmail.com', 'password' => 'Password@123'],
                    ['name' => 'Wahyu Nugroho',    'email' => 'wahyu.nugroho@gmail.com',   'password' => 'Password@123'],
                    ['name' => 'Lestari Ningsih',  'email' => 'lestari.ningsih@gmail.com', 'password' => 'Password@123'],
                ],
            ],
        ];

        foreach ($schools as $schoolData) {
            // 1. Buat user Kepala Sekolah (role: guest) - gunakan firstOrCreate agar aman di-rerun
            $kepalaSekolah = User::firstOrCreate(
                ['email' => $schoolData['kepala_sekolah']['email']],
                [
                    'name'              => $schoolData['kepala_sekolah']['name'],
                    'password'          => Hash::make($schoolData['kepala_sekolah']['password']),
                    'role'              => 'guest',
                    'school_name'       => $schoolData['school_name'],
                    'email_verified_at' => now(),
                ]
            );

            $this->command->info("✅ Kepala Sekolah: {$kepalaSekolah->name} ({$schoolData['school_name']})");

            // 2. Buat user Komite (role: sub_guest)
            foreach ($schoolData['komite'] as $komiteData) {
                $komite = User::firstOrCreate(
                    ['email' => $komiteData['email']],
                    [
                        'name'              => $komiteData['name'],
                        'password'          => Hash::make($komiteData['password']),
                        'role'              => 'sub_guest',
                        'parent_id'         => $kepalaSekolah->id,
                        'email_verified_at' => now(),
                    ]
                );

                $this->command->info("   └─ Komite: {$komite->name}");
            }
        }

        $this->command->newLine();
        $this->command->info('🎉 Seeder berhasil! 3 Sekolah, 3 Kepala Sekolah, 9 Komite telah dibuat.');
        $this->command->info('🔑 Password semua akun: Password@123');
    }
}
