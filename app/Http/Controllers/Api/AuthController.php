<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\JwtService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthController extends Controller
{
    public function __construct(
        protected JwtService $jwtService,
    ) {
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        if (User::query()->where('email', $request->validated('email'))->exists()) {
            throw new HttpException(400, 'Email sudah terdaftar');
        }

        $count = User::query()->count();
        $user = User::query()->create([
            'email' => $request->validated('email'),
            'nama' => $request->validated('nama'),
            'username' => $this->makeUniqueUsername($request->validated('email')),
            'role' => $count === 0 ? 'Super Admin' : 'User',
            'password' => Hash::make($request->validated('password')),
        ]);

        Auth::guard('web')->login($user);
        $request->session()->regenerate();

        return response()->json([
            'access_token' => $this->jwtService->encode(['sub' => $user->id]),
            'token_type' => 'bearer',
            'user' => $this->userPayload($user),
        ]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $email = $request->validated('email');
        $password = $request->validated('password');

        $user = User::query()->where('email', $email)->first();

        if ($user) {
            if (! Hash::check($password, $user->password)) {
                throw new HttpException(401, 'Password salah');
            }

            $this->syncProfileAttributes($user);
        } else {
            $count = User::query()->count();
            $name = str((string) str($email)->before('@'))
                ->replace(['.', '_'], ' ')
                ->title()
                ->toString();

            $user = User::query()->create([
                'email' => $email,
                'nama' => $name,
                'username' => $this->makeUniqueUsername($email),
                'role' => $count === 0 ? 'Super Admin' : 'User',
                'password' => Hash::make($password),
            ]);
        }

        Auth::guard('web')->login($user);
        $request->session()->regenerate();

        return response()->json([
            'access_token' => $this->jwtService->encode(['sub' => $user->id]),
            'token_type' => 'bearer',
            'user' => $this->userPayload($user),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json($this->userPayload($user));
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }

    protected function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'email' => $user->email,
            'nama' => $user->nama,
            'username' => $user->username,
            'role' => $user->role,
            'created_at' => optional($user->created_at)?->toISOString(),
        ];
    }

    protected function syncProfileAttributes(User $user): void
    {
        $updates = [];

        if (blank($user->username)) {
            $updates['username'] = $this->makeUniqueUsername($user->email, $user->id);
        }

        if (! in_array($user->role, ['Super Admin', 'Admin', 'User'], true)) {
            $firstUserId = User::query()
                ->orderBy('created_at')
                ->orderBy('id')
                ->value('id');

            $updates['role'] = $user->id === $firstUserId ? 'Super Admin' : 'User';
        }

        if ($updates === []) {
            return;
        }

        $user->fill($updates);
        $user->save();
    }

    protected function makeUniqueUsername(string $email, ?string $ignoreId = null): string
    {
        $base = Str::lower((string) Str::of(Str::before($email, '@'))->replaceMatches('/[^a-z0-9]+/i', ''));
        $base = $base !== '' ? $base : 'user';
        $username = $base;
        $suffix = 1;

        while (User::query()
            ->when($ignoreId !== null, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->where('username', $username)
            ->exists()) {
            $username = $base.$suffix;
            $suffix++;
        }

        return $username;
    }
}
