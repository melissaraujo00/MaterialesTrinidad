<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreUserRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3'],
            'firstName' => ['required', 'string'],
            'lastName' => ['required', 'string'],
            'email' => [
                'required',
                'string',
                'email',
                // Verificar si el correo electrónico es único en la base de datos
                Rule::unique('users', 'email'),
            ],
            'birthdate' => ['required', 'string'],
            'phoneNumber' => [
                'required',
                'string',
                // Verificar si el número de teléfono es único en la base de datos
                Rule::unique('users', 'phoneNumber'),
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/'
            ],
            'role_id' => ['required', 'integer', 'exists:roles,id']
        ];
    }


}
