<?php

use App\Http\Controllers\Api\CustomerApiController;
use App\Http\Controllers\Api\RoleApiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PermissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users/getUsersData', [UserController::class, 'getUsersData']);
Route::apiResource('roles', RoleApiController::class)->only('index');
Route::get('/categories/getCategoryData', [CategoryController::class, 'getCategoryData']);
Route::get('/customers/getCustomerData', [CustomerController::class, 'getCustomerData']);
Route::get('/brands/getBrandData', [BrandController::class, 'getBrandData']);
Route::get('/products/getProductData', [ProductController::class, 'getProductData']);
Route::get('/permissions/getPermissionData', [PermissionController::class, 'getPermissionData']);
