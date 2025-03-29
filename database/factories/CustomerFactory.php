<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phoneNumber' => fake()->phoneNumber(),
            'nit' => fake()->unique()->numerify('#########-#'),
            'district_id' =>  rand(1, 10),
            'address' => fake()->address(),
            'description' => fake()->sentence(),
        ];
    }
}
