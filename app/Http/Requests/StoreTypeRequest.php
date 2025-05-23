<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTypeRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'type' =>
            [
                'required',
                'string',
                'min:2',
                'max:50',
                'unique:types'
            ],
            'description' =>
            [
                'string',
                'min:5',
                'max:100',
                'unique:types'
            ],
        ];
    }

    public function messages()
    {
        return [
            'type.required' => 'El nombre es obligatorio.',
            'type.string' => 'El nombre debe ser una cadena de texto.',
            'type.min' => 'El nombre debe tener al menos 3 caracteres.',
            'type.unique' => 'Este tipo de movimiento ya está registrado.'

        ];
    }
}
