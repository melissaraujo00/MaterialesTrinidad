<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuoteDetailsRequest extends FormRequest
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
            'details' => ['required', 'array', 'min:1'],
            'details.*.amount' => ['required', 'integer', 'min:1'],
            'details.*.price' => ['required', 'numeric', 'min:0'],
            'details.*.subtotal' => ['required', 'numeric', 'min:0'],
            'details.*.quote_id' => ['required', 'integer', 'exists:quotes,id'],
            'details.*.product_id' => ['required', 'integer', 'exists:products,id'],
        ];
    }
}
