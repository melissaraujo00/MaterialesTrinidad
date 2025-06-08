<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;


class InventoryReport extends Controller
{
    public function inventory()
    {
        $pdf = Pdf::loadView('products.report', compact('products'));

        return $pdf->stream("reporte.pdf");
    }

    public function index(Request $request)
    {
        $query = Product::query()->with('category', 'brand');

        if ($request->filled('category')) {
            $query->where('category_id', $request->input('category'));
        }

        $products = $query->get();

        return Inertia::render('reports/Inventory/products', [
            'products' => $products,
            'categories' => Category::select('id', 'name')->get(),
            'selectedCategory' => $request->input('category'),
        ]);
    }
}
