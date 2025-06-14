<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteRequest;
use App\Models\Customer;
use App\Models\Department;
use App\Models\District;
use App\Models\Municipality;
use App\Models\Permission;
use App\Models\Product;
use App\Models\Quote;
use App\Models\QuoteDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class QuoteController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Quote::class, 'quote');
    }

    public function getQuoteData($user_id)
    {
        $data = Quote::query()
            ->with('customer', 'user')
            ->where('user_id', $user_id)
            ->where('status', 'pendiente')
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($quote) {
                return [
                    'id' => $quote->id,
                    'date' => $quote->date,
                    'total' => number_format($quote->total, 2),
                    'customer' => [
                        'id' => $quote->customer->id ?? null,
                        'name' => $quote->customer->name ?? 'Cliente eliminado',
                    ],
                    'user' => [
                        'id' => $quote->user->id ?? null,
                        'name' => $quote->user->name ?? 'Usuario eliminado',
                    ],
                    'status' => $quote->status ?? 'Pendiente',
                ];
            });

        return response()->json(['data' => $data]);
    }

    public function getConfirmQuoteData($user_id)
    {
        $data = Quote::query()
            ->with('customer', 'user')
            ->where('status', 'confirmada')
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($quote) {
                return [
                    'id' => $quote->id,
                    'date' => $quote->date,
                    'total' => number_format($quote->total, 2),
                    'customer' => [
                        'id' => $quote->customer->id ?? null,
                        'name' => $quote->customer->name ?? 'Cliente eliminado',
                    ],
                    'user' => [
                        'id' => $quote->user->id ?? null,
                        'name' => $quote->user->name ?? 'Usuario eliminado',
                    ],
                    'status' => $quote->status ?? 'Pendiente',
                ];
            });

        return response()->json(['data' => $data]);
    }

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

    public function confirmedQuotes()
{
    
    $this->authorize('viewAny', Quote::class);
    
    $user = auth()->user();
    return Inertia::render('quote/confirmedQuotes', [
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

    public function create()
    {
        $departments = Department::all();
        $municipalities = Municipality::all();
        $districts = District::all();

        return Inertia::render('quote/Create', [
            'departments' => $departments,
            'municipalities' => $municipalities,
            'districts' => $districts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'subtotal' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'details' => 'required|array',
            'details.*.amount' => 'required|integer|min:1',
            'details.*.price' => 'required|numeric|min:0',
            'details.*.subtotal' => 'required|numeric|min:0',
            'details.*.product_id' => 'required|exists:products,id',
        ]);

        DB::beginTransaction();

        try {
            $quote = Quote::create([
                'customer_id' => $validated['customer_id'],
                'user_id' => $validated['user_id'],
                'date' => $validated['date'],
                'subtotal' => $validated['subtotal'],
                'total' => $validated['total'],
            ]);

            foreach ($validated['details'] as $detail) {
                $detail['quote_id'] = $quote->id;
                QuoteDetail::create($detail);
            }

            DB::commit();

            return redirect()->route('quotes.index')->with([
                'success' => 'Cotización y detalles creados exitosamente.',
                'quote' => $quote
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors('Error al crear la cotización: ' . $e->getMessage());
        }
    }

    public function show(Quote $quote)
    {
        try {
            $quote->load(['customer', 'user', 'details.product']);

            if (!$quote) {
                return redirect()->route('quotes.index')->with('error', 'Cotización no encontrada.');
            }

            $details = $quote->details->map(function ($detail) {
                return [
                    'id' => $detail->id,
                    'product_id' => $detail->product_id,
                    'product_name' => $detail->product->name ?? 'Producto eliminado',
                    'amount' => (int) $detail->amount,
                    'price' => (float) $detail->price,
                    'subtotal' => (float) $detail->subtotal,
                ];
            });

            $quoteData = [
                'id' => $quote->id,
                'date' => $quote->date,
                'subtotal' => (float) $quote->subtotal,
                'total' => (float) $quote->total,
                'status' => $quote->status ?? 'Pendiente',
                'customer' => [
                    'id' => $quote->customer->id ?? null,
                    'name' => $quote->customer->name ?? 'Cliente eliminado',
                ],
                'user' => [
                    'id' => $quote->user->id ?? null,
                    'name' => $quote->user->name ?? 'Usuario eliminado',
                ],
            ];

            return Inertia::render('quote/ShowDetails', [
                'quote' => $quoteData,
                'details' => $details->toArray(),
            ]);

        } catch (\Exception $e) {
            return redirect()->route('quotes.index')->with('error', 'Error al cargar la cotización: ' . $e->getMessage());
        }
    }

    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quote $quote)
    {
        try {
            // Validar si es una actualización de estado o de detalles
            if ($request->has('status')) {
                // Actualización de estado
                $validated = $request->validate([
                    'status' => 'required|string|in:pendiente,confirmada,cancelada',
                ]);

                $quote->update($validated);

                return redirect()->route('quotes.index')->with([
                    'success' => 'Estado de cotización actualizado exitosamente.',
                    'quote' => $quote
                ]);
            } else {
                // Actualización de detalles
                $validated = $request->validate([
                    'details' => 'required|array|min:1',
                    'details.*.id' => 'nullable|exists:quote_details,id',
                    'details.*.product_id' => 'required|exists:products,id',
                    'details.*.amount' => 'required|integer|min:1',
                    'details.*.price' => 'required|numeric|min:0',
                    'details.*.subtotal' => 'required|numeric|min:0',
                    'subtotal' => 'required|numeric|min:0',
                    'total' => 'required|numeric|min:0',
                ]);

                DB::beginTransaction();

                // Obtener los IDs de los detalles actuales
                $currentDetailIds = $quote->details->pluck('id')->toArray();
                $updatedDetailIds = collect($validated['details'])
                    ->filter(function ($detail) {
                        return isset($detail['id']);
                    })
                    ->pluck('id')
                    ->toArray();

                // Eliminar detalles que ya no están en la lista
                $detailsToDelete = array_diff($currentDetailIds, $updatedDetailIds);
                if (!empty($detailsToDelete)) {
                    QuoteDetail::whereIn('id', $detailsToDelete)->delete();
                }

                // Actualizar o crear detalles
                foreach ($validated['details'] as $detailData) {
                    $detailData['quote_id'] = $quote->id;
                    
                    if (isset($detailData['id'])) {
                        // Actualizar detalle existente
                        QuoteDetail::where('id', $detailData['id'])
                            ->update([
                                'amount' => $detailData['amount'],
                                'price' => $detailData['price'],
                                'subtotal' => $detailData['subtotal'],
                            ]);
                    } else {
                        // Crear nuevo detalle (si fuera necesario)
                        QuoteDetail::create($detailData);
                    }
                }

                // Actualizar totales de la cotización
                $quote->update([
                    'subtotal' => $validated['subtotal'],
                    'total' => $validated['total'],
                ]);

                DB::commit();

                return redirect()->route('quotes.show', $quote->id)->with([
                    'success' => 'Cotización actualizada exitosamente.',
                ]);
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors('Error al actualizar la cotización: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quote $quote)
    {
        $quote->delete();

        return redirect()->route('quotes.index')->with('success', 'Cotización eliminada correctamente.');
    }
}