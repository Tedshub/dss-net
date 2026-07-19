<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('values', function (Blueprint $table) {
            // Estimasi minimal anggaran yang diisi oleh Kepala Sekolah
            $table->double('budget_min')->nullable()->after('value');
            // Estimasi maksimal anggaran yang diisi oleh Kepala Sekolah
            $table->double('budget_max')->nullable()->after('budget_min');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('values', function (Blueprint $table) {
            $table->dropColumn(['budget_min', 'budget_max']);
        });
    }
};
