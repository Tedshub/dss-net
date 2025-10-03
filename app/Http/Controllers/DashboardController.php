<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Criteria;
use App\Models\Alternative;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        // Mengambil semua data kriteria dari database
        $criterias = Criteria::all();

        // Mengambil data alternatif berdasarkan user yang login
        $alternatives = [];
        if (Auth::check()) {
            $alternatives = Alternative::where('user_id', Auth::id())->get();
        }

        return Inertia::render('Dashboard', [
            'criterias' => $criterias,
            'alternatives' => $alternatives
        ]);
    }
}
