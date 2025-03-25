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
    public function rules():array
{
    $rules = [
        'name' => ['required', 'string', 'min:3'],
        'firstName' => ['required', 'string'],
        'lastName' => ['required', 'string'],
        'email' => ['required', 'string', 'email', Rule::unique('users', 'email')->ignore($this->user)],
        'birthdate' => ['required', 'string'],
        'phoneNumber' => ['required', 'string', Rule::unique('users', 'phoneNumber')->ignore($this->user)],
        'role_id' => ['required', 'integer', 'exists:roles,id'],
    ];

    // Si la contraseña está presente en la solicitud (es decir, si se va a cambiar)
    if ($this->filled('password')) {
        $rules['password'] = [
            'required',
            'string',
            'min:8',
            'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];
    } else {
        // Si no se está modificando la contraseña, puedes hacerla nullable
        $rules['password'] = ['nullable', 'string', 'min:8', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/'];
    }

    return $rules;
}

}
