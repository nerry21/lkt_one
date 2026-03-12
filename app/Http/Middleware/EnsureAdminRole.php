<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminRole
{
    public function handle(Request $request, Closure $next, string $level = 'admin'): Response
    {
        $user = $request->user();
        if (! $user) {
            abort(403);
        }

        if ($level === 'super' && ! $user->isSuperAdmin()) {
            abort(403, 'Hanya Super Admin yang dapat mengakses fitur ini.');
        }

        if ($level === 'admin' && ! $user->isAdmin()) {
            abort(403, 'Hanya Admin yang dapat mengakses fitur ini.');
        }

        return $next($request);
    }
}
