<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePermissionRequest extends FormRequest
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
        // Implementación correcta de la regla unique para la actualización
        return [
            'name' => [
                'required', 
                'string', 
                'max:45',
                Rule::unique('permissions', 'name')->ignore($this->route('permission'))
            ]
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe exceder los 45 caracteres.',
            'name.unique' => 'Este nombre de permiso ya está registrado en el sistema.'
        ];
    }
}
