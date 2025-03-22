<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use App\Models\Category;


Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('users', UserController::class);

    // Ruta para verificar si una categoría ya existe (solo nombre)
    Route::get('/categories/check-duplicate', function (Request $request) {
        $name = $request->query('name'); // Obtiene el nombre de la categoría desde la URL

        // Verifica si ya existe una categoría con ese nombre
        $exists = Category::where('name', $name)->exists();

        // Retorna una respuesta JSON con 'exists' en true o false
        return response()->json(['exists' => $exists]);
    });

    // Rutas para las categorías (CRUD completo)
    Route::resource('categories', CategoryController::class);

    // Ruta para el dashboard
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Ruta para roles
Route::get('/api/roles', [RoleController::class, 'index']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
