<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TopsisService;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TopsisController extends Controller
{
    protected TopsisService $topsis;

    public function __construct(TopsisService $topsis)
    {
        $this->topsis = $topsis;
        // semua route wajib login
        $this->middleware('auth');
    }

    /**
     * Resolves the owner ID for alternatives (headmaster's ID).
     */
    private function resolveOwnerId(): int
    {
        $user = Auth::user();
        return ($user->role === 'sub_guest' && $user->parent_id)
            ? $user->parent_id
            : $user->id;
    }

    /**
     * Endpoint JSON hasil TOPSIS (untuk AJAX calls)
     */
    public function index()
    {
        $result = $this->topsis->calculate($this->resolveOwnerId());
        return response()->json($result);
    }

    /**
     * Halaman tampilan TOPSIS menggunakan Inertia React
     */
    public function view()
    {
        return Inertia::render('Calculation/Index');
    }

    /**
     * Alternative: Jika ingin pass data langsung tanpa AJAX
     */
    public function viewWithData()
    {
        $result = $this->topsis->calculate($this->resolveOwnerId());

        return Inertia::render('Calculation/Index', [
            'initialData' => $result
        ]);
    }
}
