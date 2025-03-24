<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Municipality;

class MunicipalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $municipalities = [
            ['name' => 'Atiquizaya', 'district_id' => 1],
            ['name' => 'El Refugio', 'district_id' => 1],
            ['name' => 'San Lorenzo', 'district_id' => 1],
            ['name' => 'Turín', 'district_id' => 1],
            ['name' => 'Ahuachapán', 'district_id' => 2],
            ['name' => 'Apaneca', 'district_id' => 2],
            ['name' => 'Concepción de Ataco', 'district_id' => 2],
            ['name' => 'Tacuba', 'district_id' => 2],
            ['name' => 'Guaymango', 'district_id' => 3],
            ['name' => 'Jujutla', 'district_id' => 3],
            ['name' => 'San Francisco Menéndez', 'district_id' => 3],
            ['name' => 'San Pedro Puxtla', 'district_id' => 3],

            // Cabañas
            ['name' => 'Guacotecti', 'district_id' => 4],
            ['name' => 'San Isidro', 'district_id' => 4],
            ['name' => 'Sensuntepeque', 'district_id' => 4],
            ['name' => 'Victoria', 'district_id' => 4],
            ['name' => 'Dolores', 'district_id' => 4],
            ['name' => 'Cinquera', 'district_id' => 5],
            ['name' => 'Ilobasco', 'district_id' => 5],
            ['name' => 'Jutiapa', 'district_id' => 5],
            ['name' => 'Tejutepeque', 'district_id' => 5],
            ['name' => 'San Ignacio', 'district_id' => 8],


            // Chalatenango
            ['name' => 'Citalá', 'district_id' => 6],
            ['name' => 'La Palma', 'district_id' => 6],
            ['name' => 'San Ignacio', 'district_id' => 6],

            ['name' => 'Agua Caliente', 'district_id' => 7],
            ['name' => 'Dulce Nombre de María', 'district_id' => 7],
            ['name' => 'El Paraíso', 'district_id' => 7],
            ['name' => 'La Reina', 'district_id' => 7],
            ['name' => 'Nueva Concepción', 'district_id' => 7],
            ['name' => 'San Fernando', 'district_id' => 7],
            ['name' => 'San Francisco Morazán', 'district_id' => 7],
            ['name' => 'San Rafael', 'district_id' => 7],
            ['name' => 'Santa Rita', 'district_id' => 7],
            ['name' => 'Tejutla', 'district_id' => 7],

            ['name' => 'Arcatao', 'district_id' => 8],
            ['name' => 'Azacualpa', 'district_id' => 8],
            ['name' => 'Chalatenango', 'district_id' => 8],
            ['name' => 'Cancasque', 'district_id' => 8],
            ['name' => 'Comalapa', 'district_id' => 8],
            ['name' => 'Concepción Quezaltepeque', 'district_id' => 8],
            ['name' => 'El Carrizal', 'district_id' => 8],
            ['name' => 'La Laguna', 'district_id' => 8],
            ['name' => 'Las Vueltas', 'district_id' => 8],
            ['name' => 'Nueva Trinidad', 'district_id' => 8],
            ['name' => 'Ojos de Agua', 'district_id' => 8],
            ['name' => 'Potonico', 'district_id' => 8],
            ['name' => 'San Antonio de la Cruz', 'district_id' => 8],
            ['name' => 'San Antonio Los Ranchos', 'district_id' => 8],
            ['name' => 'San Francisco Lempa', 'district_id' => 8],
            ['name' => 'San Isidro Labrador', 'district_id' => 8],
            ['name' => 'San Luis del Carmen', 'district_id' => 8],
            ['name' => 'San Miguel de Mercedes', 'district_id' => 8],
            ['name' => 'Las Flores', 'district_id' => 8],
            ['name' => 'Nombre de Jesús', 'district_id' => 8],


            // Cuscatlán
            ['name' => 'Suchitoto', 'district_id' => 9],
            ['name' => 'San José Guayabal', 'district_id' => 9],
            ['name' => 'Oratorio de Concepción', 'district_id' => 9],
            ['name' => 'San Bartolomé Perulapía', 'district_id' => 9],
            ['name' => 'San Pedro Perulapán', 'district_id' => 9],

            ['name' => 'Candelaria', 'district_id' => 10],
            ['name' => 'Cojutepeque', 'district_id' => 10],
            ['name' => 'El Carmen', 'district_id' => 10],
            ['name' => 'El Rosario', 'district_id' => 10],
            ['name' => 'Monte San Juan', 'district_id' => 10],
            ['name' => 'San Cristóbal', 'district_id' => 10],
            ['name' => 'San Rafael Cedros', 'district_id' => 10],
            ['name' => 'San Ramón', 'district_id' => 10],
            ['name' => 'Santa Cruz Analquito', 'district_id' => 10],
            ['name' => 'Santa Cruz Michapa', 'district_id' => 10],
            ['name' => 'Tenancingo', 'district_id' => 10],

            // La Libertad
            ['name' => 'Quezaltepeque', 'district_id' => 11],
            ['name' => 'San Matías', 'district_id' => 11],
            ['name' => 'San Pablo Tacachico', 'district_id' => 11],

            ['name' => 'San Juan Opico', 'district_id' => 12],
            ['name' => 'Ciudad Arce', 'district_id' => 12],

            ['name' => 'Colón', 'district_id' => 13],
            ['name' => 'Jayaque', 'district_id' => 13],
            ['name' => 'Sacacoyo', 'district_id' => 13],
            ['name' => 'Tepecoyo', 'district_id' => 13],
            ['name' => 'Talnique', 'district_id' => 13],

            ['name' => 'Antiguo Cuscatlán', 'district_id' => 14],
            ['name' => 'Nuevo Cuscatlán', 'district_id' => 14],
            ['name' => 'Huizúcar', 'district_id' => 14],
            ['name' => 'San José Villanueva', 'district_id' => 14],
            ['name' => 'Zaragoza', 'district_id' => 14],

            ['name' => 'Chiltiupán', 'district_id' => 15],
            ['name' => 'Jicalapa', 'district_id' => 15],
            ['name' => 'La Libertad', 'district_id' => 15],
            ['name' => 'Tamanique', 'district_id' => 15],
            ['name' => 'Teotepeque', 'district_id' => 15],

            ['name' => 'Comasagua', 'district_id' => 15],
            ['name' => 'Santa Tecla', 'district_id' => 15],

            // La Paz
            ['name' => 'Cuyultitán', 'district_id' => 16],
            ['name' => 'Olocuilta', 'district_id' => 16],
            ['name' => 'San Juan Talpa', 'district_id' => 16],
            ['name' => 'San Luis Talpa', 'district_id' => 16],
            ['name' => 'San Pedro Masahuat', 'district_id' => 16],
            ['name' => 'Tapalhuaca', 'district_id' => 16],
            ['name' => 'San Francisco Chinameca', 'district_id' => 16],

            ['name' => 'El Rosario', 'district_id' => 17],
            ['name' => 'Jerusalén', 'district_id' => 17],
            ['name' => 'Mercedes La Ceiba', 'district_id' => 17],
            ['name' => 'Paraíso de Osorio', 'district_id' => 17],
            ['name' => 'San Antonio Masahuat', 'district_id' => 17],
            ['name' => 'San Emigdio', 'district_id' => 17],
            ['name' => 'San Juan Tepezontes', 'district_id' => 17],
            ['name' => 'San Luis La Herradura', 'district_id' => 17],
            ['name' => 'San Miguel Tepezontes', 'district_id' => 17],
            ['name' => 'San Pedro Nonualco', 'district_id' => 17],
            ['name' => 'Santa María Ostuma', 'district_id' => 17],
            ['name' => 'Santiago Nonualco', 'district_id' => 17],

            ['name' => 'San Juan Nonualco', 'district_id' => 18],
            ['name' => 'San Rafael Obrajuelo', 'district_id' => 18],
            ['name' => 'Zacatecoluca', 'district_id' => 18],

            // La Unión
            ['name' => 'Anamorós', 'district_id' => 19],
            ['name' => 'Bolívar', 'district_id' => 19],
            ['name' => 'Concepción de Oriente', 'district_id' => 19],
            ['name' => 'El Sauce', 'district_id' => 19],
            ['name' => 'Lislique', 'district_id' => 19],
            ['name' => 'Nueva Esparta', 'district_id' => 19],
            ['name' => 'Pasaquina', 'district_id' => 19],
            ['name' => 'Polorós', 'district_id' => 19],
            ['name' => 'San José', 'district_id' => 19],
            ['name' => 'Santa Rosa de Lima', 'district_id' => 19],

            ['name' => 'Conchagua', 'district_id' => 20],
            ['name' => 'El Carmen', 'district_id' => 20],
            ['name' => 'Intipucá', 'district_id' => 20],
            ['name' => 'La Unión', 'district_id' => 20],
            ['name' => 'Meanguera del Golfo', 'district_id' => 20],
            ['name' => 'San Alejo', 'district_id' => 20],
            ['name' => 'Yayantique', 'district_id' => 20],
            ['name' => 'Yucuaiquín', 'district_id' => 20],

            // Morazán
            ['name' => 'Arambala', 'district_id' => 21],
            ['name' => 'Cacaopera', 'district_id' => 21],
            ['name' => 'Corinto', 'district_id' => 21],
            ['name' => 'El Rosario', 'district_id' => 21],
            ['name' => 'Joateca', 'district_id' => 21],
            ['name' => 'Jocoaitique', 'district_id' => 21],
            ['name' => 'Meanguera', 'district_id' => 21],
            ['name' => 'Perquín', 'district_id' => 21],
            ['name' => 'San Fernando', 'district_id' => 21],
            ['name' => 'San Isidro', 'district_id' => 21],
            ['name' => 'Torola', 'district_id' => 21],


            ['name' => 'Chilanga', 'district_id' => 22],
            ['name' => 'Delicias de Concepción', 'district_id' => 22],
            ['name' => 'El Divisadero', 'district_id' => 22],
            ['name' => 'Gualococti', 'district_id' => 22],
            ['name' => 'Guatajiagua', 'district_id' => 22],
            ['name' => 'Jocoro', 'district_id' => 22],
            ['name' => 'Lolotiquillo', 'district_id' => 22],
            ['name' => 'Osicala', 'district_id' => 22],
            ['name' => 'San Carlos', 'district_id' => 22],
            ['name' => 'San Francisco Gotera', 'district_id' => 22],
            ['name' => 'San Simón', 'district_id' => 22],
            ['name' => 'Sensembra', 'district_id' => 22],
            ['name' => 'Sociedad', 'district_id' => 22],
            ['name' => 'Yamabal', 'district_id' => 22],
            ['name' => 'Yoloaiquín', 'district_id' => 22],

            // San Miguel
            ['name' => 'Carolina', 'district_id' => 23],
            ['name' => 'Chapeltique', 'district_id' => 23],
            ['name' => 'Ciudad Barrios', 'district_id' => 23],
            ['name' => 'San Antonio del Mosco', 'district_id' => 23],
            ['name' => 'San Gerardo', 'district_id' => 23],
            ['name' => 'San Luis de la Reina', 'district_id' => 23],
            ['name' => 'Sesori', 'district_id' => 23],
            ['name' => 'Nuevo Edén de San Juan', 'district_id' => 23],

            ['name' => 'San Miguel', 'district_id' => 24],
            ['name' => 'Comacarán', 'district_id' => 24],
            ['name' => 'Uluazapa', 'district_id' => 24],
            ['name' => 'Moncagua', 'district_id' => 24],
            ['name' => 'Quelepa', 'district_id' => 24],
            ['name' => 'Chirilagua', 'district_id' => 24],

            ['name' => 'Chinameca', 'district_id' => 25],
            ['name' => 'El Tránsito', 'district_id' => 25],
            ['name' => 'Lolotique', 'district_id' => 25],
            ['name' => 'Nueva Guadalupe', 'district_id' => 25],
            ['name' => 'San Jorge', 'district_id' => 25],
            ['name' => 'San Rafael Oriente', 'district_id' => 25],

            // San Salvador
            ['name' => 'Aguilares', 'district_id' => 26],
            ['name' => 'El Paisnal', 'district_id' => 26],
            ['name' => 'Guazapa', 'district_id' => 26],

            ['name' => 'Apopa', 'district_id' => 27],
            ['name' => 'Nejapa', 'district_id' => 27],

            ['name' => 'Ilopango', 'district_id' => 28],
            ['name' => 'San Martín', 'district_id' => 28],
            ['name' => 'Soyapango', 'district_id' => 28],
            ['name' => 'Tonacatepeque', 'district_id' => 28],

            ['name' => 'Ayutuxtepeque', 'district_id' => 29],
            ['name' => 'Mejicanos', 'district_id' => 29],
            ['name' => 'Cuscatancingo', 'district_id' => 29],
            ['name' => 'Ciudad Delgado', 'district_id' => 29],
            ['name' => 'San Salvador', 'district_id' => 29],


            ['name' => 'Panchimalco', 'district_id' => 30],
            ['name' => 'San Marcos', 'district_id' => 30],
            ['name' => 'Santo Tomás', 'district_id' => 30],
            ['name' => 'Santiago Texacuangos', 'district_id' => 30],
            ['name' => 'Rosario de Mora', 'district_id' => 30],

            // San Vicente
            ['name' => 'Apastepeque', 'district_id' => 31],
            ['name' => 'Santa Clara', 'district_id' => 31],
            ['name' => 'San Ildefonso', 'district_id' => 31],
            ['name' => 'San Esteban Catarina', 'district_id' => 31],
            ['name' => 'San Sebastián', 'district_id' => 31],
            ['name' => 'San Lorenzo', 'district_id' => 31],
            ['name' => 'Santo Domingo', 'district_id' => 31],

            ['name' => 'Guadalupe', 'district_id' => 32],
            ['name' => 'San Cayetano Istepeque', 'district_id' => 32],
            ['name' => 'San Vicente', 'district_id' => 32],
            ['name' => 'Tecoluca', 'district_id' => 32],
            ['name' => 'Tepetitán', 'district_id' => 32],
            ['name' => 'Verapaz', 'district_id' => 32],

            // Santa Ana
            ['name' => 'Masahuat', 'district_id' => 33],
            ['name' => 'Metapán', 'district_id' => 33],
            ['name' => 'Santa Rosa Guachipilín', 'district_id' => 33],
            ['name' => 'Texistepeque', 'district_id' => 33],

            ['name' => 'Santa Ana', 'district_id' => 34],

            ['name' => 'Coatepeque', 'district_id' => 35],
            ['name' => 'El Congo', 'district_id' => 35],

            ['name' => 'Candelaria de la Frontera', 'district_id' => 36],
            ['name' => 'Chalchuapa', 'district_id' => 36],
            ['name' => 'El Porvenir', 'district_id' => 36],
            ['name' => 'San Antonio Pajonal', 'district_id' => 36],
            ['name' => 'San Sebastián Salitrillo', 'district_id' => 36],
            ['name' => 'Santiago de la Frontera', 'district_id' => 36],


            // Sonsonate
            ['name' => 'Juayúa', 'district_id' => 37],
            ['name' => 'Nahuizalco', 'district_id' => 37],
            ['name' => 'Salcoatitán', 'district_id' => 37],
            ['name' => 'Santa Catarina Masahuat', 'district_id' => 37],

            ['name' => 'Sonsonate', 'district_id' => 38],
            ['name' => 'Sonzacate', 'district_id' => 38],
            ['name' => 'Nahulingo', 'district_id' => 38],
            ['name' => 'San Antonio del Monte', 'district_id' => 38],
            ['name' => 'Santo Domingo de Guzmán', 'district_id' => 38],


            ['name' => 'Armenia', 'district_id' => 39],
            ['name' => 'Caluco', 'district_id' => 39],
            ['name' => 'Cuisnahuat', 'district_id' => 39],
            ['name' => 'Izalco', 'district_id' => 39],
            ['name' => 'San Julián', 'district_id' => 39],
            ['name' => 'Santa Isabel Ishuatán', 'district_id' => 39],

            ['name' => 'Acajutla', 'district_id' => 40],
            // Usulután
            ['name' => 'Alegría', 'district_id' => 41],
            ['name' => 'Berlín', 'district_id' => 41],
            ['name' => 'El Triunfo', 'district_id' => 41],
            ['name' => 'Estanzuelas', 'district_id' => 41],
            ['name' => 'Jucuapa', 'district_id' => 41],
            ['name' => 'Mercedes Umaña', 'district_id' => 41],
            ['name' => 'Nueva Granada', 'district_id' => 41],
            ['name' => 'San Buenaventura', 'district_id' => 41],
            ['name' => 'Santiago de María', 'district_id' => 41],

            ['name' => 'California', 'district_id' => 41],
            ['name' => 'Concepción Batres', 'district_id' => 41],
            ['name' => 'Ereguayquín', 'district_id' => 41],
            ['name' => 'Jucuarán', 'district_id' => 41],
            ['name' => 'Ozatlán', 'district_id' => 41],
            ['name' => 'Santa Elena', 'district_id' => 41],
            ['name' => 'San Dionisio', 'district_id' => 41],
            ['name' => 'Tecapán', 'district_id' => 41],
            ['name' => 'Usulután', 'district_id' => 41],

            ['name' => 'Jiquilisco', 'district_id' => 42],
            ['name' => 'Puerto El Triunfo', 'district_id' => 42],
            ['name' => 'San Agustín', 'district_id' => 42],
            ['name' => 'San Francisco Javier', 'district_id' => 42],

        ];

        foreach($municipalities as $municipality){
            Municipality::create($municipality);
        }
    }
}
