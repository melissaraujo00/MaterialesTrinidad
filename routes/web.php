<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    // Ruta para verificar si una categoría ya existe (solo nombre)
    Route::resource('users', UserController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('customers', CustomerController::class);
    // Ruta para el dashboard
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
