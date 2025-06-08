<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduct;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use App\Http\Requests\UpdateProductRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use function Termwind\render;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->authorizeResource(Product::class, 'product');
    }


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
                'category_id'  => $product->category?->name,
                'brand_id' => $product->brand?->name,
                'stockMinimun' => $product->stockMinimun,
                'image'  => $product->image,
            ];
        });
        return response()->json(['data' => $data]);
     }

    public function index()
    {
        $user = auth()->user();
        return Inertia::render('product/Index', [
            'products' => Product::all(),
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

        // Procesar la imagen si se envió
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('products', $filename, 'public');
            $data['image'] = '/storage/' . $path; // Debe coincidir con tu campo en la migración
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
    public function edit(Product $product)
    {
        $brand = Brand::all();
        $category = Category::all();

        return Inertia::render('product/Edit', [
        'product' => $product,
        'brands' => $brand,
        'categories' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {

        $data = $request->validated();

    // Procesar la imagen si se envió
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('products', $filename, 'public');
            $data['image'] = '/storage/' . $path;
        }

        $product->update($data);

        return redirect()->route('products.index')->with('success', 'Producto actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success','producto eliminado correctamente');
    }
}
