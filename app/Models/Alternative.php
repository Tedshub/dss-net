<?php
// app/Models/Alternative.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alternative extends Model
{
    protected $fillable = [
        'name',
        'code',
        'user_id',
    ];

    /**
     * Relasi ke User (pembuat alternative)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function values()
    {
        return $this->hasMany(Value::class);
    }
}
