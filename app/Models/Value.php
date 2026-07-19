<?php
// app/Models/Value.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    protected $fillable = [
        'alternative_id',
        'criteria_id',
        'user_id',
        'value',
        'budget_min',
        'budget_max',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function alternative()
    {
        return $this->belongsTo(Alternative::class);
    }

    public function criteria()
    {
        return $this->belongsTo(Criteria::class);
    }
}
