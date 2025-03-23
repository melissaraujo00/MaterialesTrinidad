<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoleController;





Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    // Ruta para verificar si una categoría ya existe (solo nombre)


    // Ruta para el dashboard
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Ruta para roles
Route::get('/api/roles', [RoleController::class, 'index']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
