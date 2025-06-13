<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class QuoteReportController extends Controller
{
    // public function QuoteReport(Quote $quote)
    // {
    //     $quote->load(['details']);

    //     $pdf = Pdf::loadView('quotes.report', [
    //         'quote' => $quote
    //     ]);

    //     return $pdf->stream('reporte_cotizacion.pdf');
    // }

    public function sendQuoteTextByWhatsapp($id)
    {
        $quote = Quote::with(['customer', 'user', 'details.product'])->findOrFail($id);

        // Construir el mensaje de texto
        $mensaje = "==============================\n";
        $mensaje .= "Materiales Trinidad S. A. de C.V.\n";
        $mensaje .= "==============================\n";
        $mensaje .= "Cotización #{$quote->id}\n";
        $mensaje .= "Cliente: {$quote->customer->name}\n";
        $mensaje .= "Fecha: " . ($quote->date ? \Carbon\Carbon::parse($quote->date)->format('d/m/Y') : date('d/m/Y')) . "\n";
        $mensaje .= "------------------------------\n";
        $mensaje .= "Productos:\n";
        foreach ($quote->details as $details) {
            $mensaje .= "- {$details->product->name} x{$details->amount} = $" . number_format($details->subtotal ?? $details->price * $details->amount, 2) . "\n";
        }
        $mensaje .= "------------------------------\n";
        $mensaje .= "Total: $" . number_format($quote->total, 2) . "\n";
        $mensaje .= "==============================";

        // Número del cliente en formato internacional
        $numeroCliente = $quote->customer->phoneNumber;
        $numeroCliente = (strpos($numeroCliente, '+') === 0) ? $numeroCliente : '+503' . ltrim($numeroCliente, '0');

        // Enviar mensaje de texto usando UltraMsg
        $response = Http::asForm()->post("https://api.ultramsg.com/".env('ULTRAMSG_INSTANCE_ID')."/messages/chat", [
            'token' => env('ULTRAMSG_TOKEN'),
            'to' => $numeroCliente,
            'body' => $mensaje
        ]);

        return response()->json(['ultramsg_response' => $response->body()]);
    }
}
