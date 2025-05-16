<?php

namespace Database\Seeders;

use App\Models\District;
use App\Models\User;
use App\Models\Customer;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Core\DateTime;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name'=>'admin',
            'firstName'=> 'Admin',
            'lastName' => 'admin',
            'email'=> 'admin@admin.com',
            'birthdate' => '1990-01-01',
            'phoneNumber' => '00000000',
            'password'=> '123'
        ]);



        $this->call([
            RoleSeeder::class,
            DepartmentSeeder::class,
            MunicipalitySeeder::class,
            DistrictSeeder::class,
            UserRoleSeeder::class,
            TypeSeeder::class,
        ]);

        //  Customer::factory(20)->create();
    }
}
