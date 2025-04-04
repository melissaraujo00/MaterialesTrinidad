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
           'name' => [
                'required',
                'string',
                'max:65'
            ],
            'email' => [
                'nullable',
                'email'
            ],
            'phoneNumber' => [
                'required',
                'string',
                'max:15'
            ],
            'nit' => [
                'nullable',
                'string',
                'max:17'
            ],
            'district_id' => [
                'required',
                'exists:districts,id'
            ],
            'address' => [
                'nullable',
                'string',
            ],

            'description' =>[
                'nullable',
                'string',
            ],
            'status' =>  [
                'required',
                'string'
            ]

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
            'name.min' => 'El nombre debe tener al menos 3 caracteres.'
        ];
    }
}