<?php
// database/seeders/ValuesSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Value;
use App\Models\Alternative;
use App\Models\Criteria;

class ValuesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $alternatives = Alternative::all();
        $criterias = Criteria::all();

        foreach ($alternatives as $alt) {
            foreach ($criterias as $crit) {
                Value::updateOrCreate(
                    [
                        'alternative_id' => $alt->id,
                        'criteria_id'    => $crit->id,
                    ],
                    [
                        // Bisa null, atau kasih nilai random buat contoh
                        'value' => fake()->randomFloat(2, 1, 10), // contoh nilai antara 1 - 10
                    ]
                );
            }
        }
    }
}
