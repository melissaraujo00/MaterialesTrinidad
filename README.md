# 🛒 Sistema de Cotización - Laravel

Este es un sistema de cotización desarrollado con Laravel. A continuación, se detallan los pasos para clonar y configurar el proyecto correctamente.

## 🚀 Instalación y Configuración

1️⃣ **Clonar el repositorio** con `git clone url_repositorio`

2️⃣ **Configurar variables de entorno** copiando el archivo `.env.example` y renombrándolo a `.env`. Luego, edita el archivo `.env` y configura las credenciales de tu base de datos.  
DB_CONNECTION=mysql
DB_DATABASE=materialesTrinidad
DB_USERNAME=root
DB_PASSWORD= suclave

3️⃣ **Instalar dependencias** con `composer install` y `npm install`.  

4️⃣ **Generar la clave de la aplicación** ejecutando `php artisan key:generate`.  

5️⃣ **Ejecutar migraciones** con `php artisan migrate`.  

6️⃣ **Agregar nuevo usaurio** con `php artisan tinker` y colocar 
\App\Models\User::create(['name'=>'usuario','firstName'=> 'Dalia','lastName' => 'apellido', 'email'=> 'correo', 'birthdate' => 'fechaNacimiento','phoneNumber' => 'numero', 'password'=> 'contraseña', 'role_id'=> 1 ]);

7️⃣  **Compilar los assets** con `npm run build` (o `npm run dev` en desarrollo).  


