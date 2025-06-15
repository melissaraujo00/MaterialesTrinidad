<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOfferRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Offer;
use Inertia\Inertia;
use App\Http\Requests\UpdateOfferRequest;

class OfferController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Offer::class, 'offer');
    }

    public function getOfferData()
    {
        $data = Offer::query()
            ->with('product')
            ->get()
            ->map(function ($offer) {
                return [
                    'id' => $offer->id,
                    'startDate' => $offer->startDate,
                    'endDate' => $offer->endDate,
                    'description' => $offer->description,
                    'priceNormal' => $offer->priceNormal,
                    'priceOffers' => $offer->priceOffers,
                    'product_id' => $offer->product->name,
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
        return Inertia::render('offer/Index', [
            'offers' => Offer::all(),
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
        $offers = Offer::all();
        $product = Product::all();

        return Inertia::render('offer/Create', [
            'offers' => $offers,
            'products' => $product
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfferRequest $request)
    {
        Offer::create($request->validated());

        return redirect()->route('offers.index')->with('success', 'Offer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }
    public function edit(Offer $offer)
    {
        $product = Product::all();
        return Inertia::render('offer/Edit', [
            'offer' => $offer,
            'products' => $product
        ]);
    }

    public function update(UpdateOfferRequest $request, Offer $offer)
    {
        $offer->update($request->validated());

        return redirect()->route('offers.index')->with('success', 'Offers updated successfully.');
    }
    /**
     * Update the specified resource in storage.
     */


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
