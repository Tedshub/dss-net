<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Menambahkan kriteria C11 (Anggaran) ke tabel criterias jika belum ada.
     */
    public function up(): void
    {
        $exists = DB::table('criterias')->where('code', 'C11')->exists();

        if (!$exists) {
            DB::table('criterias')->insert([
                'code'       => 'C11',
                'name'       => 'Anggaran Kegiatan',
                'type'       => 'cost',
                'weight'     => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('criterias')->where('code', 'C11')->delete();
    }
};
