<?php
// database/migrations/2025_09_24_060117_create_criterias_table.php
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
        Schema::create('criterias', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // contoh: C1, C2, dst
            $table->string('name');
            $table->enum('type', ['benefit', 'cost'])->default('benefit');
            $table->decimal('weight', 8, 4)->default(0.0000); // bobot lebih aman pakai decimal
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('criterias');
    }
};
