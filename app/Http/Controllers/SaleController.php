<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Quote;
use App\Models\Sale;
use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Http\Controllers\request;
use App\Models\SaleDetail;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */

         // Crear venta desde una cotización confirmada
 public function storeFromQuote(Request $request)
    {
        $request->validate([
            'quote_id' => 'required|exists:quotes,id',
        ]);

        $quote = Quote::with('details')->findOrFail($request->quote_id);

        $sale = Sale::create([
            'customer_id' => $quote->customer_id,
            'total' => $quote->total,
        ]);

        foreach ($quote->details as $detail) {
            $sale->details()->create([
                'product_id' => $detail->product_id,
                'quantity' => $detail->quantity,
                'price' => $detail->price,
            ]);
        }

        return redirect()->route('sales.show', $sale)->with('success', 'Venta creada desde cotización');
    }

    // Crear venta directa
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'total' => 'required|numeric|min:0',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0',
        ]);

        $sale = Sale::create([
            'customer_id' => $request->customer_id,
            'total' => $request->total,
        ]);

        foreach ($request->products as $product) {
            $sale->details()->create([
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
        }

        return redirect()->route('sales.show', $sale)->with('success', 'Venta creada correctamente');
    }

    public function index()
    {
        $sales = Sale::with(['customer', 'user'])
        ->orderBy('date', 'desc')
        ->get();

    return response()->json(['data' => $sales]);
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


    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load('details.product', 'customer', 'user');

        return response()->json($sale);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaleRequest $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
