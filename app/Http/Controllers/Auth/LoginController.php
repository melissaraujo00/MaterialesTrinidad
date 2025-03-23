<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'require',
        ]);

       
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
            // Si la autenticación es exitosa, redirigir al usuario
            return redirect()->route('home');  // Cambia 'home' por la ruta que desees
        }

        // Si la autenticación falla, mostrar un mensaje de error
        return back()->withErrors(['email' => 'Las credenciales no coinciden con nuestros registros.']);
    }
}
