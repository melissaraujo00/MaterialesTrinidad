<!DOCTYPE html>
    <html lang="es">

    <head>
    <meta charset="UTF-8">
    <title>Cotizacion</title>
    <style>
        body {
        font-family: sans-serif;
        color: #1f2937;
        margin: 50px;
        font-size: 13px;
        }

        header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #000;
        margin-bottom: 30px;
        padding-bottom: 10px;
        }

        header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        color: #2c3e50;
        }

        header .subtitulo {
        font-size: 16px;
        font-weight: 500;
        color: #555;
        margin-top: 2px;
        }

        header .fecha {
        font-size: 13px;
        color: #555;
        }

        h2 {
        margin-top: 40px;
        font-size: 16px;
        color: #111;
        padding-bottom: 4px;
        }

        table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1.5rem;
        font-size: 14px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        overflow: hidden;
        }

        th,
        td {
        padding: 12px 15px;
        text-align: center;
        font-weight: 400;
        border-bottom: 1px solid #ddd;
        }

        th {
        text-align: center;
        background-color: #2c3e50;
        color: #ecf0f1;
        font-weight: 600;
        }

        tbody tr:nth-child(even) {
        background-color: #f9f9f9;
        }

        tbody tr:hover {
        background-color: #d6eaf8;
        }

        td {
        background-color: #ffffff;
        }

        td[style*="color: #dc2626"] {
        color: #c0392b;
        font-weight: bold;
        }

        .bajo-stock {
        color: #c53030;
        font-weight: bold;
        }

        footer {
        border-top: 1px solid #ccc;
        padding-top: 10px;
        text-align: center;
        font-size: 12px;
        color: #666;
        margin-top: 50px;
        }
    </style>
    </head>

    <body>

    <header>
        <div>
        <h1>Materiales Trinidad S. A. de C.V.</h1>
        <div class="subtitulo">Cotizacion</div>
        </div>
        <div class="fecha">
        Fecha: {{ date('d/m/Y') }}
        </div>
    </header>

    <h2>Detalles de la Cotización</h2>
    <table>
        <thead>
        <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>SubTotal</th>
        </tr>
        </thead>
        <tbody>
            @foreach($quote->details as $details)
            <tr>
                <td>{{ $details->product->name }}</td>
                <td>{{ $details->product->category->name ?? '-' }}</td>
                <td>${{ number_format($details->price, 2) }}</td>
                <td>${{ number_format($details->subtotal ?? $details->price * $details->amount, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" style="text-align: right; font-weight: bold;">Total:</td>
                <td style="font-weight: bold;">
                    ${{ number_format($quote->total ?? $quote->details->sum(function($d) { return $d->subtotal ?? $d->price * $d->amount; }), 2) }}
                </td>
            </tr>
        </tfoot>
    </table>




    </body>

    </html>