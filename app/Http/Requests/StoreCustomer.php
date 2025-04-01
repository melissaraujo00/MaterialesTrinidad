<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomer extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:65'
            ],
            'email' => [
                'nullable',
                'email'
            ],
            'phoneNumber' => [
                'required',
                'string',
                'max:15'
            ],
            'nit' => [
                'nullable',
                'string',
                'max:17'
            ],
            'district_id' => [
                'required',
                'exists:districts,id'
            ],
            'address' => [
                'nullable',
                'string',
            ],

            'description' =>[
                'nullable',
                'string',
            ],
            'status' =>  [
                'required',
                'string'
            ]
        ];
    }
}
