<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Role::create(['name' => 'Administrador', 'guard_name' => 'web','description' => 'Tiene el control de todo el sistema y puede asignar roles']);
        Role::create(['name' => 'Supervisor','guard_name' => 'web','description' => 'Tiene control de ventas de los vendendores']);
        Role::create(['name' => 'Vendedor','guard_name' => 'web', 'description' => 'Puede realizar cotizaciones']);
        Role::create(['name' => 'Cajera','guard_name' => 'web', 'description' => 'realiza la factura de una venta']);
        Role::create(['name' => 'Bodega','guard_name' => 'web', 'description' => 'Tiene el control de todo el sistema y puede asignar roles']);
    }
}
