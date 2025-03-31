<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class BrandController extends Controller
{

    public function getBrandData()
    {
        $brands = Brand::query()
        ->select('id','name','description')
        ->get();

        return response()->json(['data' => $brands]);
    }

    public function index()
    {
        return Inertia::render('brand/index', [
            'brands' => Brand::all(),
        ]);
    }

    public function create()
    {
        $brands = Brand::all();

        return Inertia::render('brand/Create', [
            'brands' => $brands
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        //
    }
}
