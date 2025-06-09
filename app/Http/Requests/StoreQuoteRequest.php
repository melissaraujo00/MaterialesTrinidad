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
            'customer_id' => 'required|exists:customers,id',
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'subtotal' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'details' => 'required|array',
            'details.*.amount' => 'required|integer|min:1',
            'details.*.price' => 'required|numeric|min:0',
            'details.*.subtotal' => 'required|numeric|min:0',
            'details.*.product_id' => 'required|exists:products,id',
        ];
    }
}
