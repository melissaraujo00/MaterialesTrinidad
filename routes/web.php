<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest')->name('home');


Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource(name: 'users', controller: UserController::class);


Route::get('/api/roles', [RoleController::class, 'index']);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
