<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules():array
{
    $rules = [
        'name' => ['required', 'string', 'min:3'],
        'firstName' => ['required', 'string'],
        'lastName' => ['required', 'string'],
        'email' => ['required', 'string', 'email', Rule::unique('users', 'email')->ignore($this->user)],
        'birthdate' => ['required', 'string'],
        'phoneNumber' => ['required', 'string', Rule::unique('users', 'phoneNumber')->ignore($this->user)],
        'role_id' => ['required', 'integer', 'exists:roles,id'],
    ];

    // Si la contraseña está presente en la solicitud (es decir, si se va a cambiar)
    if ($this->filled('password')) {
        $rules['password'] = [
            'required',
            'string',
            'min:8',
            'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];
    } else {
        // Si no se está modificando la contraseña, puedes hacerla nullable
        $rules['password'] = ['nullable', 'string', 'min:8', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/'];
    }

    return $rules;
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
