<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\JwtService;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class EnsureJwtAuthenticated
{
    public function __construct(
        protected JwtService $jwtService,
    ) {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $sessionUser = Auth::guard('web')->user();

        if ($sessionUser) {
            $request->setUserResolver(fn () => $sessionUser);
            $request->attributes->set('jwt_payload', ['sub' => $sessionUser->id, 'auth_source' => 'session']);

            return $next($request);
        }

        $header = (string) $request->header('Authorization', '');

        if (! str_starts_with($header, 'Bearer ')) {
            return $this->unauthorized('Token tidak valid');
        }

        $token = substr($header, 7);

        try {
            $payload = $this->jwtService->decode($token);
        } catch (Throwable $exception) {
            return $this->unauthorized($exception->getMessage());
        }

        $userId = (string) ($payload['sub'] ?? '');

        if ($userId === '') {
            return $this->unauthorized('Token tidak valid');
        }

        $user = User::query()->find($userId);

        if (! $user) {
            return $this->unauthorized('User tidak ditemukan');
        }

        Auth::shouldUse('web');
        Auth::guard('web')->setUser($user);
        $request->setUserResolver(fn () => $user);
        $request->attributes->set('jwt_payload', $payload);

        return $next($request);
    }

    protected function unauthorized(string $detail): JsonResponse
    {
        return response()->json([
            'detail' => $detail,
        ], 401);
    }
}
