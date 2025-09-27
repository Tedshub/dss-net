<?php

namespace App\Http\Controllers;

use App\Models\Value;
use App\Models\Alternative;
use App\Models\Criteria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ValueController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth'); // semua route harus login
    }

    /**
     * Display the assessment matrix
     * Menampilkan matriks penilaian dalam format tabel
     */
    public function index()
    {
        $user = Auth::user();

        // Ambil alternatif milik user
        $alternatives = Alternative::where('user_id', $user->id)->get();

        // Ambil semua kriteria (untuk admin atau sesuai requirement)
        $criterias = Criteria::all();

        // Ambil values yang sudah ada
        $existingValues = Value::whereHas('alternative', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->with(['alternative', 'criteria'])
            ->get()
            ->groupBy(function ($value) {
                return $value->alternative_id . '-' . $value->criteria_id;
            });

        // Buat matrix structure
        $matrix = [];
        foreach ($alternatives as $alternative) {
            $row = [
                'alternative' => $alternative,
                'values' => []
            ];

            foreach ($criterias as $criteria) {
                $key = $alternative->id . '-' . $criteria->id;
                $existingValue = $existingValues->get($key);

                $row['values'][] = [
                    'criteria' => $criteria,
                    'value' => $existingValue ? $existingValue->first()->value : null,
                    'alternative_id' => $alternative->id,
                    'criteria_id' => $criteria->id
                ];
            }

            $matrix[] = $row;
        }

        return Inertia::render('Values/Index', [
            'matrix' => $matrix,
            'criterias' => $criterias,
            'alternatives' => $alternatives,
        ]);
    }

    /**
     * Update or create multiple values at once (untuk batch update dari matrix)
     */
    public function updateMatrix(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'values' => 'required|array',
            'values.*.alternative_id' => 'required|exists:alternatives,id',
            'values.*.criteria_id' => 'required|exists:criterias,id',
            'values.*.value' => 'nullable|numeric',
        ]);

        foreach ($request->values as $valueData) {
            // Pastikan alternative milik user ini
            $alternative = Alternative::where('id', $valueData['alternative_id'])
                ->where('user_id', $user->id)
                ->firstOrFail();

            // Selalu create/update record, set value ke null jika kosong
            Value::updateOrCreate(
                [
                    'alternative_id' => $alternative->id,
                    'criteria_id' => $valueData['criteria_id'],
                ],
                [
                    'value' => ($valueData['value'] !== null && $valueData['value'] !== '')
                        ? $valueData['value']
                        : null,
                ]
            );
        }

        return redirect()->back()->with('success', 'Matriks penilaian berhasil disimpan!');
    }

    /**
     * Update single value (untuk inline editing)
     */
    public function updateSingle(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'alternative_id' => 'required|exists:alternatives,id',
            'criteria_id' => 'required|exists:criterias,id',
            'value' => 'nullable|numeric',
        ]);

        // Pastikan alternative milik user ini
        $alternative = Alternative::where('id', $request->alternative_id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Selalu create/update record, set value ke null jika kosong
        $value = Value::updateOrCreate(
            [
                'alternative_id' => $alternative->id,
                'criteria_id' => $request->criteria_id,
            ],
            [
                'value' => ($request->value !== null && $request->value !== '')
                    ? $request->value
                    : null,
            ]
        );

        $message = ($request->value !== null && $request->value !== '')
            ? 'Nilai berhasil disimpan'
            : 'Nilai berhasil dikosongkan';

        return redirect()->back()->with('success', $message);
    }

    /**
     * Nullify all values for specific alternative (kosongkan per baris)
     * Mengubah semua nilai menjadi null tanpa menghapus record
     */
    public function deleteAlternativeValues(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'alternative_id' => 'required|exists:alternatives,id',
        ]);

        // Pastikan alternative milik user ini
        $alternative = Alternative::where('id', $request->alternative_id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Kosongkan semua values untuk alternative ini (set ke null)
        $updatedCount = Value::where('alternative_id', $alternative->id)
            ->update(['value' => null]);

        // Jika tidak ada record, create records dengan nilai null untuk semua kriteria
        if ($updatedCount === 0) {
            $criterias = Criteria::all();
            $createdCount = 0;

            foreach ($criterias as $criteria) {
                Value::updateOrCreate(
                    [
                        'alternative_id' => $alternative->id,
                        'criteria_id' => $criteria->id,
                    ],
                    [
                        'value' => null,
                    ]
                );
                $createdCount++;
            }

            return redirect()->back()->with('success', "Berhasil mengosongkan {$createdCount} nilai untuk alternatif {$alternative->name}");
        }

        return redirect()->back()->with('success', "Berhasil mengosongkan {$updatedCount} nilai untuk alternatif {$alternative->name}");
    }

    /**
     * Nullify all values (kosongkan semua data)
     * Mengubah semua nilai menjadi null tanpa menghapus record
     */
    public function deleteAllValues()
    {
        $user = Auth::user();

        // Kosongkan semua values untuk alternatif milik user ini (set ke null)
        $updatedCount = Value::whereHas('alternative', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->update(['value' => null]);

        // Jika tidak ada record existing, create records dengan nilai null
        if ($updatedCount === 0) {
            $alternatives = Alternative::where('user_id', $user->id)->get();
            $criterias = Criteria::all();
            $createdCount = 0;

            foreach ($alternatives as $alternative) {
                foreach ($criterias as $criteria) {
                    Value::updateOrCreate(
                        [
                            'alternative_id' => $alternative->id,
                            'criteria_id' => $criteria->id,
                        ],
                        [
                            'value' => null,
                        ]
                    );
                    $createdCount++;
                }
            }

            return redirect()->back()->with('success', "Berhasil mengosongkan semua {$createdCount} nilai dari matriks penilaian");
        }

        return redirect()->back()->with('success', "Berhasil mengosongkan semua {$updatedCount} nilai dari matriks penilaian");
    }

    /**
     * Display a listing of the resource.
     * Hanya tampilkan data values milik alternatif user login
     */
    public function list()
    {
        $user = Auth::user();

        $values = Value::whereHas('alternative', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->with(['alternative', 'criteria'])
            ->get();

        return response()->json($values);
    }

    /**
     * Show the form for creating a new resource.
     * (Kalau pakai Inertia/Blade bisa return view di sini)
     */
    public function create()
    {
        $user = Auth::user();
        $alternatives = Alternative::where('user_id', $user->id)->get();
        $criterias = Criteria::all();

        return response()->json([
            'alternatives' => $alternatives,
            'criterias' => $criterias
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Biasanya tidak sering dipakai karena Values sudah otomatis dibuat
     */
    public function store(Request $request)
    {
        $request->validate([
            'alternative_id' => 'required|exists:alternatives,id',
            'criteria_id'    => 'required|exists:criterias,id',
            'value'          => 'required|numeric',
        ]);

        $user = Auth::user();

        // pastikan alternative milik user ini
        $alternative = Alternative::where('id', $request->alternative_id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $value = Value::updateOrCreate(
            [
                'alternative_id' => $alternative->id,
                'criteria_id'    => $request->criteria_id,
            ],
            [
                'value' => $request->value,
            ]
        );

        return response()->json([
            'message' => 'Value saved successfully',
            'data'    => $value
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Value $value)
    {
        $this->authorizeValue($value);

        return response()->json($value->load(['alternative', 'criteria']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Value $value)
    {
        $this->authorizeValue($value);

        return response()->json($value->load(['alternative', 'criteria']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Value $value)
    {
        $this->authorizeValue($value);

        $request->validate([
            'value' => 'nullable|numeric', // Changed to allow null
        ]);

        $value->update([
            'value' => $request->value,
        ]);

        return response()->json([
            'message' => 'Value updated successfully',
            'data'    => $value
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * Modified to nullify instead of delete
     */
    public function destroy(Value $value)
    {
        $this->authorizeValue($value);

        // Set value to null instead of deleting the record
        $value->update(['value' => null]);

        return response()->json([
            'message' => 'Value nullified successfully'
        ]);
    }

    /**
     * Pastikan value milik user login
     */
    private function authorizeValue(Value $value)
    {
        if ($value->alternative->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
    }

    /**
     * Helper method to ensure all value records exist for user's alternatives
     * Memastikan semua kombinasi alternative-criteria memiliki record (meski nilai null)
     */
    public function ensureValueRecords()
    {
        $user = Auth::user();

        $alternatives = Alternative::where('user_id', $user->id)->get();
        $criterias = Criteria::all();

        foreach ($alternatives as $alternative) {
            foreach ($criterias as $criteria) {
                Value::firstOrCreate(
                    [
                        'alternative_id' => $alternative->id,
                        'criteria_id' => $criteria->id,
                    ],
                    [
                        'value' => null,
                    ]
                );
            }
        }

        return redirect()->back()->with('success', 'Struktur matriks berhasil diinisialisasi');
    }
}
