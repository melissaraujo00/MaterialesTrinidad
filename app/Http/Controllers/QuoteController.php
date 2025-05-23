<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Product;
use App\Models\Quote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuoteController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Quote::class, 'quote');
    }

     public function getQuoteData()
     {

        $data = Product::query()
        ->with('category', 'brand')
        ->get()
        ->map( function ($product){
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description'  => $product->description,
                'price'  => $product->price,
                'priceWithTax' => $product->priceWithTax,
                'discountPrice' => $product->discountPrice,
                'stock'  => $product->stock,
                'category_id'  => $product->category->name,
                'brand_id' => $product->brand->name,
                'stockMinimun' => $product->stockMinimun,
                'image'  => $product->image,
            ];
        });
        return response()->json(['data' => $data]);
     }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        return Inertia::render('quote/Index', [
            'permissions' => Permission::all(),
            'auth' => [
                'user' => [
                    'id' => $user?->id,
                    'name' => $user?->name,
                    'permissions' => $user ? $user->getAllPermissions()->pluck('name') : [],
                ]
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
