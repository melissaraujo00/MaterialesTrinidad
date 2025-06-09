<?php

use App\Http\Controllers\Api\CustomerApiController;
use App\Http\Controllers\Api\RoleApiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\BusinessDataController;
use App\Http\Controllers\InventoryReport;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\MovementController;
use App\Http\Controllers\OfferController;
use App\Models\BusinessData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuoteController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users/getUsersData', [UserController::class, 'getUsersData']);
// Route::apiResource('roles', RoleApiController::class)->only('index');
Route::get('/categories/getCategoryData', [CategoryController::class, 'getCategoryData']);
Route::get('/customers/getCustomerData', [CustomerController::class, 'getCustomerData']);
Route::get('/brands/getBrandData', [BrandController::class, 'getBrandData']);
Route::get('/products/getProductData', [ProductController::class, 'getProductData']);
Route::get('/inventory/getInventoryData', [InventoryReport::class, 'getInventoryData']);
Route::get('/permissions/getPermissionData', [PermissionController::class, 'getPermissionData']);
Route::get('/roles/getRolData', [RoleController::class, 'getRolData']);
Route::get('/types/getTypeData', [TypeController::class, 'getTypeData']);
Route::get('/movements/getMovementData', [MovementController::class, 'getMovementData']);
Route::get('/businessData/getBusinessData',[BusinessDataController::class,'getBusinessData']);
Route::get('/quotes/getQuotesData',[QuoteController::class,'getQuoteData']);
Route::get('/offers/getOfferData', [OfferController::class, 'getOfferData']);


