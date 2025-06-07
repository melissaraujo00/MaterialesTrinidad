<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteDetailsRequest;
use App\Models\QuoteDetail;
use Illuminate\Http\Request;
use PHPUnit\Event\TestSuite\Sorted;

class QuoteDetailController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(QuoteDetail::class, 'quote');
    }



    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'details' => 'required|array',
            'details.*.amount' => 'required|integer|min:1',
            'details.*.price' => 'required|numeric|min:0',
            'details.*.subtotal' => 'required|numeric|min:0',
            'details.*.quote_id' => 'required|exists:quotes,id',
            'details.*.product_id' => 'required|exists:products,id',
        ]);

        $createdDetails = [];

        foreach ($request->details as $detail) {
            $quoteDetail = QuoteDetail::create($detail);
            $createdDetails[] = $quoteDetail;
        }

        return redirect()->back()->with([
            'message' => 'Detalles de cotización creados exitosamente.',
            'details' => $createdDetails
        ]);
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
    public function destroy() {}
}
