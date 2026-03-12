<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class AdminUserController extends Controller
{
    public function index(Request $request): View
    {
        $search = trim((string) $request->get('search'));
        $items = User::query()
            ->when($search !== '', fn ($q) => $q
                ->where('nama', 'like', "%{$search}%")
                ->orWhere('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('username', 'like', "%{$search}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return view('admin-users.index', compact('items', 'search'));
    }

    public function create(): View
    {
        return view('admin-users.form', ['item' => new User()]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => ['required'],
            'username' => ['required', 'unique:users,username'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:6'],
            'role' => ['required', Rule::in(['Super Admin', 'Admin', 'User'])],
        ]);

        $validated['name'] = $validated['nama'];
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('admin-users.index')->with('success', 'Admin/User berhasil ditambahkan.');
    }

    public function edit(User $admin_user): View
    {
        return view('admin-users.form', ['item' => $admin_user]);
    }

    public function update(Request $request, User $admin_user): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => ['required'],
            'username' => ['required', Rule::unique('users', 'username')->ignore($admin_user->id)],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($admin_user->id)],
            'password' => ['nullable', 'min:6'],
            'role' => ['required', Rule::in(['Super Admin', 'Admin', 'User'])],
        ]);

        $validated['name'] = $validated['nama'];

        if (blank($validated['password'] ?? null)) {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }

        $admin_user->update($validated);

        return redirect()->route('admin-users.index')->with('success', 'Admin/User berhasil diperbarui.');
    }

    public function destroy(User $admin_user): RedirectResponse
    {
        if (auth()->id() === $admin_user->id) {
            return back()->with('error', 'Akun yang sedang login tidak bisa dihapus.');
        }

        $admin_user->delete();

        return back()->with('success', 'Admin/User berhasil dihapus.');
    }
}
