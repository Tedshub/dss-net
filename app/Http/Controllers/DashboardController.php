<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Criteria;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Mengambil semua data kriteria dari database
        $criterias = Criteria::all();

        return Inertia::render('Dashboard', [
            'criterias' => $criterias
        ]);
    }
}
