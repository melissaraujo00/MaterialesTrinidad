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
            ['name' => 'Atiquizaya', 'municipality_id' => 1],
            ['name' => 'El Refugio', 'municipality_id' => 1],
            ['name' => 'San Lorenzo', 'municipality_id' => 1],
            ['name' => 'Turín', 'municipality_id' => 1],
            ['name' => 'Ahuachapán', 'municipality_id' => 2],
            ['name' => 'Apaneca', 'municipality_id' => 2],
            ['name' => 'Concepción de Ataco', 'municipality_id' => 2],
            ['name' => 'Tacuba', 'municipality_id' => 2],
            ['name' => 'Guaymango', 'municipality_id' => 3],
            ['name' => 'Jujutla', 'municipality_id' => 3],
            ['name' => 'San Francisco Menéndez', 'municipality_id' => 3],
            ['name' => 'San Pedro Puxtla', 'municipality_id' => 3],

            // Cabañas
            ['name' => 'Guacotecti', 'municipality_id' => 4],
            ['name' => 'San Isidro', 'municipality_id' => 4],
            ['name' => 'Sensuntepeque', 'municipality_id' => 4],
            ['name' => 'Victoria', 'municipality_id' => 4],
            ['name' => 'Dolores', 'municipality_id' => 4],
            ['name' => 'Cinquera', 'municipality_id' => 5],
            ['name' => 'Ilobasco', 'municipality_id' => 5],
            ['name' => 'Jutiapa', 'municipality_id' => 5],
            ['name' => 'Tejutepeque', 'municipality_id' => 5],
            ['name' => 'San Ignacio', 'municipality_id' => 8],


            // Chalatenango
            ['name' => 'Citalá', 'municipality_id' => 6],
            ['name' => 'La Palma', 'municipality_id' => 6],
            ['name' => 'San Ignacio', 'municipality_id' => 6],

            ['name' => 'Agua Caliente', 'municipality_id' => 7],
            ['name' => 'Dulce Nombre de María', 'municipality_id' => 7],
            ['name' => 'El Paraíso', 'municipality_id' => 7],
            ['name' => 'La Reina', 'municipality_id' => 7],
            ['name' => 'Nueva Concepción', 'municipality_id' => 7],
            ['name' => 'San Fernando', 'municipality_id' => 7],
            ['name' => 'San Francisco Morazán', 'municipality_id' => 7],
            ['name' => 'San Rafael', 'municipality_id' => 7],
            ['name' => 'Santa Rita', 'municipality_id' => 7],
            ['name' => 'Tejutla', 'municipality_id' => 7],

            ['name' => 'Arcatao', 'municipality_id' => 8],
            ['name' => 'Azacualpa', 'municipality_id' => 8],
            ['name' => 'Chalatenango', 'municipality_id' => 8],
            ['name' => 'Cancasque', 'municipality_id' => 8],
            ['name' => 'Comalapa', 'municipality_id' => 8],
            ['name' => 'Concepción Quezaltepeque', 'municipality_id' => 8],
            ['name' => 'El Carrizal', 'municipality_id' => 8],
            ['name' => 'La Laguna', 'municipality_id' => 8],
            ['name' => 'Las Vueltas', 'municipality_id' => 8],
            ['name' => 'Nueva Trinidad', 'municipality_id' => 8],
            ['name' => 'Ojos de Agua', 'municipality_id' => 8],
            ['name' => 'Potonico', 'municipality_id' => 8],
            ['name' => 'San Antonio de la Cruz', 'municipality_id' => 8],
            ['name' => 'San Antonio Los Ranchos', 'municipality_id' => 8],
            ['name' => 'San Francisco Lempa', 'municipality_id' => 8],
            ['name' => 'San Isidro Labrador', 'municipality_id' => 8],
            ['name' => 'San Luis del Carmen', 'municipality_id' => 8],
            ['name' => 'San Miguel de Mercedes', 'municipality_id' => 8],
            ['name' => 'Las Flores', 'municipality_id' => 8],
            ['name' => 'Nombre de Jesús', 'municipality_id' => 8],


            // Cuscatlán
            ['name' => 'Suchitoto', 'municipality_id' => 9],
            ['name' => 'San José Guayabal', 'municipality_id' => 9],
            ['name' => 'Oratorio de Concepción', 'municipality_id' => 9],
            ['name' => 'San Bartolomé Perulapía', 'municipality_id' => 9],
            ['name' => 'San Pedro Perulapán', 'municipality_id' => 9],

            ['name' => 'Candelaria', 'municipality_id' => 10],
            ['name' => 'Cojutepeque', 'municipality_id' => 10],
            ['name' => 'El Carmen', 'municipality_id' => 10],
            ['name' => 'El Rosario', 'municipality_id' => 10],
            ['name' => 'Monte San Juan', 'municipality_id' => 10],
            ['name' => 'San Cristóbal', 'municipality_id' => 10],
            ['name' => 'San Rafael Cedros', 'municipality_id' => 10],
            ['name' => 'San Ramón', 'municipality_id' => 10],
            ['name' => 'Santa Cruz Analquito', 'municipality_id' => 10],
            ['name' => 'Santa Cruz Michapa', 'municipality_id' => 10],
            ['name' => 'Tenancingo', 'municipality_id' => 10],

            // La Libertad
            ['name' => 'Quezaltepeque', 'municipality_id' => 11],
            ['name' => 'San Matías', 'municipality_id' => 11],
            ['name' => 'San Pablo Tacachico', 'municipality_id' => 11],

            ['name' => 'San Juan Opico', 'municipality_id' => 12],
            ['name' => 'Ciudad Arce', 'municipality_id' => 12],

            ['name' => 'Colón', 'municipality_id' => 13],
            ['name' => 'Jayaque', 'municipality_id' => 13],
            ['name' => 'Sacacoyo', 'municipality_id' => 13],
            ['name' => 'Tepecoyo', 'municipality_id' => 13],
            ['name' => 'Talnique', 'municipality_id' => 13],

            ['name' => 'Antiguo Cuscatlán', 'municipality_id' => 14],
            ['name' => 'Nuevo Cuscatlán', 'municipality_id' => 14],
            ['name' => 'Huizúcar', 'municipality_id' => 14],
            ['name' => 'San José Villanueva', 'municipality_id' => 14],
            ['name' => 'Zaragoza', 'municipality_id' => 14],

            ['name' => 'Chiltiupán', 'municipality_id' => 15],
            ['name' => 'Jicalapa', 'municipality_id' => 15],
            ['name' => 'La Libertad', 'municipality_id' => 15],
            ['name' => 'Tamanique', 'municipality_id' => 15],
            ['name' => 'Teotepeque', 'municipality_id' => 15],

            ['name' => 'Comasagua', 'municipality_id' => 16],
            ['name' => 'Santa Tecla', 'municipality_id' => 16],

            // La Paz
            ['name' => 'Cuyultitán', 'municipality_id' => 17],
            ['name' => 'Olocuilta', 'municipality_id' => 17],
            ['name' => 'San Juan Talpa', 'municipality_id' => 17],
            ['name' => 'San Luis Talpa', 'municipality_id' => 17],
            ['name' => 'San Pedro Masahuat', 'municipality_id' => 17],
            ['name' => 'Tapalhuaca', 'municipality_id' => 17],
            ['name' => 'San Francisco Chinameca', 'municipality_id' => 17],

            ['name' => 'El Rosario', 'municipality_id' => 18],
            ['name' => 'Jerusalén', 'municipality_id' => 18],
            ['name' => 'Mercedes La Ceiba', 'municipality_id' => 18],
            ['name' => 'Paraíso de Osorio', 'municipality_id' => 18],
            ['name' => 'San Antonio Masahuat', 'municipality_id' => 18],
            ['name' => 'San Emigdio', 'municipality_id' => 18],
            ['name' => 'San Juan Tepezontes', 'municipality_id' => 18],
            ['name' => 'San Luis La Herradura', 'municipality_id' => 18],
            ['name' => 'San Miguel Tepezontes', 'municipality_id' => 18],
            ['name' => 'San Pedro Nonualco', 'municipality_id' => 18],
            ['name' => 'Santa María Ostuma', 'municipality_id' => 18],
            ['name' => 'Santiago Nonualco', 'municipality_id' => 18],

            ['name' => 'San Juan Nonualco', 'municipality_id' => 19],
            ['name' => 'San Rafael Obrajuelo', 'municipality_id' => 19],
            ['name' => 'Zacatecoluca', 'municipality_id' => 19],

            // La Unión
            ['name' => 'Anamorós', 'municipality_id' => 20],
            ['name' => 'Bolívar', 'municipality_id' => 20],
            ['name' => 'Concepción de Oriente', 'municipality_id' => 20],
            ['name' => 'El Sauce', 'municipality_id' => 20],
            ['name' => 'Lislique', 'municipality_id' => 20],
            ['name' => 'Nueva Esparta', 'municipality_id' => 20],
            ['name' => 'Pasaquina', 'municipality_id' => 20],
            ['name' => 'Polorós', 'municipality_id' => 20],
            ['name' => 'San José', 'municipality_id' => 20],
            ['name' => 'Santa Rosa de Lima', 'municipality_id' => 20],

            ['name' => 'Conchagua', 'municipality_id' => 21],
            ['name' => 'El Carmen', 'municipality_id' => 21],
            ['name' => 'Intipucá', 'municipality_id' => 21],
            ['name' => 'La Unión', 'municipality_id' => 21],
            ['name' => 'Meanguera del Golfo', 'municipality_id' => 21],
            ['name' => 'San Alejo', 'municipality_id' => 21],
            ['name' => 'Yayantique', 'municipality_id' => 21],
            ['name' => 'Yucuaiquín', 'municipality_id' => 2],

            // Morazán
            ['name' => 'Arambala', 'municipality_id' => 22],
            ['name' => 'Cacaopera', 'municipality_id' => 22],
            ['name' => 'Corinto', 'municipality_id' => 22],
            ['name' => 'El Rosario', 'municipality_id' => 22],
            ['name' => 'Joateca', 'municipality_id' => 22],
            ['name' => 'Jocoaitique', 'municipality_id' => 22],
            ['name' => 'Meanguera', 'municipality_id' => 22],
            ['name' => 'Perquín', 'municipality_id' => 22],
            ['name' => 'San Fernando', 'municipality_id' => 22],
            ['name' => 'San Isidro', 'municipality_id' => 22],
            ['name' => 'Torola', 'municipality_id' => 22],


            ['name' => 'Chilanga', 'municipality_id' => 23],
            ['name' => 'Delicias de Concepción', 'municipality_id' => 23],
            ['name' => 'El Divisadero', 'municipality_id' => 23],
            ['name' => 'Gualococti', 'municipality_id' => 23],
            ['name' => 'Guatajiagua', 'municipality_id' => 23],
            ['name' => 'Jocoro', 'municipality_id' => 23],
            ['name' => 'Lolotiquillo', 'municipality_id' => 23],
            ['name' => 'Osicala', 'municipality_id' => 23],
            ['name' => 'San Carlos', 'municipality_id' => 23],
            ['name' => 'San Francisco Gotera', 'municipality_id' => 23],
            ['name' => 'San Simón', 'municipality_id' => 23],
            ['name' => 'Sensembra', 'municipality_id' => 23],
            ['name' => 'Sociedad', 'municipality_id' => 23],
            ['name' => 'Yamabal', 'municipality_id' => 23],
            ['name' => 'Yoloaiquín', 'municipality_id' => 23],

            // San Miguel
            ['name' => 'Carolina', 'municipality_id' => 24],
            ['name' => 'Chapeltique', 'municipality_id' => 24],
            ['name' => 'Ciudad Barrios', 'municipality_id' => 24],
            ['name' => 'San Antonio del Mosco', 'municipality_id' => 24],
            ['name' => 'San Gerardo', 'municipality_id' => 24],
            ['name' => 'San Luis de la Reina', 'municipality_id' => 24],
            ['name' => 'Sesori', 'municipality_id' => 24],
            ['name' => 'Nuevo Edén de San Juan', 'municipality_id' => 24],

            ['name' => 'San Miguel', 'municipality_id' => 25],
            ['name' => 'Comacarán', 'municipality_id' => 25],
            ['name' => 'Uluazapa', 'municipality_id' => 25],
            ['name' => 'Moncagua', 'municipality_id' => 25],
            ['name' => 'Quelepa', 'municipality_id' => 25],
            ['name' => 'Chirilagua', 'municipality_id' => 25],

            ['name' => 'Chinameca', 'municipality_id' => 26],
            ['name' => 'El Tránsito', 'municipality_id' => 26],
            ['name' => 'Lolotique', 'municipality_id' => 26],
            ['name' => 'Nueva Guadalupe', 'municipality_id' => 26],
            ['name' => 'San Jorge', 'municipality_id' => 26],
            ['name' => 'San Rafael Oriente', 'municipality_id' => 26],

            // San Salvador
            ['name' => 'Aguilares', 'municipality_id' => 27],
            ['name' => 'El Paisnal', 'municipality_id' => 27],
            ['name' => 'Guazapa', 'municipality_id' => 27],

            ['name' => 'Apopa', 'municipality_id' => 28],
            ['name' => 'Nejapa', 'municipality_id' => 28],

            ['name' => 'Ilopango', 'municipality_id' => 29],
            ['name' => 'San Martín', 'municipality_id' => 29],
            ['name' => 'Soyapango', 'municipality_id' => 29],
            ['name' => 'Tonacatepeque', 'municipality_id' => 29],

            ['name' => 'Ayutuxtepeque', 'municipality_id' => 30],
            ['name' => 'Mejicanos', 'municipality_id' => 30],
            ['name' => 'Cuscatancingo', 'municipality_id' => 30],
            ['name' => 'Ciudad Delgado', 'municipality_id' => 30],
            ['name' => 'San Salvador', 'municipality_id' => 30],


            ['name' => 'Panchimalco', 'municipality_id' => 31],
            ['name' => 'San Marcos', 'municipality_id' => 31],
            ['name' => 'Santo Tomás', 'municipality_id' => 31],
            ['name' => 'Santiago Texacuangos', 'municipality_id' => 31],
            ['name' => 'Rosario de Mora', 'municipality_id' => 31],

            // San Vicente
            ['name' => 'Apastepeque', 'municipality_id' => 32],
            ['name' => 'Santa Clara', 'municipality_id' => 32],
            ['name' => 'San Ildefonso', 'municipality_id' => 32],
            ['name' => 'San Esteban Catarina', 'municipality_id' => 32],
            ['name' => 'San Sebastián', 'municipality_id' => 32],
            ['name' => 'San Lorenzo', 'municipality_id' => 32],
            ['name' => 'Santo Domingo', 'municipality_id' => 32],

            ['name' => 'Guadalupe', 'municipality_id' => 33],
            ['name' => 'San Cayetano Istepeque', 'municipality_id' => 33],
            ['name' => 'San Vicente', 'municipality_id' => 33],
            ['name' => 'Tecoluca', 'municipality_id' => 33],
            ['name' => 'Tepetitán', 'municipality_id' => 33],
            ['name' => 'Verapaz', 'municipality_id' => 33],

            // Santa Ana
            ['name' => 'Masahuat', 'municipality_id' => 34],
            ['name' => 'Metapán', 'municipality_id' => 34],
            ['name' => 'Santa Rosa Guachipilín', 'municipality_id' => 34],
            ['name' => 'Texistepeque', 'municipality_id' => 34],

            ['name' => 'Santa Ana', 'municipality_id' => 35],

            ['name' => 'Coatepeque', 'municipality_id' => 36],
            ['name' => 'El Congo', 'municipality_id' => 36],

            ['name' => 'Candelaria de la Frontera', 'municipality_id' => 37],
            ['name' => 'Chalchuapa', 'municipality_id' => 37],
            ['name' => 'El Porvenir', 'municipality_id' => 37],
            ['name' => 'San Antonio Pajonal', 'municipality_id' => 37],
            ['name' => 'San Sebastián Salitrillo', 'municipality_id' => 37],
            ['name' => 'Santiago de la Frontera', 'municipality_id' => 37],


            // Sonsonate
            ['name' => 'Juayúa', 'municipality_id' => 38],
            ['name' => 'Nahuizalco', 'municipality_id' => 38],
            ['name' => 'Salcoatitán', 'municipality_id' => 38],
            ['name' => 'Santa Catarina Masahuat', 'municipality_id' => 38],

            ['name' => 'Sonsonate', 'municipality_id' => 39],
            ['name' => 'Sonzacate', 'municipality_id' => 39],
            ['name' => 'Nahulingo', 'municipality_id' => 39],
            ['name' => 'San Antonio del Monte', 'municipality_id' => 39],
            ['name' => 'Santo Domingo de Guzmán', 'municipality_id' => 39],


            ['name' => 'Armenia', 'municipality_id' => 40],
            ['name' => 'Caluco', 'municipality_id' => 40],
            ['name' => 'Cuisnahuat', 'municipality_id' => 40],
            ['name' => 'Izalco', 'municipality_id' => 40],
            ['name' => 'San Julián', 'municipality_id' => 40],
            ['name' => 'Santa Isabel Ishuatán', 'municipality_id' => 40],

            ['name' => 'Acajutla', 'municipality_id' => 41],
            // Usulután
            ['name' => 'Alegría', 'municipality_id' => 42],
            ['name' => 'Berlín', 'municipality_id' => 42],
            ['name' => 'El Triunfo', 'municipality_id' => 42],
            ['name' => 'Estanzuelas', 'municipality_id' => 42],
            ['name' => 'Jucuapa', 'municipality_id' => 42],
            ['name' => 'Mercedes Umaña', 'municipality_id' => 42],
            ['name' => 'Nueva Granada', 'municipality_id' => 42],
            ['name' => 'San Buenaventura', 'municipality_id' => 42],
            ['name' => 'Santiago de María', 'municipality_id' => 42],

            ['name' => 'California', 'municipality_id' => 43],
            ['name' => 'Concepción Batres', 'municipality_id' => 43],
            ['name' => 'Ereguayquín', 'municipality_id' => 43],
            ['name' => 'Jucuarán', 'municipality_id' => 43],
            ['name' => 'Ozatlán', 'municipality_id' => 43],
            ['name' => 'Santa Elena', 'municipality_id' => 43],
            ['name' => 'San Dionisio', 'municipality_id' => 43],
            ['name' => 'Tecapán', 'municipality_id' => 43],
            ['name' => 'Usulután', 'municipality_id' => 43],

            ['name' => 'Jiquilisco', 'municipality_id' => 44],
            ['name' => 'Puerto El Triunfo', 'municipality_id' => 44],
            ['name' => 'San Agustín', 'municipality_id' => 44],
            ['name' => 'San Francisco Javier', 'municipality_id' => 44],

        ];


        foreach($districts as $district){
            District::create($district);
        }
    }
}
