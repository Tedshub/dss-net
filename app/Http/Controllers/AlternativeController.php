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
        // Pastikan semua route di controller ini butuh auth
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        // tambahan guard (seharusnya sudah ditangani middleware)
        if (!$userId) {
            return redirect()->route('login');
        }

        $alternatives = Alternative::where('user_id', $userId)->get();

        return Inertia::render('Alternatives/Index', [
            'alternatives' => $alternatives
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Alternatives/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = Auth::id();
        if (!$userId) {
            abort(403, 'Unauthorized');
        }

        // validasi unique per user (boleh ada code yang sama di user lain)
        $request->validate([
            'code' => 'required|string|max:10|unique:alternatives,code,NULL,id,user_id,' . $userId,
            'name' => 'required|string|max:255',
        ]);

        Alternative::create([
            'code' => $request->code,
            'name' => $request->name,
            'user_id' => $userId,
        ]);

        return redirect()->route('alternatives.index')->with('success', 'Alternative created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Alternative $alternative)
    {
        $this->authorizeAccess($alternative);

        return Inertia::render('Alternatives/Show', [
            'alternative' => $alternative
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alternative $alternative)
    {
        $this->authorizeAccess($alternative);

        return Inertia::render('Alternatives/Edit', [
            'alternative' => $alternative
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alternative $alternative)
    {
        $this->authorizeAccess($alternative);

        // unique per user saat update: kecualikan record yang sedang diupdate
        $request->validate([
            'code' => 'required|string|max:10|unique:alternatives,code,' . $alternative->id . ',id,user_id,' . $alternative->user_id,
            'name' => 'required|string|max:255',
        ]);

        $alternative->update($request->only('code', 'name'));

        return redirect()->route('alternatives.index')->with('success', 'Alternative updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alternative $alternative)
    {
        $this->authorizeAccess($alternative);

        $alternative->delete();
        return redirect()->route('alternatives.index')->with('success', 'Alternative deleted successfully!');
    }

    /**
     * Cek apakah data milik user login
     */
    private function authorizeAccess(Alternative $alternative)
    {
        if ($alternative->user_id != Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
    }
}
