<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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

    public function sendQuoteByWhatsapp($id)
    {
        $quote = Quote::with(['customer', 'user', 'details.product.category', 'details.product.brand'])->findOrFail($id);

        // Generar PDF y guardarlo temporalmente
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('quotes.report', compact('quote'));
        $pdfPath = storage_path("app/public/cotizacion_{$quote->id}.pdf");
        $pdf->save($pdfPath);

        // Convertir PDF a base64
        $pdfBase64 = base64_encode(file_get_contents($pdfPath));

        $quote = Quote::with(['customer'])->findOrFail($id);

        $numeroCliente = $quote->customer->phoneNumber;
        $numeroCliente = (strpos($numeroCliente, '+') === 0) ? $numeroCliente : '+503' . ltrim($numeroCliente, '0');

        $numeroVendedor = $quote->user->phoneNumber;
        $numeroVendedor = (strpos($numeroVendedor, '+') === 0) ? $numeroVendedor : '+503' . ltrim($numeroVendedor, '0');

        // Enviar mensaje usando UltraMsg
        $response = Http::asForm()->post("https://api.ultramsg.com/".env('ULTRAMSG_INSTANCE_ID')."/messages/document", [
            'token' => env('ULTRAMSG_TOKEN'),
            'to' => $numeroCliente,
            'filename' => "cotizacion.pdf",
            'document' => $pdfBase64,
            'caption' => 'Reporte de Cotizacion'
        ]);

        return response()->json(['ultramsg_response' => $response->body()]);
    }

}
