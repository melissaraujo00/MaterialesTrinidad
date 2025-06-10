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

    // public function envio(){

    //     $token = 'EAARXBvrIFmMBOZBvd0FTd9DQ7rU6UFOrz3ZCe7rcXE4bVtEZCaPzgK8zs0bFBQPWSOKaSUa8cJSZAhGTgslqY2NF01afvANonZBMosWGyVJ0ZBtKGOzzTBOEIeNqq81y1xCFVmC8PfrGlurI65lCjzysBcQRlypDqVatsKuEQBLZAvZBUZAkoerVZAC5epqgxw1ZA3OWgJlz80Pwe50pr5IhqTMZC8an4PXhu8eclroZD';

    //     $telefono = '50360044033';

    //     $url ='https://graph.facebook.com/v22.0/613117285227415/messages';

    //     $mensaje = ''
    //             . '{'
    //             .'"messaging_product": "whatsapp",'
    //             .'"to": "'.$telefono.'",'
    //             .'"type": "template",'
    //             .'"template":'
    //             .'{'
    //             .'      "name": "cotizacion",'
    //             .'      "language": { "code": "es" } '
    //             .'}'
    //             .'}';

    //     $header = array('Authorization: Bearer ' . $token, 'Content-Type: application/json',);

    //     $curl = curl_init();
    //     curl_setopt($curl, CURLOPT_URL, $url);
    //     curl_setopt($curl, CURLOPT_POSTFIELDS, $mensaje);
    //     curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    //     curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    //     $response = json_decode(curl_exec($curl), true);

    //     print_r($response);

    //     $status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    //     curl_close($curl);

    // }
}
