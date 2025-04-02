<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación para actualizar un cliente.
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'min:3'],
            'email' => ['required', 'string', 'email', Rule::unique('customers', 'email')->ignore($this->customer)],
            'phone' => ['required', 'string', 'max:15', Rule::unique('customers', 'phone')->ignore($this->customer)],
            'district_id' => ['required', 'integer', 'exists:districts,id'],
            'municipality_id' => ['required', 'integer', 'exists:municipalities,id'],
            'department_id' => ['required', 'integer', 'exists:departments,id'],
        ];

        return $rules;
    }

    /**
     * Mensajes de error personalizados para la validación.
     */
    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.min' => 'El nombre debe tener al menos 3 caracteres.',

            'email.required' => 'El correo electrónico es obligatorio.',
            'email.string' => 'El correo electrónico debe ser una cadena de texto.',
            'email.email' => 'El correo electrónico debe ser válido.',
            'email.unique' => 'Este correo electrónico ya está registrado.',

            'phone.required' => 'El número de teléfono es obligatorio.',
            'phone.string' => 'El número de teléfono debe ser una cadena de texto.',
            'phone.max' => 'El número de teléfono no debe exceder los 15 caracteres.',
            'phone.unique' => 'Este número de teléfono ya está registrado.',

            'district_id.required' => 'El distrito es obligatorio.',
            'district_id.integer' => 'El distrito debe ser un número entero.',
            'district_id.exists' => 'El distrito seleccionado no es válido.',

            'municipality_id.required' => 'El municipio es obligatorio.',
            'municipality_id.integer' => 'El municipio debe ser un número entero.',
            'municipality_id.exists' => 'El municipio seleccionado no es válido.',

            'department_id.required' => 'El departamento es obligatorio.',
            'department_id.integer' => 'El departamento debe ser un número entero.',
            'department_id.exists' => 'El departamento seleccionado no es válido.',
        ];
    }
}