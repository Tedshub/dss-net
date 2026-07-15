<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Menambahkan nilai 'sub_guest' ke ENUM kolom 'role' pada tabel users.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'guest', 'sub_guest') NOT NULL DEFAULT 'sub_guest'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Hapus user sub_guest terlebih dahulu sebelum rollback enum
        DB::statement("DELETE FROM users WHERE role = 'sub_guest'");
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'guest') NOT NULL DEFAULT 'guest'");
    }
};
