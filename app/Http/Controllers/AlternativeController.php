<?php
// app/Http/Controllers/AlternativeController.php

namespace App\Http\Controllers;

use App\Models\Alternative;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AlternativeController extends Controller
{
    public function __construct()
    {
        // Semua route di controller ini wajib login
        $this->middleware('auth');
    }

    /**
     * Tampilkan daftar alternatif milik user yang login
     */

    public function index()
    {
        $userId = Auth::id();

        $alternatives = Alternative::where('user_id', $userId)->get();

        // Hitung jumlah total kriteria
        $totalCriterias = \App\Models\Criteria::count();

        // Tambahkan status untuk setiap alternative
        $alternatives = $alternatives->map(function ($alternative) use ($totalCriterias) {
            // Hitung berapa banyak values yang tidak null
            $filledValuesCount = \App\Models\Value::where('alternative_id', $alternative->id)
                ->whereNotNull('value')
                ->count();

            // Status: jika semua kriteria terisi maka "completed", jika tidak "incomplete"
            $alternative->status = ($filledValuesCount === $totalCriterias && $totalCriterias > 0)
                ? 'completed'
                : 'incomplete';

            $alternative->filled_values_count = $filledValuesCount;
            $alternative->total_criterias = $totalCriterias;

            return $alternative;
        });

        return Inertia::render('Alternatives/Index', [
            'alternatives' => $alternatives,
        ]);
    }

    /**
     * Form tambah alternatif baru
     */
    public function create()
    {
        return Inertia::render('Alternatives/Create');
    }

    /**
     * Simpan alternatif baru ke database
     */

    public function store(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'code' => 'required|string|max:10|unique:alternatives,code,NULL,id,user_id,' . $userId,
            'name' => 'required|string|max:255',
        ]);

        $alternative = Alternative::create([
            'code' => $request->code,
            'name' => $request->name,
            'user_id' => $userId,
        ]);

        // Redirect ke halaman daftar penilaian
        return redirect()->route('alternatives.list', $alternative)
            ->with('success', 'Opsi berhasil dibuat. Silakan isi daftar penilaian.');
    }

    /**
     * Detail alternatif
     */
    public function show(Alternative $alternative)
    {
        $this->authorizeAccess($alternative);

        $alternative->load('values.criteria');

        return Inertia::render('Alternatives/Show', [
            'alternative' => $alternative,
        ]);
    }

    /**
     * Form edit alternatif
     */
    public function edit(Alternative $alternative)
    {
        $this->authorizeAccess($alternative);

        return Inertia::render('Alternatives/Edit', [
            'alternative' => $alternative,
        ]);
    }

    /**
     * Update alternatif
     */
    public function update(Request $request, Alternative $alternative)
    {
        $this->authorizeAccess($alternative);

        // Validasi unik per user saat update
        $request->validate([
            'code' => 'required|string|max:10|unique:alternatives,code,' . $alternative->id . ',id,user_id,' . $alternative->user_id,
            'name' => 'required|string|max:255',
        ]);

        $alternative->update($request->only('code', 'name'));

        return redirect()->route('alternatives.index')
            ->with('success', 'Alternative updated successfully!');
    }

    /**
     * Hapus alternatif
     */
    public function destroy(Alternative $alternative)
    {
        $this->authorizeAccess($alternative);

        $alternative->delete();

        return redirect()->route('alternatives.index')
            ->with('success', 'Alternative deleted successfully!');
    }

    /**
     * Pastikan alternatif hanya bisa diakses pemiliknya
     */
    private function authorizeAccess(Alternative $alternative)
    {
        if ($alternative->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
    }

    /**
     * Tampilkan halaman daftar penilaian setelah create alternative
     */
    public function list(Alternative $alternative)
    {
        $this->authorizeAccess($alternative);

        $criterias = \App\Models\Criteria::all();

        return Inertia::render('Alternatives/List', [
            'alternative' => $alternative,
            'criterias' => $criterias,
        ]);
    }

    /**
     * Simpan hasil daftar penilaian ke tabel values
     */
    public function storeList(Request $request)
    {
        $userId = Auth::id();

        $request->validate([
            'alternative_id' => 'required|exists:alternatives,id',
            'answers' => 'required|array|min:10',
            'answers.*' => 'required|numeric'
        ]);

        // Pastikan alternative milik user ini
        $alternative = Alternative::where('id', $request->alternative_id)
            ->where('user_id', $userId)
            ->firstOrFail();

        // Ambil semua kriteria
        $criterias = \App\Models\Criteria::orderBy('code')->get();

        // Simpan setiap jawaban ke tabel values
        foreach ($request->answers as $itemId => $value) {
            // itemId = 1-10, map ke criteria berdasarkan urutan
            $criteriaIndex = $itemId - 1;

            if (isset($criterias[$criteriaIndex])) {
                \App\Models\Value::updateOrCreate(
                    [
                        'alternative_id' => $alternative->id,
                        'criteria_id' => $criterias[$criteriaIndex]->id,
                    ],
                    [
                        'value' => $value,
                    ]
                );
            }
        }

        return redirect()->route('alternatives.index')
            ->with('success', "Penilaian untuk opsi '{$alternative->name}' berhasil disimpan!");
    }
}
