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
     * Endpoint JSON hasil TOPSIS (untuk AJAX calls)
     */
    public function index()
    {
        $userId = Auth::id();
        $result = $this->topsis->calculate($userId);

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
        $userId = Auth::id();
        $result = $this->topsis->calculate($userId);

        return Inertia::render('Calculation/Index', [
            'initialData' => $result
        ]);
    }
}
