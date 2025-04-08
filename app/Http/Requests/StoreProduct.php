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
        return false;
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
            'price' => ['required', 'decimal:2', 'between:0,9999999999.99'],
            'priceWithTax' => ['required', 'decimal:2', 'between:0,9999999999.99'],
            'discountPrice' => ['nullable', 'decimal:2', 'between:0,9999999999.99'],
            'category_id' => ['required', 'exists:categories,id'],
            'brand_id' => ['required', 'exists:brands,id'],
            'stock' => ['required', 'integer', 'min:0'],
            'stockMinimun' => ['required', 'integer', 'min:0', 'lte:stock'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp']
        ];
    }
}
