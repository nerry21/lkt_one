<?php

namespace App\Http\Requests\AdminUser;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAdminUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = (string) $this->route('adminUser');

        return [
            'nama' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'regex:/^[A-Za-z0-9._-]+$/', Rule::unique('users', 'username')->ignore($userId, 'id')],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($userId, 'id')],
            'password' => ['nullable', 'string', 'min:6'],
            'role' => ['required', Rule::in(['Super Admin', 'Admin', 'User'])],
        ];
    }
}
