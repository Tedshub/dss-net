<?php
// database/migrations/2025_09_24_060543_create_alternatives_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alternatives', function (Blueprint $table) {
            $table->id();
            $table->string('code'); // jangan unique global
            $table->string('name');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unique(['user_id', 'code']); // unik per user + code
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alternatives');
    }
};
