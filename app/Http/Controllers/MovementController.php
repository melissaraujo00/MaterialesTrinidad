<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovementRequest;
use App\Models\Product;
use App\Models\Type;
use Illuminate\Http\Request;
use App\Models\Movement;
use Inertia\Inertia;

class MovementController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Movement::class, 'movement');
    }

     public function getMovementData()
     {
        $data = Movement::query()
        ->with('product', 'type')
        ->get()
        ->map( function ($movement){
            return [
                'id' => $movement->id,
                'date' => $movement->date,
                'hour'  => $movement->hour,
                'product_quantity' => $movement->product_quantity,
                'product_id'  => $movement->product->name,
                'type_id' => $movement->type->type
            ];
        });
        return response()->json(['data' => $data]);
     }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        return Inertia::render('movement/Index', [
            'movemets' => Movement::all(),
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
        $type = Type::all();
        $product = Product::all();

        return Inertia::render('movement/Create', [
            'types' => $type,
            'products' => $product
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMovementRequest $request)
{
    $validated = $request->validated();

    // Obtener el producto y tipo por ID
    $product = Product::findOrFail($validated['product_id']);
    $type = Type::findOrFail($validated['type_id']);

    // Actualizar stock según tipo
    if ($type->type === 'entrada') {
        $product->stock += $validated['product_quantity'];
    } elseif ($type->type === 'salida') {
        if ($product->stock < $validated['product_quantity']) {
            return redirect()->back()->withErrors(['product_quantity' => 'Stock insuficiente para realizar la salida.']);
        }
        $product->stock -= $validated['product_quantity'];
    }

    // Guardar cambios en el producto
    $product->save();

    // Crear el movimiento
    Movement::create($validated);

    return redirect()->route('movements.index')->with('success', 'Movimiento creado y stock actualizado exitosamente.');
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
