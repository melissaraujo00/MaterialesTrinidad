<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
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
            'name' =>[
                'required',
                'string',
                'max:50',
                'unique:roles'
            ]
            ,
            'description' => [
                'required',
                'string',
                'max:50',
                'unique:roles'
            ],
            'permissions' => [
                'required',
                'array'
            ],
            'permissions.*' => [
                'required',
                'exists:permissions,name'
            ]
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.min' => 'El nombre debe tener al menos 3 caracteres.',
            'name.unique' => 'Este nombre de rol ya está registrado.'

        ];
    }
}
