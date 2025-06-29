<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduct extends FormRequest
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
            'name' => ['required', 'string', 'max:45'],
            'description' => ['nullable', 'string'],
            'priceWithTax' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
            'discountPrice' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'brand_id' => ['nullable', 'exists:brands,id'],
            'stock' => ['required', 'integer', 'min:0'],
            'stockMinimun' => ['required', 'integer', 'min:0', 'lte:stock'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:255']
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe exceder los 45 caracteres.',

            'description.string' => 'La descripción debe ser una cadena de texto.',

            'priceWithTax.required' => 'El precio con impuesto es obligatorio.',
            'priceWithTax.numeric' => 'El precio con impuesto debe ser numérico.',
            'priceWithTax.regex' => 'El formato del precio con impuesto no es válido. Ejemplo válido: 12345.67',

            'discountPrice.required' => 'El precio con descuento es obligatorio.',
            'discountPrice.numeric' => 'El precio con descuento debe ser numérico.',
            'discountPrice.regex' => 'El formato del precio con descuento no es válido. Ejemplo válido: 12345.67',

            'category_id.exists' => 'La categoría seleccionada no existe.',

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

