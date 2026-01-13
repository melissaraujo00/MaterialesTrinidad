<?php

namespace Database\Seeders;

use App\Models\BusinessData;
use App\Models\District;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
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
            'password'=> Hash::make('123')
        ]);



        $this->call([
            RoleSeeder::class,
            DepartmentSeeder::class,
            MunicipalitySeeder::class,
            DistrictSeeder::class,
            UserRoleSeeder::class,
            TypeSeeder::class,
        ]);

        BusinessData::factory()->create([
            'name' => 'Materiales Trinidad S.A. de C.V.',
            'address' => 'Calle Principal, San Miguel',
            'phoneNumber' => '22223333',
            'email' => 'materialesTrinidad@materialestrinidad.com',
            'nit' => '0614-123456-001-0',
            'logo_path' => 'logo/logo.png',
            'description'=>'empresa dedicada a la venta de techos'
        ]);

        //  Customer::factory(20)->create();
    }
}
