<?php

namespace App\Http\Controllers;

use App\Models\Criteria;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class CriteriaController extends Controller
{
    public function __construct()
    {
        // Pastikan user sudah ter-auth untuk semua method
        $this->middleware('auth');

        // Hanya admin yang boleh mengakses method-method ini
        $this->middleware('admin')->only(['create','store','show','edit','update','destroy']);
    }

    public function index()
    {
        $criterias = Criteria::orderBy('id')->get();
        return Inertia::render('Criterias/Index', [
            'criterias' => $criterias,
        ]);
    }

    public function create()
    {
        return Inertia::render('Criterias/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'   => ['required','string','max:50', Rule::unique('criterias','code')],
            'name'   => ['required','string','max:255'],
            'type'   => ['required', Rule::in(['benefit','cost'])],
            'weight' => ['required','numeric','min:0'],
        ]);

        Criteria::create($validated);

        return Redirect::route('criterias.index')->with('success', 'Criteria created.');
    }

    public function show(Criteria $criteria)
    {
        return Inertia::render('Criterias/Show', [
            'criteria' => $criteria,
        ]);
    }

    public function edit(Criteria $criteria)
    {
        return Inertia::render('Criterias/Edit', [
            'criteria' => $criteria,
        ]);
    }

    public function update(Request $request, Criteria $criteria)
    {
        $validated = $request->validate([
            'code'   => ['required','string','max:50', Rule::unique('criterias','code')->ignore($criteria->id)],
            'name'   => ['required','string','max:255'],
            'type'   => ['required', Rule::in(['benefit','cost'])],
            'weight' => ['required','numeric','min:0'],
        ]);

        $criteria->update($validated);

        return Redirect::route('criterias.index')->with('success', 'Criteria updated.');
    }

    public function destroy(Criteria $criteria)
    {
        $criteria->delete();
        return Redirect::route('criterias.index')->with('success', 'Criteria deleted.');
    }
}
