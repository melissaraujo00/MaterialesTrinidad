<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use App\Models\Brand;


class InventoryReport extends Controller
{
    public function getInventoryData(Request $request)
    {
        $query = Product::query()
            ->with('brand', 'category');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->brand_id);
        }
        return response()->json(['data' => $query->get()]);
    }

    public function inventoryReport(Request $request)
    {
        $this->authorize('generate', self::class);
        $selectedCategory = null;
        $selectedBrand = null;
        $query = Product::with('brand', 'category');

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
            $selectedCategory = Category::find($request->category);
        }

        if ($request->filled('brand')) {
            $query->where('brand_id', $request->brand);
            $selectedBrand = Brand::find($request->brand);
        }

        $products = $query->get();
        $productsCountByCategory = Category::withCount('products')->get();
        $totalProducts = $productsCountByCategory->sum('products_count');
        $outOfStockProducts = Product::whereColumn('stock', '<=', 'stockMinimun')->get();
        $user = Auth::user();


        $pdf = Pdf::loadView('products.report', [
            'products' => $products,
            'productsCountByCategory' => $productsCountByCategory,
            'totalProducts' => $totalProducts,
            'outOfStockProducts' => $outOfStockProducts,
            'user' => $user,
            'selectedCategory' => $selectedCategory,
            'selectedBrand' => $selectedBrand
        ]);

        return $pdf->stream('reporte_inventario.pdf');
    }

    public function index(Request $request)
    {
        $this->authorize('view', self::class);
        return Inertia::render('reports/Inventory/products', [
            'categories' => Category::select('id', 'name')->get(),
            'brands' => Brand::select('id', 'name')->get(),
            'selectedCategory' => $request->input('category', ''),
            'selectedBrand' => $request->input('brand', '')
        ]);
    }
}
