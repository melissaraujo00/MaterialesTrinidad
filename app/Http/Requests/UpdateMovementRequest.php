<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMovementRequest extends FormRequest
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
                'product_quantity' => [
                    'required',
                    'integer'
                ],
                'product_id' => [
                    'required',
                    'integer'
                ],
                'type_id' => [
                    'required',
                    'integer'
                ]
        ];
    }
    public function messages()
    {
        return [
            'product_quantity.required' => 'El campo cantidad es obligatorio.',
            'product_quantity.integer' => 'El campo cantidad debe ser un número entero.',
            'product_id.required' => 'El campo producto es obligatorio.',
            'product_id.integer' => 'El campo producto debe ser un número entero.',
            'type_id.required' => 'El campo tipo es obligatorio.',
            'type_id.integer' => 'El campo tipo debe ser un número entero.'
        ];
    }
}