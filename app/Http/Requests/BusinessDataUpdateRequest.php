<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BusinessDataUpdateRequest extends FormRequest
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
            'name' => 'required|string|min:2|max:255',
            'nit' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'description' => 'nullable|string|max:1000',
            'logo_path' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la empresa es obligatorio',
            'name.min' => 'El nombre debe tener al menos 2 caracteres',
            'nit.required' => 'El NIT es obligatorio',
            'address.required' => 'La dirección es obligatoria',
            'phoneNumber.required' => 'El número de teléfono es obligatorio',
            'email.required' => 'El correo electrónico es obligatorio',
            'email.email' => 'Por favor, introduce un correo electrónico válido',
            'logo_path.image' => 'El archivo debe ser una imagen',
            'logo_path.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg o webp',
            'logo_path.max' => 'La imagen no debe pesar más de 2MB',
        ];
    }
}
