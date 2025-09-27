<?php
// app/Observers/AlternativeObserver.php
namespace App\Observers;

use App\Models\Alternative;
use App\Models\Criteria;
use App\Models\Value;

class AlternativeObserver
{
    /**
     * Handle the Alternative "created" event.
     */
    public function created(Alternative $alternative): void
    {
        $criterias = Criteria::all();

        foreach ($criterias as $criteria) {
            Value::create([
                'alternative_id' => $alternative->id,
                'criteria_id' => $criteria->id,
                'value' => null, // default null dulu
            ]);
        }
    }
}
