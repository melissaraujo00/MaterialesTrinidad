<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['type' => 'entrada','description' => 'Entrada del producto a la sucursal'],
            ['type' => 'salida','description' => 'Salida del producto a la sucursal'],
            ['type' => 'traslado','description' => 'Traslado de producto entre sucursales'],
            ['type' => 'ajuste','description' => 'Ajuste de inventario'],
            ['type' => 'devolucion','description' => 'Devolución de producto a proveedor'],
            ['type' => 'compra','description' => 'Compra de producto a proveedor'],
        ];

        foreach ($types as  $type) {
            Type::create($type);
        }
    }
}
