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
     * Menampilkan daftar alternatif milik user login
     */
    public function index()
    {
        $userId = Auth::id();

        $alternatives = Alternative::where('user_id', $userId)
            ->with('values.criteria') // eager load untuk nanti tampilkan matriks nilai
            ->get();

        return Inertia::render('Alternatives/Index', [
            'alternatives' => $alternatives,
        ]);
    }

    /**
     * Form tambah alternatif baru
     */
    public function create()
    {
        // Ambil alternative terakhir
        $lastAlternative = Alternative::orderBy('id', 'desc')->first();

        if ($lastAlternative) {
            // Ambil angka terakhir dari kode
            $lastNumber = (int) filter_var($lastAlternative->code, FILTER_SANITIZE_NUMBER_INT);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        $nextCode = 'A' . $nextNumber;

        return Inertia::render('Alternatives/Create', [
            'nextCode' => $nextCode,
        ]);
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

        // Validasi, unique per user
        $request->validate([
            'code' => 'required|string|max:10|unique:alternatives,code,NULL,id,user_id,' . $userId,
            'name' => 'required|string|max:255',
        ]);

        Alternative::create([
            'code' => $request->code,
            'name' => $request->name,
            'user_id' => $userId,
        ]);

        return back()->withInput()->with('success', 'Alternative created successfully!');
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
}
