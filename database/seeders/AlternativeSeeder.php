<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Alternative;

class AlternativeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = [
            'Andika Pratama',
            'Dian Saraswati',
            'Rizky Akbar',
            'Siti Nurul Hidayah',
            'Fajar Nugraha',
            'Aulia Fitriani',
            'Irfan Kurniawan',
            'Anisa Putri',
            'Aditya Wijaya',
            'Laras Ayu',
            'Agung Purnama',
            'Tiara Maulida',
            'Bayu Prabowo',
            'Dewi Lestari',
            'Yoga Saputra',
            'Nita Permata',
            'Rizki Ramadhan',
            'Nurul Fadillah',
            'Faisal Rahman',
            'Nadya Utami',
        ];

        foreach ($names as $index => $name) {
            Alternative::create([
                'code'    => 'A' . ($index + 1), // otomatis A1, A2, dst
                'name'    => $name,
                'user_id' => 1,                  // semua alternatif milik user id 1
            ]);
        }
    }
}
