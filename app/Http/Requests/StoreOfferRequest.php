<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfferRequest extends FormRequest
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
            'startDate'=> ['required', 'date'],
        'endDate' => ['required', 'date'],
        'description'=> ['required', 'string'],
        'type'=> ['required', 'string'],
        'priceNormal' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
        'priceOffers' => ['required', 'numeric', 'regex:/^\d{1,10}(\.\d{1,2})?$/'],
        'product_id' => ['required', 'exists:products,id'],
        ];
    }
}
