<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear el rol Administrador si no existe
        $adminRole = Role::firstOrCreate(['name' => 'Administrador']);
        $supervisorRole = Role::firstOrCreate(['name' => 'Supervisor']);
        $warehouseRole = Role::firstOrCreate(['name' => 'Bodega']);

        // Lista de permisos
        $permissions = [
            'ver usuarios',
            'crear usuarios',
            'editar usuarios',
            'eliminar usuarios',
            'ver clientes',
            'crear clientes',
            'editar clientes',
            'eliminar clientes',
            'ver inventario',
            'ver categorias',
            'crear categoria',
            'editar categoria',
            'eliminar categoria',
            'ver marcas',
            'crear marca',
            'editar marca',
            'eliminar marca',
            'ver productos',
            'crear producto',
            'editar producto',
            'eliminar producto',
            'ver Roles y Permisos',
            'Ver Roles',
            'Crear Rol',
            'Editar Rol',
            'Ver Permisos',
            'Crear Permiso',
            'Editar Permiso',
           'Ver Movimientos y Tipos',
            'Ver Tipo Movimiento',
            'Crear Tipo Movimiento',
            'Editar Tipo Movimiento',
            'Eliminar Tipo Movimiento',
            'Ver Movimiento',
            'Crear Movimiento',
            'Editar Movimiento',
            'Eliminar Movimiento'
        ];

        $warehousePermissions = [
            'Ver Movimientos y Tipos',
            'Ver Tipo Movimiento',
            'Crear Tipo Movimiento',
            'Editar Tipo Movimiento',
            'Eliminar Tipo Movimiento',
            'Ver Movimiento',
            'Crear Movimiento',
            'Editar Movimiento',
            'Eliminar Movimiento'
        ];

        $supervisorPermissions = [
            'Ver Movimientos y Tipos',
            'Ver Tipo Movimiento',
            'Crear Tipo Movimiento',
            'Editar Tipo Movimiento',
            'Eliminar Tipo Movimiento',
            'Ver Movimiento',
            'Crear Movimiento',
            'Editar Movimiento',
            'Eliminar Movimiento'
        ];

        // Crear los permisos si no existen
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Asignar todos los permisos al rol Administrador
        $adminRole->syncPermissions(Permission::all());
        $warehouseRole->syncPermissions($warehousePermissions);
        $supervisorRole->syncPermissions($supervisorPermissions);

        // Asignar el rol Administrador al usuario con ID 1
        $user = User::find(1);
        $warehouseUser = User::find(5);
        $supervisorUser = User::find(2);
        if ($user) {
            $user->assignRole($adminRole);
        }
        else if ($warehouseUser){
            $warehouseUser->assignRole($warehouseRole);
        }
        else if($supervisorUser){
            $supervisorUser->assignRole($supervisorRole);
        }

    }
}
