<?php

namespace Database\Seeders;

use App\Models\Criteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $criterias = [
            [
                'code' => 'C1',
                'name' => 'Jumlah Penghasilan Orangtua (JPO)',
                'type' => 'cost',
                'weight' => 5,
            ],
            [
                'code' => 'C2',
                'name' => 'Jumlah Tanggungan Orangtua (JTO)',
                'type' => 'benefit',
                'weight' => 3,
            ],
            [
                'code' => 'C3',
                'name' => 'Jarak Tempat Tinggal (JTT)',
                'type' => 'cost',
                'weight' => 4,
            ],
            [
                'code' => 'C4',
                'name' => 'Nilai Rata-rata Ujian Nasional (UN)',
                'type' => 'benefit',
                'weight' => 2,
            ],
            [
                'code' => 'C5',
                'name' => 'Kesanggupan Tinggal di Asrama (AS)',
                'type' => 'benefit',
                'weight' => 5,
            ],
            [
                'code' => 'C6',
                'name' => 'Nilai Rata-rata Rapor (NR)',
                'type' => 'benefit',
                'weight' => 4,
            ],
            [
                'code' => 'C7',
                'name' => 'Prestasi Akademis (PA)',
                'type' => 'benefit',
                'weight' => 5,
            ],
            [
                'code' => 'C8',
                'name' => 'Prestasi Non Akademis (PNA)',
                'type' => 'benefit',
                'weight' => 5,
            ],
            [
                'code' => 'C9',
                'name' => 'Ketua Organisasi (KO)',
                'type' => 'benefit',
                'weight' => 4,
            ],
            [
                'code' => 'C10',
                'name' => 'Biaya Hidup (BP)',
                'type' => 'cost',
                'weight' => 3,
            ],
        ];

        foreach ($criterias as $criteria) {
            Criteria::create($criteria);
        }
    }
}
