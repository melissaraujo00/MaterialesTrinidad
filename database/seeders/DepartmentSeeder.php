<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departamens = [
            [
                'name' => 'Ahuachapán'
            ],
            [
                'name' => 'Cabañas'
            ],
            [
                'name' => 'Chalatenango'
            ],
            [
                'name' => 'Cuscatlán'
            ],
            [
                'name' => 'La Libertad'
            ],
            [
                'name' => 'La Paz'
            ],
            [
                'name' => 'La Unión'
            ],
            [
                'name' => 'Morazán'
            ],
            [
                'name' => 'San Miguel'
            ],
            [
                'name' => 'San Salvador'
            ],
            [
                'name' => 'San Vicente'
            ],
            [
                'name' => 'Santa Ana'
            ],
            [
                'name' => 'Sonsonate'
            ],
            [
                'name' => 'Usulután'
            ]
        ];

        foreach($departamens as $departamen){
            Department::create($departamen);
        }
    }
}
