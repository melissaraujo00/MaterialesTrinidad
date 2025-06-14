<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Quote;
use App\Models\Sale;
use App\Http\Requests\StoreSaleRequest; // Asegúrate de que estos requests existan y sean válidos si los usas en otros métodos.
use App\Http\Requests\UpdateSaleRequest; // Asegúrate de que estos requests existan y sean válidos si los usas en otros métodos.
use Illuminate\Http\Request; // Importa la clase Request de Illuminate
use App\Models\SaleDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException; // Importa ValidationException
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function fromQuote(Request $request)
{
    try {
        $request->validate([
            'quote_id' => 'required|exists:quotes,id',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|integer|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        $quote = Quote::with('customer')->findOrFail($request->quote_id);
        $totalSale = 0;
        $saleDetailsData = [];

        foreach ($request->products as $productData) {
            $productModel = Product::findOrFail($productData['id']);

            if ($productModel->stock < $productData['quantity']) {
                DB::rollBack();
                return redirect()->back();
            }

            $subtotal = $productModel->priceWithTax * $productData['quantity'];
            $totalSale += $subtotal;

            $saleDetailsData[] = [
                'product_id' => $productModel->id,
                'quantity' => $productData['quantity'],
                'price' => $productModel->priceWithTax,
                'subtotal' => $subtotal,
                'amount' => $subtotal
            ];

            $productModel->decrement('stock', $productData['quantity']);
        }

        $sale = Sale::create([
            'customer_id' => $quote->customer_id,
            'user_id' => auth()->id(),
            'quote_id' => $quote->id,
            'date' => now(),
            'subtotal' => $totalSale,
            'total' => $totalSale
        ]);

        foreach ($saleDetailsData as $detailData) {
            $sale->details()->create($detailData);
        }

        DB::commit();

        return redirect()->route('sales.index'); // o a la ruta que tengas


    } catch (ValidationException $e) {
        return redirect()->back()->withErrors($e->errors())->withInput();
    } catch (\Exception $e) {
        DB::rollBack();
        return redirect()->back(); 
    }
}

    public function getQuoteWithProducts($id)
    {
        $quote = Quote::with(['customer', 'details.product'])->findOrFail($id);

        return response()->json([
            'id' => $quote->id,
            'date' => $quote->date,
            'total' => $quote->total,
            'customer' => $quote->customer ? ['name' => $quote->customer->name] : null,
            'details' => $quote->details->map(function ($detail) {
                return [
                    'id' => $detail->id, // ID del detalle de la cotización
                    'product_id' => $detail->product_id,
                    'product_name' => $detail->product->name, // Accede al nombre del producto relacionado
                    'amount' => $detail->amount, // Cantidad en la cotización
                    'price' => $detail->price, // Precio del producto en la cotización
                    'subtotal' => $detail->subtotal,
                ];
            }),
            'subtotal_calculated_from_details' => $quote->details->sum('subtotal')
        ]);
    }


public function index()
{
    $user = Auth::user();

    return Inertia::render('sale/Index', [
        'sales' => Sale::with('customer')->latest()->get(),
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
    public function store()
    {
        //
    }

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
