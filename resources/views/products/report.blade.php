<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <title>Reporte de Inventario</title>
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
      text-align: left;
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
      <div class="subtitulo">Reporte de Inventario</div>
    </div>
    <div class="fecha">
      Fecha: {{ date('d/m/Y') }} Generado por: {{ $user->name }}
    </div>
  </header>

  <h2>Inventario Detallado</h2>
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
        <td>{{ $product->name }}</td>
        <td>{{ $product->category->name ?? '-' }}</td>
        <td>{{ $product->brand->name ?? '-' }}</td>
        <td>${{ number_format($product->price, 2) }}</td>
        <td class="@if($product->stock <= $product->stockMinimun) bajo-stock @endif">
          {{ $product->stock }}
        </td>
      </tr>
      @endforeach
    </tbody>
  </table>

  <h2>Resumen por Categoría</h2>
  <table>
    <thead>
      <tr>
        <th>Categoría</th>
        <th>Cantidad de Productos</th>
      </tr>
    </thead>
    <tbody>
      @foreach($productsCountByCategory as $category)
      <tr>
        <td>{{ $category->name }}</td>
        <td style="text-align: center;">{{ $category->products_count }}</td>
      </tr>
      @endforeach
      <tr>
        <td><strong>Total de Productos</strong></td>
        <td style="text-align: center;"><strong>{{ $totalProducts }}</strong></td>
      </tr>
    </tbody>
  </table>

  <h2>Productos Agotados</h2>
  <table>
    <thead>
      <tr>
        <th>Producto</th>
        <th>Stock Actual</th>
        <th>Stock Mínimo</th>
      </tr>
    </thead>
    <tbody>
      @foreach($outOfStockProducts as $product)
      <tr>
        <td>{{ $product->name }}</td>
        <td>{{ $product->stock }}</td>
        <td>{{ $product->stockMinimun }}</td>
      </tr>
      @endforeach
    </tbody>
  </table>

  <footer>
    Este reporte ha sido generado automáticamente por el sistema de gestión de inventario.
  </footer>

</body>

</html>