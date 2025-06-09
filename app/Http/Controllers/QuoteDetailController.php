<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteDetailsRequest;
use App\Models\QuoteDetail;
use Illuminate\Http\Request;
use League\CommonMark\Extension\SmartPunct\Quote;
use PHPUnit\Event\TestSuite\Sorted;
use Inertia\Inertia;

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
    public function store(Request $request) {}


    /**
     * Display the specified resource.
     */
    public function show(Quote $quote)
    { {
            // Cargar detalles con los productos relacionados
            $quote->load('details.product');

            // Extraer solo los productos de los detalles
            $products = $quote->details->pluck('product')->filter()->values();

            // Retornar como array (para Inertia)
            return Inertia::render('Quotes/Show', [
                'products' => $products,
            ]);
        }
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
