<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
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
                'unique:categories',
                'regex:/^[\pL\s\-]+$/u'
            ]
            ,
            'description' => [
                'required',
                'string',
                'max:50',
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.min' => 'El nombre debe tener al menos 3 caracteres.',
            'name.unique' => 'Este nombre de categoria ya está registrado.',
            'name.regex' => 'El nombre solo puede contener letras y guiones.',
            'description.required' => 'La descripcion es obligatorio.',
            'description.string' => 'La descripcion debe ser una cadena de texto.',
            'description.min' => 'La descripcion debe tener al menos 3 caracteres.',

        ];
    }
}
