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

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function fromQuote(Request $request)
    {
        try {
            // Validación de los datos de entrada
            $request->validate([
                'quote_id' => 'required|exists:quotes,id',
                'products' => 'required|array|min:1',
                'products.*.id' => 'required|integer|exists:products,id',
                'products.*.quantity' => 'required|integer|min:1',
            ]);

            DB::beginTransaction();

            $quote = Quote::with('customer')->findOrFail($request->quote_id);

            // Calcular el total real de la venta basado en los productos recibidos
            // Esto es más seguro que confiar en el total de la cotización si los detalles se modificaron.
            $totalSale = 0;
            $saleDetailsData = [];

            foreach ($request->products as $productData) {
                $productModel = Product::findOrFail($productData['id']);

                // Verificar stock antes de crear el detalle de venta
                if ($productModel->stock < $productData['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        'message' => 'Stock insuficiente para el producto: ' . $productModel->name . '. Stock disponible: ' . $productModel->stock
                    ], 400); // Bad Request
                }

                $subtotal = $productModel->price * $productData['quantity'];
                $totalSale += $subtotal;

                $saleDetailsData[] = [
                    'product_id' => $productModel->id,
                    'quantity' => $productData['quantity'],
                    'price' => $productModel->price,
                    'subtotal' => $subtotal,
                ];

                // Descontar el stock
                $productModel->decrement('stock', $productData['quantity']);
            }

            // Crear la venta
            $sale = Sale::create([
                'customer_id' => $quote->customer_id,
                'user_id' => auth()->id(),
                'date' => now(),
                'total' => $totalSale, // Usar el total calculado de los productos de la venta
            ]);

            // Crear los detalles de la venta
            foreach ($saleDetailsData as $detailData) {
                $sale->details()->create($detailData); // Asocia los detalles con la venta
            }

            DB::commit();

            return response()->json(['sale_id' => $sale->id, 'message' => 'Venta creada exitosamente y stock actualizado.']);

        } catch (ValidationException $e) {
            // Capturar errores de validación
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422); // Unprocessable Entity
        } catch (\Exception $e) {
            DB::rollBack();
            // Capturar cualquier otra excepción
            return response()->json([
                'message' => 'Error al crear la venta',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString() // Puedes comentar o quitar esto en producción
            ], 500);
        }
    }

    public function getQuoteWithProducts($id)
    {
        // Nota: Si 'products' en tu modelo Quote es una relación many-to-many a través de una tabla pivote
        // que contiene 'quantity' y 'price', esto es correcto. Si 'products' es una relación
        // hasMany de QuoteDetail, entonces el nombre debería ser 'details' y los campos
        // directamente en el modelo QuoteDetail.
        // Asumiendo que 'products' es una relación con la tabla 'quote_details' o similar.
        $quote = Quote::with(['customer', 'details.product'])->findOrFail($id); // Asumo 'details' es la relación con QuoteDetail

        // Es importante que el frontend sepa que 'details' es un array de objetos
        // con 'product_id', 'amount', 'price', etc., no directamente 'products'.
        // Si tu frontend espera 'products', tendrías que mapear 'details' a 'products'
        // aquí en el backend, o ajustar el frontend.
        // Dado tu `QuoteShow.tsx`, se espera `pageProps.details`, por lo que esta respuesta
        // podría no ser necesaria tal cual si `QuoteShow` ya obtiene los datos directamente.

        return response()->json([
            'id' => $quote->id,
            'date' => $quote->date,
            'total' => $quote->total,
            'customer' => $quote->customer ? ['name' => $quote->customer->name] : null,
            // Si 'details' existe, es mejor calcular el subtotal total de los detalles
            // en lugar de depender de $quote->amount * $quote->price, ya que esos campos
            // no existen en el modelo Quote a menos que los añadas con accesores.
            // Si quieres un subtotal de los items, deberías sumarlos.
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
        //
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
