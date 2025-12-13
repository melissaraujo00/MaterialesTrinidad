<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Quote;
use App\Models\QuoteDetail;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class QuoteController extends Controller
{
    public function __construct()
    {
        // IMPORTANTE: Si te da error 403 (Forbidden), comenta esta línea
        // hasta que tengas configurado el archivo QuotePolicy.php
        $this->authorizeResource(Quote::class, 'quote');
    }

    // Helper privado para obtener los datos compartidos del usuario
    // Esto evita repetir código en cada método
    private function getAuthProps()
    {
        $user = auth()->user();
        return [
            'user' => [
                'id' => $user?->id,
                'name' => $user?->name,
                'permissions' => $user ? $user->getAllPermissions()->pluck('name') : [],
            ]
        ];
    }

    public function index()
    {
        $quotes = Quote::with(['customer', 'user', 'details'])
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($quote) {
                return [
                    'id' => $quote->id,
                    'customer_id' => $quote->customer_id,
                    'customer_name' => $quote->customer->name ?? 'Cliente eliminado',
                    'date' => $quote->date,
                    'subtotal' => $quote->subtotal,
                    'total' => $quote->total,
                    'status' => $quote->status ?? 'pendiente',
                    'items_count' => $quote->details->count(),
                ];
            });

        return Inertia::render('quote/Index', [
            'quotes' => $quotes,
            'permissions' => Permission::all(), // Si usas esto en el front
            'auth' => $this->getAuthProps(),    // <--- NECESARIO PARA EL LAYOUT
        ]);
    }

    public function create()
    {
        // 1. Clientes (Si customers tampoco tiene 'status', quita el where ahí también)
        // Asumiendo que customers SÍ tiene status, lo dejamos. Si falla, quítalo.
        $customers = Customer::where('status', 'activo')
            ->orderBy('name')
            ->select('id', 'name')
            ->get();

        // 2. Productos - CORREGIDO
        // Quitamos "where('status', 'activo')" porque la columna no existe.
        // Laravel filtrará automáticamente los eliminados por el SoftDelete.
        $products = Product::orderBy('name')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'stock' => $product->stock,
                    'unit' => $product->unit ?? 'unidad',
                ];
            });

        return Inertia::render('quote/Create', [
            'customers' => $customers,
            'products' => $products,
            'auth' => $this->getAuthProps(),
        ]);
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'status' => 'nullable|string',
            'notes' => 'nullable|string|max:500',
        ]);

        DB::beginTransaction();

        try {
            $quote = Quote::create([
                'customer_id' => $validated['customer_id'],
                'user_id' => auth()->id(),
                'date' => $validated['date'],
                'subtotal' => $validated['subtotal'],
                'tax' => $validated['tax'] ?? 0,
                'discount' => $validated['discount'] ?? 0,
                'total' => $validated['total'],
                'status' => $validated['status'] ?? 'pendiente',
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($validated['items'] as $item) {
                QuoteDetail::create([
                    'quote_id' => $quote->id,
                    'product_id' => $item['product_id'],
                    'amount' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['quantity'] * $item['price'],
                ]);
            }

            DB::commit();

            return redirect()->route('quotes.index')->with('success', 'Cotización creada exitosamente.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors('Error al crear: ' . $e->getMessage());
        }
    }

        public function edit(Quote $quote)
    {
        $quote->load(['details']);

        // Clientes
        $customers = Customer::where('status', 'activo')
            ->orderBy('name')
            ->select('id', 'name')
            ->get();

        // Productos - CORREGIDO
        // Quitamos la condición que causaba el error
        $products = Product::orderBy('name')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'stock' => $product->stock,
                    'unit' => $product->unit ?? 'unidad',
                ];
            });

        // Preparar datos
        $quoteData = [
            'id' => $quote->id,
            'customer_id' => $quote->customer_id,
            'date' => $quote->date,
            'subtotal' => (float) $quote->subtotal,
            'tax' => (float) ($quote->tax ?? 0),
            'discount' => (float) ($quote->discount ?? 0),
            'total' => (float) $quote->total,
            'status' => $quote->status,
            'notes' => $quote->notes ?? '',
            'items' => $quote->details->map(function ($detail) {
                return [
                    'id' => $detail->id,
                    'product_id' => $detail->product_id,
                    'quantity' => (int) $detail->amount,
                    'price' => (float) $detail->price,
                    'subtotal' => (float) $detail->subtotal,
                ];
            }),
        ];

        return Inertia::render('quote/Edit', [
            'quote' => $quoteData,
            'customers' => $customers,
            'products' => $products,
            'auth' => $this->getAuthProps(),
        ]);
    }

    public function update(Request $request, Quote $quote)
    {
        // Si es solo actualización de estado (desde tabla)
        if ($request->has('status') && !$request->has('items')) {
             $validated = $request->validate([
                'status' => 'required|string',
            ]);
            $quote->update($validated);
            return redirect()->route('quotes.index')->with('success', 'Estado actualizado.');
        }

        // Actualización completa
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'status' => 'nullable|string',
            'notes' => 'nullable|string|max:500',
        ]);

        DB::beginTransaction();
        try {
            $quote->update([
                'customer_id' => $validated['customer_id'],
                'date' => $validated['date'],
                'subtotal' => $validated['subtotal'],
                'tax' => $validated['tax'] ?? 0,
                'discount' => $validated['discount'] ?? 0,
                'total' => $validated['total'],
                'status' => $validated['status'] ?? $quote->status,
                'notes' => $validated['notes'] ?? null,
            ]);

            $quote->details()->delete();

            foreach ($validated['items'] as $item) {
                QuoteDetail::create([
                    'quote_id' => $quote->id,
                    'product_id' => $item['product_id'],
                    'amount' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['quantity'] * $item['price'],
                ]);
            }

            DB::commit();
            return redirect()->route('quotes.index')->with('success', 'Cotización actualizada.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors('Error al actualizar: ' . $e->getMessage());
        }
    }

    public function destroy(Quote $quote)
    {
        $quote->details()->delete(); // Asegurar borrar detalles primero si no hay cascada en BD
        $quote->delete();
        return redirect()->route('quotes.index')->with('success', 'Cotización eliminada.');
    }
}
