<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class QuoteReportController extends Controller
{
    public function QuoteReport(Quote $quote)
    {

        $quote->load(['details']);

        $pdf = Pdf::loadView('quotes.report', [
            'quote' => $quote
        ]);

        return $pdf->stream('reporte_cotizacion.pdf');
    }

}
