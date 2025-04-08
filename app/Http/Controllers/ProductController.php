<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduct;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function getProductData()
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

    public function index()
    {
        return Inertia::render('product/Index', [
            'products' => Product::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $category = Category::all();
        $brand = Brand::all();

        // Pasar los datos a la vista
        return Inertia::render('product/Create', [
            'categories' => $category,
            'brands' => $brand,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProduct $request)
    {

        // Obtener datos validados
        $data = $request->validated();

        // Si hay un archivo de imagen, procesarlo
        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');
            $data['picture'] = '/storage/' . $path;
        }

        // Crear el producto con los datos completos
        Product::create($data);

        // Redirigir al índice con mensaje de éxito
        return redirect()->route('products.index')->with('success', 'Producto creado exitosamente.');
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
