<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('values', function (Blueprint $table) {
            $table->dropForeign(['alternative_id']);
            $table->dropUnique(['alternative_id', 'criteria_id']);
            $table->foreign('alternative_id')->references('id')->on('alternatives')->onDelete('cascade');
            
            $table->foreignId('user_id')->nullable()->after('id')->constrained('users')->onDelete('cascade');
        });

        // Update existing values to set user_id based on alternative's user_id
        DB::statement('UPDATE `values` v JOIN `alternatives` a ON v.alternative_id = a.id SET v.user_id = a.user_id');

        Schema::table('values', function (Blueprint $table) {
            $table->unique(['alternative_id', 'criteria_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('values', function (Blueprint $table) {
            $table->dropUnique(['alternative_id', 'criteria_id', 'user_id']);
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
            // Restore original constraint (might fail if duplicates exist without user_id)
            $table->unique(['alternative_id', 'criteria_id']);
        });
    }
};
