<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Adminitrador',
                'description' => 'Tiene el control de todo el sistema y puede asignar roles'
            ],
            [
                'name' => 'Supervisor',
                'description' => 'Tiene control de ventas de los vendendore'
            ],
            [
                'name' => 'Vendedor',
                'description' => 'Puede realizar cotizaciones'
            ],
            [
                'name' => 'Cajera',
                'description' => 'realiza la factura de una venta'
            ],
            [
                'name' => 'Bodega',
                'description' => 'Tiene el control de todo el sistema y puede asignar roles'
            ]
        ];

        foreach($roles as $role){
            Role::create($role);
        }
    }
}
