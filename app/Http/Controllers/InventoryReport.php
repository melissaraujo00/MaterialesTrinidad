<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;


class InventoryReport extends Controller
{
    public function getInventoryData(Request $request)
    {
        $query = Product::query()
            ->with('brand', 'category');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        return response()->json(['data' => $query->get()]);
    }

    public function inventoryReport(Request $request)
    {
        $query = Product::with('brand', 'category');

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
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
            'user' => $user
        ]);

        return $pdf->stream('reporte_inventario.pdf');
    }

    public function index(Request $request)
    {
        return Inertia::render('reports/Inventory/products', [
            'categories' => Category::select('id', 'name')->get(),
            'selectedCategory' => $request->input('category', ''),
        ]);
    }
}
