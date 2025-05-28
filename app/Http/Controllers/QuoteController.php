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
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    public function store(StoreQuoteRequest $request)
    {
        Quote::create($request->validated());

        return redirect()->route('quotes.index')->with('success', 'Category created successfully.');
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
