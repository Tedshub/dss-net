<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Criteria extends Model
{
    use HasFactory;

    // Nama tabel (karena kamu pakai "criterias", bukan "criteria")
    protected $table = 'criterias';

    // Kolom yang boleh diisi mass-assignment
    protected $fillable = [
        'code',
        'name',
        'type',
        'weight',
    ];

    /**
     * Relasi ke tabel Values
     * Satu kriteria bisa punya banyak nilai (dari berbagai alternatif)
     */
    public function values()
    {
        return $this->hasMany(Value::class, 'criteria_id');
    }
}
