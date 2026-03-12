<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\View\View;

class AuthController extends Controller
{
    public function show(): View|RedirectResponse
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        return view('auth.login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string', 'max:255'],
            'password' => ['required'],
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            if ($this->shouldBypassLogin()) {
                Auth::login($this->resolveLocalLoginUser($credentials['email']), true);
                $request->session()->regenerate();

                return redirect()->route('dashboard')->with('success', 'Mode lokal aktif. Login development berhasil.');
            }

            return back()
                ->withErrors(['email' => 'Email atau password salah.'])
                ->withInput();
        }

        $request->session()->regenerate();

        return redirect()->route('dashboard')->with('success', 'Login berhasil.');
    }

    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => ['nullable', 'required_without:name', 'string', 'max:255'],
            'name' => ['nullable', 'required_without:nama', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'min:6', 'confirmed'],
        ]);

        $displayName = (string) ($validated['nama'] ?? $validated['name']);
        $count = User::count();
        $user = User::create([
            'name' => $displayName,
            'nama' => $displayName,
            'username' => $this->makeUniqueUsername($validated['email']),
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $count === 0 ? 'Super Admin' : 'User',
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('dashboard')->with('success', 'Registrasi berhasil.');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    protected function makeUniqueUsername(string $email): string
    {
        $base = Str::lower((string) Str::of(Str::before($email, '@'))->replaceMatches('/[^a-z0-9]+/i', ''));
        $base = $base !== '' ? $base : 'user';
        $username = $base;
        $suffix = 1;

        while (User::where('username', $username)->exists()) {
            $username = $base.$suffix;
            $suffix++;
        }

        return $username;
    }

    protected function shouldBypassLogin(): bool
    {
        return app()->isLocal();
    }

    protected function resolveLocalLoginUser(string $emailInput): User
    {
        $existingUser = User::query()->orderBy('id')->first();

        if ($existingUser) {
            return $existingUser;
        }

        $email = filter_var($emailInput, FILTER_VALIDATE_EMAIL) ? $emailInput : 'localadmin@transit.test';
        $name = trim(Str::before($emailInput, '@'));
        $name = $name !== '' ? Str::title($name) : 'Local Admin';

        return User::create([
            'name' => $name,
            'nama' => $name,
            'username' => $this->makeUniqueUsername($email),
            'email' => $email,
            'password' => Hash::make(Str::random(40)),
            'role' => 'Super Admin',
        ]);
    }
}
