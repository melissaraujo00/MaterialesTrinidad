<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\BusinessDataController;
use App\Http\Controllers\InventoryReport;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\MovementController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\QuoteDetailController;
use App\Http\Controllers\QuoteReportController;
use App\Http\Controllers\TraderController;
use App\Http\Controllers\OfferController;


Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('customers', CustomerController::class);
    Route::post('customers/store-from-quote', [CustomerController::class, 'storeFromQuote'])->name('customers.storeFromQuote');
    Route::resource('brands', BrandController::class);
    Route::resource('products', ProductController::class);
    Route::resource('permissions', PermissionController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('types', TypeController::class);
    Route::resource('movements', MovementController::class);
    Route::resource('offers', OfferController::class);
    Route::resource('businessData', BusinessDataController::class)->parameters([
    'businessData' => 'businessData'
    ]);
    Route::resource('quotes',QuoteController::class);
    Route::get('quotes-confirmed', [QuoteController::class, 'confirmedQuotes'])->name('quotes.confirmed');
    Route::resource('quoteDetails',QuoteDetailController::class);

    // Ruta para el dashboard
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Rutas para descargar PDF
    Route::get('/inventoryIndex', [InventoryReport::class, 'index'])->name('inventoryIndex');
    Route::get('/inventoryReport', [InventoryReport::class, 'inventoryReport'])->name('inventoryReport');
     Route::get('/quotesReport/{quote}', [QuoteReportController::class, 'QuoteReport'])->name('quoteReport');
    Route::post('/quotes/send-whatsapp/{id}', [QuoteReportController::class, 'sendQuoteByWhatsapp'])->name('quotes.sendWhatsapp');
     Route::post('/quotes/send-whatsapp/{id}', [QuoteReportController::class, 'sendQuoteTextByWhatsapp'])->name('quotes.sendWhatsapp');
    Route::post('/quotes/send-whatsapp-text/{id}', [QuoteReportController::class, 'sendQuoteTextByWhatsapp']);


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
