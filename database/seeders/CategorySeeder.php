<?php

namespace Database\Seeders;

use App\Models\Category;  // Asegúrate de importar el modelo Category
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Techos',
                'description' => 'materiales para techos'
            ],
            [
                'name' => 'Estructura metalica',
                'description' => 'todo tipo de polines y más metales'
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);  // Usa Category, no Role
        }
    }
}
