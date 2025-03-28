<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\District;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $districts =[
            [
                'name' => 'Ahuachapán Norte',
                'department_id' => 1
            ],
            [
                'name' => 'Ahuachapán Centro',
                'department_id' => 1
            ],
            [
                'name' => 'Ahuachapán Sur',
                'department_id' => 1
            ],
            [
                'name' => 'Cabañas Este',
                'department_id' => 2
            ],
            [
                'name' => 'Cabañas Oeste',
                'department_id' => 2
            ],
            [
                'name' => 'Chalatenango Norte',
                'department_id' => 3
            ],
            [
                'name' => 'Chalatenango Centro',
                'department_id' => 3
            ],
            [
                'name' => 'Chalatenango Sur',
                'department_id' => 3
            ],
            [
                'name' => 'Cuscatlán Norte',
                'department_id' => 4
            ],
            [
                'name' => 'Cuscatlán Sur',
                'department_id' => 4
            ],
            [
                'name' => 'La Libertad Norte',
                'department_id' => 5
            ],
            [
                'name' => 'La Libertad Centro',
                'department_id' => 5
            ],
            [
                'name' => 'La Libertad Oeste',
                'department_id' => 5
            ],
            [
                'name' => 'La Libertad Este',
                'department_id' => 5
            ],
            [
                'name' => 'La Libertad Costa',
                'department_id' => 5
            ],
            [
                'name' => 'La Libertad Sur',
                'department_id' => 5
            ],
            [
                'name' => '	La Paz Oeste',
                'department_id' => 6
            ],
            [
                'name' => 'La Paz Centro',
                'department_id' => 6
            ],
            [
                'name' => 'La Paz Este',
                'department_id' => 6
            ],
            [
                'name' => 'La Unión Norte',
                'department_id' => 7
            ],
            [
                'name' => 'La Unión Sur',
                'department_id' => 7
            ],
            [
                'name' => 'Morazán Norte',
                'department_id' => 8
            ],
            [
                'name' => 'Morazán Sur',
                'department_id' => 8
            ],
            [
                'name' => 'San Miguel Norte',
                'department_id' => 9
            ],
            [
                'name' => 'San Miguel Centro',
                'department_id' => 9
            ],
            [
                'name' => 'San Miguel Oeste',
                'department_id' => 9
            ],
            [
                'name' => 'San Salvador Norte',
                'department_id' => 10
            ],
            [
                'name' => 'San Salvador Oeste',
                'department_id' => 10
            ],
            [
                'name' => 'San Salvador Este',
                'department_id' => 10
            ],
            [
                'name' => 'San Salvador Centro',
                'department_id' => 10
            ],
            [
                'name' => 'San Salvador Sur',
                'department_id' => 10
            ],
            [
                'name' => 'San Vicente Norte',
                'department_id' => 11
            ],
            [
                'name' => 'San Vicente Sur',
                'department_id' => 11
            ],
            [
                'name' => 'Santa Ana Norte',
                'department_id' => 12
            ],
            [
                'name' => 'Santa Ana Centro',
                'department_id' => 12
            ],
            [
                'name' => 'Santa Ana Este',
                'department_id' => 12
            ],
            [
                'name' => 'Santa Ana Oeste',
                'department_id' => 12
            ],
            [
                'name' => 'Sonsonate Norte',
                'department_id' => 13
            ],
            [
                'name' => 'Sonsonate Centro',
                'department_id' => 13
            ],
            [
                'name' => 'Sonsonate Este',
                'department_id' => 13
            ],
            [
                'name' => 'Sonsonate Oeste',
                'department_id' => 13
            ],
            [
                'name' => 'Usulután Norte',
                'department_id' => 14
            ],
            [
                'name' => 'Usulután Este',
                'department_id' => 14
            ],
            [
                'name' => 'Usulután Oeste',
                'department_id' => 14
            ]
        ];

        foreach($districts as $district){
            District::create($district);
        }
    }
}
