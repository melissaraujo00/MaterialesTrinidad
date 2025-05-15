<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movement;
use Inertia\Inertia;

class MovementController extends Controller
{

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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
