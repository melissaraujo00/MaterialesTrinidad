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

            ['name' => 'Comasagua', 'municipality_id' => 15],
            ['name' => 'Santa Tecla', 'municipality_id' => 15],

            // La Paz
            ['name' => 'Cuyultitán', 'municipality_id' => 16],
            ['name' => 'Olocuilta', 'municipality_id' => 16],
            ['name' => 'San Juan Talpa', 'municipality_id' => 16],
            ['name' => 'San Luis Talpa', 'municipality_id' => 16],
            ['name' => 'San Pedro Masahuat', 'municipality_id' => 16],
            ['name' => 'Tapalhuaca', 'municipality_id' => 16],
            ['name' => 'San Francisco Chinameca', 'municipality_id' => 16],

            ['name' => 'El Rosario', 'municipality_id' => 17],
            ['name' => 'Jerusalén', 'municipality_id' => 17],
            ['name' => 'Mercedes La Ceiba', 'municipality_id' => 17],
            ['name' => 'Paraíso de Osorio', 'municipality_id' => 17],
            ['name' => 'San Antonio Masahuat', 'municipality_id' => 17],
            ['name' => 'San Emigdio', 'municipality_id' => 17],
            ['name' => 'San Juan Tepezontes', 'municipality_id' => 17],
            ['name' => 'San Luis La Herradura', 'municipality_id' => 17],
            ['name' => 'San Miguel Tepezontes', 'municipality_id' => 17],
            ['name' => 'San Pedro Nonualco', 'municipality_id' => 17],
            ['name' => 'Santa María Ostuma', 'municipality_id' => 17],
            ['name' => 'Santiago Nonualco', 'municipality_id' => 17],

            ['name' => 'San Juan Nonualco', 'municipality_id' => 18],
            ['name' => 'San Rafael Obrajuelo', 'municipality_id' => 18],
            ['name' => 'Zacatecoluca', 'municipality_id' => 18],

            // La Unión
            ['name' => 'Anamorós', 'municipality_id' => 19],
            ['name' => 'Bolívar', 'municipality_id' => 19],
            ['name' => 'Concepción de Oriente', 'municipality_id' => 19],
            ['name' => 'El Sauce', 'municipality_id' => 19],
            ['name' => 'Lislique', 'municipality_id' => 19],
            ['name' => 'Nueva Esparta', 'municipality_id' => 19],
            ['name' => 'Pasaquina', 'municipality_id' => 19],
            ['name' => 'Polorós', 'municipality_id' => 19],
            ['name' => 'San José', 'municipality_id' => 19],
            ['name' => 'Santa Rosa de Lima', 'municipality_id' => 19],

            ['name' => 'Conchagua', 'municipality_id' => 20],
            ['name' => 'El Carmen', 'municipality_id' => 20],
            ['name' => 'Intipucá', 'municipality_id' => 20],
            ['name' => 'La Unión', 'municipality_id' => 20],
            ['name' => 'Meanguera del Golfo', 'municipality_id' => 20],
            ['name' => 'San Alejo', 'municipality_id' => 20],
            ['name' => 'Yayantique', 'municipality_id' => 20],
            ['name' => 'Yucuaiquín', 'municipality_id' => 20],

            // Morazán
            ['name' => 'Arambala', 'municipality_id' => 21],
            ['name' => 'Cacaopera', 'municipality_id' => 21],
            ['name' => 'Corinto', 'municipality_id' => 21],
            ['name' => 'El Rosario', 'municipality_id' => 21],
            ['name' => 'Joateca', 'municipality_id' => 21],
            ['name' => 'Jocoaitique', 'municipality_id' => 21],
            ['name' => 'Meanguera', 'municipality_id' => 21],
            ['name' => 'Perquín', 'municipality_id' => 21],
            ['name' => 'San Fernando', 'municipality_id' => 21],
            ['name' => 'San Isidro', 'municipality_id' => 21],
            ['name' => 'Torola', 'municipality_id' => 21],


            ['name' => 'Chilanga', 'municipality_id' => 22],
            ['name' => 'Delicias de Concepción', 'municipality_id' => 22],
            ['name' => 'El Divisadero', 'municipality_id' => 22],
            ['name' => 'Gualococti', 'municipality_id' => 22],
            ['name' => 'Guatajiagua', 'municipality_id' => 22],
            ['name' => 'Jocoro', 'municipality_id' => 22],
            ['name' => 'Lolotiquillo', 'municipality_id' => 22],
            ['name' => 'Osicala', 'municipality_id' => 22],
            ['name' => 'San Carlos', 'municipality_id' => 22],
            ['name' => 'San Francisco Gotera', 'municipality_id' => 22],
            ['name' => 'San Simón', 'municipality_id' => 22],
            ['name' => 'Sensembra', 'municipality_id' => 22],
            ['name' => 'Sociedad', 'municipality_id' => 22],
            ['name' => 'Yamabal', 'municipality_id' => 22],
            ['name' => 'Yoloaiquín', 'municipality_id' => 22],

            // San Miguel
            ['name' => 'Carolina', 'municipality_id' => 23],
            ['name' => 'Chapeltique', 'municipality_id' => 23],
            ['name' => 'Ciudad Barrios', 'municipality_id' => 23],
            ['name' => 'San Antonio del Mosco', 'municipality_id' => 23],
            ['name' => 'San Gerardo', 'municipality_id' => 23],
            ['name' => 'San Luis de la Reina', 'municipality_id' => 23],
            ['name' => 'Sesori', 'municipality_id' => 23],
            ['name' => 'Nuevo Edén de San Juan', 'municipality_id' => 23],

            ['name' => 'San Miguel', 'municipality_id' => 24],
            ['name' => 'Comacarán', 'municipality_id' => 24],
            ['name' => 'Uluazapa', 'municipality_id' => 24],
            ['name' => 'Moncagua', 'municipality_id' => 24],
            ['name' => 'Quelepa', 'municipality_id' => 24],
            ['name' => 'Chirilagua', 'municipality_id' => 24],

            ['name' => 'Chinameca', 'municipality_id' => 25],
            ['name' => 'El Tránsito', 'municipality_id' => 25],
            ['name' => 'Lolotique', 'municipality_id' => 25],
            ['name' => 'Nueva Guadalupe', 'municipality_id' => 25],
            ['name' => 'San Jorge', 'municipality_id' => 25],
            ['name' => 'San Rafael Oriente', 'municipality_id' => 25],

            // San Salvador
            ['name' => 'Aguilares', 'municipality_id' => 26],
            ['name' => 'El Paisnal', 'municipality_id' => 26],
            ['name' => 'Guazapa', 'municipality_id' => 26],

            ['name' => 'Apopa', 'municipality_id' => 27],
            ['name' => 'Nejapa', 'municipality_id' => 27],

            ['name' => 'Ilopango', 'municipality_id' => 28],
            ['name' => 'San Martín', 'municipality_id' => 28],
            ['name' => 'Soyapango', 'municipality_id' => 28],
            ['name' => 'Tonacatepeque', 'municipality_id' => 28],

            ['name' => 'Ayutuxtepeque', 'municipality_id' => 29],
            ['name' => 'Mejicanos', 'municipality_id' => 29],
            ['name' => 'Cuscatancingo', 'municipality_id' => 29],
            ['name' => 'Ciudad Delgado', 'municipality_id' => 29],
            ['name' => 'San Salvador', 'municipality_id' => 29],


            ['name' => 'Panchimalco', 'municipality_id' => 30],
            ['name' => 'San Marcos', 'municipality_id' => 30],
            ['name' => 'Santo Tomás', 'municipality_id' => 30],
            ['name' => 'Santiago Texacuangos', 'municipality_id' => 30],
            ['name' => 'Rosario de Mora', 'municipality_id' => 30],

            // San Vicente
            ['name' => 'Apastepeque', 'municipality_id' => 31],
            ['name' => 'Santa Clara', 'municipality_id' => 31],
            ['name' => 'San Ildefonso', 'municipality_id' => 31],
            ['name' => 'San Esteban Catarina', 'municipality_id' => 31],
            ['name' => 'San Sebastián', 'municipality_id' => 31],
            ['name' => 'San Lorenzo', 'municipality_id' => 31],
            ['name' => 'Santo Domingo', 'municipality_id' => 31],

            ['name' => 'Guadalupe', 'municipality_id' => 32],
            ['name' => 'San Cayetano Istepeque', 'municipality_id' => 32],
            ['name' => 'San Vicente', 'municipality_id' => 32],
            ['name' => 'Tecoluca', 'municipality_id' => 32],
            ['name' => 'Tepetitán', 'municipality_id' => 32],
            ['name' => 'Verapaz', 'municipality_id' => 32],

            // Santa Ana
            ['name' => 'Masahuat', 'municipality_id' => 33],
            ['name' => 'Metapán', 'municipality_id' => 33],
            ['name' => 'Santa Rosa Guachipilín', 'municipality_id' => 33],
            ['name' => 'Texistepeque', 'municipality_id' => 33],

            ['name' => 'Santa Ana', 'municipality_id' => 34],

            ['name' => 'Coatepeque', 'municipality_id' => 35],
            ['name' => 'El Congo', 'municipality_id' => 35],

            ['name' => 'Candelaria de la Frontera', 'municipality_id' => 36],
            ['name' => 'Chalchuapa', 'municipality_id' => 36],
            ['name' => 'El Porvenir', 'municipality_id' => 36],
            ['name' => 'San Antonio Pajonal', 'municipality_id' => 36],
            ['name' => 'San Sebastián Salitrillo', 'municipality_id' => 36],
            ['name' => 'Santiago de la Frontera', 'municipality_id' => 36],


            // Sonsonate
            ['name' => 'Juayúa', 'municipality_id' => 37],
            ['name' => 'Nahuizalco', 'municipality_id' => 37],
            ['name' => 'Salcoatitán', 'municipality_id' => 37],
            ['name' => 'Santa Catarina Masahuat', 'municipality_id' => 37],

            ['name' => 'Sonsonate', 'municipality_id' => 38],
            ['name' => 'Sonzacate', 'municipality_id' => 38],
            ['name' => 'Nahulingo', 'municipality_id' => 38],
            ['name' => 'San Antonio del Monte', 'municipality_id' => 38],
            ['name' => 'Santo Domingo de Guzmán', 'municipality_id' => 38],


            ['name' => 'Armenia', 'municipality_id' => 39],
            ['name' => 'Caluco', 'municipality_id' => 39],
            ['name' => 'Cuisnahuat', 'municipality_id' => 39],
            ['name' => 'Izalco', 'municipality_id' => 39],
            ['name' => 'San Julián', 'municipality_id' => 39],
            ['name' => 'Santa Isabel Ishuatán', 'municipality_id' => 39],

            ['name' => 'Acajutla', 'municipality_id' => 40],
            // Usulután
            ['name' => 'Alegría', 'municipality_id' => 41],
            ['name' => 'Berlín', 'municipality_id' => 41],
            ['name' => 'El Triunfo', 'municipality_id' => 41],
            ['name' => 'Estanzuelas', 'municipality_id' => 41],
            ['name' => 'Jucuapa', 'municipality_id' => 41],
            ['name' => 'Mercedes Umaña', 'municipality_id' => 41],
            ['name' => 'Nueva Granada', 'municipality_id' => 41],
            ['name' => 'San Buenaventura', 'municipality_id' => 41],
            ['name' => 'Santiago de María', 'municipality_id' => 41],

            ['name' => 'California', 'municipality_id' => 41],
            ['name' => 'Concepción Batres', 'municipality_id' => 41],
            ['name' => 'Ereguayquín', 'municipality_id' => 41],
            ['name' => 'Jucuarán', 'municipality_id' => 41],
            ['name' => 'Ozatlán', 'municipality_id' => 41],
            ['name' => 'Santa Elena', 'municipality_id' => 41],
            ['name' => 'San Dionisio', 'municipality_id' => 41],
            ['name' => 'Tecapán', 'municipality_id' => 41],
            ['name' => 'Usulután', 'municipality_id' => 41],

            ['name' => 'Jiquilisco', 'municipality_id' => 42],
            ['name' => 'Puerto El Triunfo', 'municipality_id' => 42],
            ['name' => 'San Agustín', 'municipality_id' => 42],
            ['name' => 'San Francisco Javier', 'municipality_id' => 42],

        ];


        foreach($districts as $district){
            District::create($district);
        }
    }
}
