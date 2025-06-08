<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Reporte de inventario</title>
  </head>
  <style>
      body {
        font-family: Arial, sans-serif;
        background: #f8fafc;
        margin: 40px;
      }
      h1 {
        color: #2563eb;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 2rem;
      }
      th, td {
        border: 1px solid #d1d5db;
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background: #e5e7eb;
        color: #111827;
      }
      tr:nth-child(even) {
        background: #f1f5f9;
      }
    </style>
  <body>
    <h1>Reporte de Inventario</h1>
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Categoría</th>
          <th>Marca</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        @foreach($products as $product)
        <tr>
          <td>{{ $product->name}}</td>
          <td>{{ $product->category->name ?? '-' }}</td>
          <td>{{ $product->brand->name ?? '-' }}</td>
          <td>${{ number_format($product->price, 2) }}</td>
          <td>{{ $product->stock }}</td>
        </tr>
        @endforeach
      </tbody>
    </table>
  </body>
</html>