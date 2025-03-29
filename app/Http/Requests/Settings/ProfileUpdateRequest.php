<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3'],
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'birthdate' => ['required', 'date'], // <- Agregado
            'phoneNumber' => ['required', 'string', 'max:20'], // <- Agregado
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.min' => 'El nombre debe tener al menos 3 caracteres.',

            'firstName.required' => 'El primer nombre es obligatorio.',
            'firstName.string' => 'El primer nombre debe ser una cadena de texto.',

            'lastName.required' => 'El apellido es obligatorio.',
            'lastName.string' => 'El apellido debe ser una cadena de texto.',

            'email.required' => 'El correo electrónico es obligatorio.',
            'email.string' => 'El correo electrónico debe ser una cadena de texto.',
            'email.email' => 'El correo electrónico debe ser válido.',
            'email.unique' => 'Este correo electrónico ya está registrado.',

            'birthdate.required' => 'La fecha de nacimiento es obligatoria.',
            'birthdate.string' => 'La fecha de nacimiento debe ser una cadena de texto.',

            'phoneNumber.required' => 'El número de teléfono es obligatorio.',
            'phoneNumber.string' => 'El número de teléfono debe ser una cadena de texto.',
            'phoneNumber.unique' => 'Este número de teléfono ya está registrado.',

            'password.required' => 'La contraseña es obligatoria.',
            'password.string' => 'La contraseña debe ser una cadena de texto.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.regex' => 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.',

            'role_id.required' => 'El rol es obligatorio.',
            'role_id.integer' => 'El rol debe ser un número entero.',
            'role_id.exists' => 'El rol seleccionado no es válido.',
        ];
    }
}
