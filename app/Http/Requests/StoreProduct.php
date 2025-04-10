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
            'price' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
            'priceWithTax' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
            'discountPrice' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
            'category_id' => ['required', 'exists:categories,id'],
            'brand_id' => ['required', 'exists:brands,id'],
            'stock' => ['required', 'integer', 'min:0'],
            'stockMinimun' => ['required', 'integer', 'min:0', 'lte:stock'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:255']
        ];
    }
}
