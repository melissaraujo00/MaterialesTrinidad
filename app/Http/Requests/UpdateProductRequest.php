<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
           'name' => ['required', 'string', 'max:45'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
            'priceWithTax' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
            'discountPrice' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
            'category_id' => ['required', 'exists:categories,id'],
            'brand_id' => ['required', 'exists:brands,id'],
            'stock' => ['required', 'integer', 'min:0'],
            'stockMinimun' => ['required', 'integer', 'min:0', 'lte:stock'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:1024']
        ];

        return $rules;
    }

    /**
     * Mensajes de error personalizados para la validación.
     */
    public function messages(): array
    {
    return [
        'name.required' => 'El nombre es obligatorio.',
        'name.string' => 'El nombre debe ser una cadena de texto.',
        'name.max' => 'El nombre no debe exceder los 45 caracteres.',

        'description.string' => 'La descripción debe ser una cadena de texto.',

        'price.required' => 'El precio es obligatorio.',
        'price.numeric' => 'El precio debe ser un valor numérico.',
        'price.regex' => 'El formato del precio no es válido. Ejemplo válido: 12345.67',

        'priceWithTax.required' => 'El precio con impuesto es obligatorio.',
        'priceWithTax.numeric' => 'El precio con impuesto debe ser numérico.',
        'priceWithTax.regex' => 'El formato del precio con impuesto no es válido. Ejemplo válido: 12345.67',

        'discountPrice.required' => 'El precio con descuento es obligatorio.',
        'discountPrice.numeric' => 'El precio con descuento debe ser numérico.',
        'discountPrice.regex' => 'El formato del precio con descuento no es válido. Ejemplo válido: 12345.67',

        'category_id.required' => 'La categoría es obligatoria.',
        'category_id.exists' => 'La categoría seleccionada no existe.',

        'brand_id.required' => 'La marca es obligatoria.',
        'brand_id.exists' => 'La marca seleccionada no existe.',

        'stock.required' => 'El stock es obligatorio.',
        'stock.integer' => 'El stock debe ser un número entero.',
        'stock.min' => 'El stock no puede ser menor que 0.',

        'stockMinimun.required' => 'El stock mínimo es obligatorio.',
        'stockMinimun.integer' => 'El stock mínimo debe ser un número entero.',
        'stockMinimun.min' => 'El stock mínimo no puede ser menor que 0.',
        'stockMinimun.lte' => 'El stock mínimo debe ser menor o igual al stock actual.',

        'image.image' => 'El archivo debe ser una imagen.',
        'image.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg, gif o webp.',
        'image.max' => 'La imagen no debe superar los 600 kilobytes.',
    ];
}
}