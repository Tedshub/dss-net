<?php
// routes/web.php
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CriteriaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AlternativeController;
use App\Http\Controllers\ValueController;
use App\Http\Controllers\TopsisController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard (auth & verified required)
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'otp.verified'])
    ->name('dashboard');

// Profile (auth required)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Value routes (authenticated users can access)
Route::middleware('auth', 'otp.verified')->group(function () {
    // Alternative routes (all roles can access)
    Route::resource('alternatives', AlternativeController::class);

    // Alternative assessment list routes
    Route::get('/alternatives/{alternative}/list', [AlternativeController::class, 'list'])
        ->name('alternatives.list');
    Route::post('/alternatives/list/store', [AlternativeController::class, 'storeList'])
        ->name('alternatives.list.store');

    // Matriks Penilaian
    Route::get('/values', [ValueController::class, 'index'])->name('values.index');
    Route::post('/values/matrix', [ValueController::class, 'updateMatrix'])->name('values.matrix');
    Route::post('/values/single', [ValueController::class, 'updateSingle'])->name('values.single');

    // Delete routes for values
    Route::post('/values/delete-alternative', [ValueController::class, 'deleteAlternativeValues'])->name('values.deleteAlternativeValues');
    Route::post('/values/delete-all', [ValueController::class, 'deleteAllValues'])->name('values.deleteAll');

    // Standard CRUD routes jika diperlukan
    Route::resource('values', ValueController::class)->except(['index']);

    Route::get('/topsis', [TopsisController::class, 'index']); // JSON hasil

    // Route baru untuk halaman tampilan
    Route::get('/calculation', [TopsisController::class, 'view'])->name('calculation.index');
    // atau bisa juga
    Route::get('/topsis/view', [TopsisController::class, 'view'])->name('topsis.view');
});

// Admin routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::resource('criterias', CriteriaController::class);
});

require __DIR__ . '/auth.php';
