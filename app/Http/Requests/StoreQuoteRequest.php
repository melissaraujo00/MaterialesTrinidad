<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuoteRequest extends FormRequest
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
            'total' => 'required|numeric|min:0',
            'date' => 'required|date',
            'subtotal' => 'required|numeric|min:0',
            'customer_id' => 'required|exists:customers,id',
            'user_id' => 'required|exists:users,id',
        ];
    }
    public function messages(): array
    {
        return [
            'total.required' => 'El campo total es obligatorio.',
            'total.numeric' => 'El total debe ser un número.',
            'total.min' => 'El total no puede ser negativo.',

            'date.required' => 'La fecha es obligatoria.',
            'date.date' => 'Debe ingresar una fecha válida.',

            'subtotal.required' => 'El campo subtotal es obligatorio.',
            'subtotal.numeric' => 'El subtotal debe ser un número.',
            'subtotal.min' => 'El subtotal no puede ser negativo.',

            'customer_id.required' => 'Debe seleccionar un cliente.',
            'customer_id.exists' => 'El cliente seleccionado no existe.',

            'user_id.required' => 'Debe seleccionar un vendedor.',
            'user_id.exists' => 'El vendedor seleccionado no existe.',
        ];
    }
}
