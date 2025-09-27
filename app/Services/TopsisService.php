<?php
namespace App\Services;

use App\Models\Alternative;
use App\Models\Criteria;
use Illuminate\Support\Facades\Auth;

class TopsisService
{
    /**
     * Hitung TOPSIS per user login.
     *
     * @param int $userId
     * @return array
     */
    public function calculate(int $userId): array
    {
        // Ambil data hanya milik user login
        $criterias = Criteria::orderBy('id')->get();
        $alternatives = Alternative::where('user_id', $userId)
            ->with(['values'])
            ->orderBy('id')
            ->get();

        if ($criterias->isEmpty() || $alternatives->isEmpty()) {
            return [
                'error' => 'Opsi kebijakan belum tersedia. Silakan tambahkan opsi terlebih dahulu.'
            ];
        }

        // --- 1. Build Decision Matrix X
        $X = [];
        foreach ($alternatives as $alt) {
            $row = [];
            foreach ($criterias as $c) {
                $valModel = $alt->values->firstWhere('criteria_id', $c->id);
                $val = $valModel ? floatval($valModel->value) : 0.0;
                $row[$c->id] = $val;
            }
            $X[$alt->id] = $row;
        }

        // --- 2. Normalization denominator per criteria
        $denoms = [];
        foreach ($criterias as $c) {
            $sumSquares = 0.0;
            foreach ($alternatives as $alt) {
                $v = $X[$alt->id][$c->id] ?? 0.0;
                $sumSquares += ($v * $v);
            }
            $denoms[$c->id] = sqrt($sumSquares);
        }

        // --- 3. Matrix R (normalized)
        $R = [];
        foreach ($alternatives as $alt) {
            $row = [];
            foreach ($criterias as $c) {
                $den = $denoms[$c->id];
                $v = $X[$alt->id][$c->id] ?? 0.0;
                $r = $den > 0 ? ($v / $den) : 0.0;
                $row[$c->id] = $r;
            }
            $R[$alt->id] = $row;
        }

        // --- 4. Matrix Y (weighted normalized)
        $Y = [];
        foreach ($alternatives as $alt) {
            $row = [];
            foreach ($criterias as $c) {
                $weight = floatval($c->weight);
                $r = $R[$alt->id][$c->id];
                $row[$c->id] = $r * $weight;
            }
            $Y[$alt->id] = $row;
        }

        // --- 5. Ideal Positive (A+) & Negative (A-)
        $A_pos = [];
        $A_neg = [];
        foreach ($criterias as $c) {
            $valuesY = [];
            foreach ($alternatives as $alt) {
                $valuesY[] = $Y[$alt->id][$c->id];
            }
            if ($c->type === 'benefit') {
                $A_pos[$c->id] = max($valuesY);
                $A_neg[$c->id] = min($valuesY);
            } else {
                $A_pos[$c->id] = min($valuesY);
                $A_neg[$c->id] = max($valuesY);
            }
        }

        // --- 6. Distances
        $D_pos = [];
        $D_neg = [];
        foreach ($alternatives as $alt) {
            $sumPos = 0.0;
            $sumNeg = 0.0;
            foreach ($criterias as $c) {
                $y = $Y[$alt->id][$c->id];
                $sumPos += pow($y - $A_pos[$c->id], 2);
                $sumNeg += pow($y - $A_neg[$c->id], 2);
            }
            $D_pos[$alt->id] = sqrt($sumPos);
            $D_neg[$alt->id] = sqrt($sumNeg);
        }

        // --- 7. Preference value V
        $V = [];
        foreach ($alternatives as $alt) {
            $dpos = $D_pos[$alt->id];
            $dneg = $D_neg[$alt->id];
            $den = ($dpos + $dneg);
            $V[$alt->id] = $den > 0 ? ($dneg / $den) : 0.0;
        }

        // --- 8. Ranking
        $ranking = collect($alternatives)->map(function ($alt) use ($V) {
            return [
                'alternative_id' => $alt->id,
                'code' => $alt->code,
                'name' => $alt->name,
                'value' => $V[$alt->id] ?? 0.0,
            ];
        })->sortByDesc('value')->values()->all();

        // --- Readable
        $criteriaCodes = $criterias->mapWithKeys(fn($c) => [$c->id => $c->code])->toArray();
        $formatMatrixWithCodes = function(array $matrix) use ($alternatives, $criteriaCodes) {
            $out = [];
            foreach ($alternatives as $alt) {
                $row = ['alternative_id' => $alt->id, 'code' => $alt->code, 'name' => $alt->name];
                foreach ($matrix[$alt->id] as $cid => $val) {
                    $col = $criteriaCodes[$cid] ?? $cid;
                    $row[$col] = round($val, 6);
                }
                $out[] = $row;
            }
            return $out;
        };

        $X_readable = $formatMatrixWithCodes($X);
        $R_readable = $formatMatrixWithCodes($R);
        $Y_readable = $formatMatrixWithCodes($Y);

        $Apos_read = [];
        $Aneg_read = [];
        foreach ($criterias as $c) {
            $code = $c->code;
            $Apos_read[$code] = round($A_pos[$c->id], 6);
            $Aneg_read[$code] = round($A_neg[$c->id], 6);
        }

        $D_read = [];
        foreach ($alternatives as $alt) {
            $D_read[] = [
                'alternative_id' => $alt->id,
                'code' => $alt->code,
                'name' => $alt->name,
                'D_pos' => round($D_pos[$alt->id], 6),
                'D_neg' => round($D_neg[$alt->id], 6),
                'V' => round($V[$alt->id], 6),
            ];
        }

        return [
            'X' => $X_readable,
            'R' => $R_readable,
            'Y' => $Y_readable,
            'A_plus' => $Apos_read,
            'A_minus' => $Aneg_read,
            'D' => $D_read,
            'ranking' => $ranking,
            'raw' => [
                'denoms' => $denoms,
                'A_pos_raw' => $A_pos,
                'A_neg_raw' => $A_neg,
                'D_pos_raw' => $D_pos,
                'D_neg_raw' => $D_neg,
                'V_raw' => $V,
            ],
        ];
    }
}
