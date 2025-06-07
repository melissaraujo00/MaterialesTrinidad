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

    public function getQoteData()
    {

        $data = Quote::query()
            ->with('customer', 'user')
            ->get()
            ->map(function ($quote) {
                return [
                    'id' => $quote->id,
                    'date' => $quote->date,
                    'total' => $quote->total,
                    'customer' => [
                        'id' => $quote->customer->id ?? null,
                        'name' => $quote->customer->name ?? null,
                    ],
                    'user' => [
                        'id' => $quote->user->id ?? null,
                        'name' => $quote->user->name ?? null,
                    ],
                    'status' => $quote->status,

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

    /**
     * Show the form for creating a new resource.
     */
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

    /**
     * Store a newly created resource in storage.
     */
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
            // 1. Crear la cotización
            $quote = Quote::create([
                'customer_id' => $validated['customer_id'],
                'user_id' => $validated['user_id'],
                'date' => $validated['date'],
                'subtotal' => $validated['subtotal'],
                'total' => $validated['total'],
            ]);

            // 2. Crear los detalles con el ID de la cotización
            foreach ($validated['details'] as $detail) {
                $detail['quote_id'] = $quote->id;
                QuoteDetail::create($detail);
            }

            DB::commit();

            return redirect()->route('quotes.create')->with([
                'success' => 'Cotización y detalles creados exitosamente.',
                'quote' => $quote
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors('Error al crear la cotización: ' . $e->getMessage());
        }
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
    public function destroy(Quote $quote)
    {
        $quote->delete();

        return redirect()->route('quotes.index')->with('success', 'cotizacion eliminada correctamente.');
    }
}
