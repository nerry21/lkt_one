<?php

use App\Http\Middleware\EnsureAdminRole;
use App\Http\Middleware\EnsureJwtAuthenticated;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->redirectGuestsTo(fn () => route('login'));
        $middleware->redirectUsersTo(fn () => route('dashboard'));

        $middleware->alias([
            'admin.role' => EnsureAdminRole::class,
            'jwt.auth' => EnsureJwtAuthenticated::class,
            'chatbot.bridge' => \App\Http\Middleware\VerifyChatbotBridgeApiKey::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (AuthenticationException $exception, Request $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'detail' => 'Unauthenticated.',
                ], 401);
            }
        });

        // Fase D3 Sesi 23: map TripInvalidTransitionException ke JSON 409.
        // TripSlotConflict + TripVersionConflict self-render; TripGenerationDriverMissing
        // punya inline catch di TripPlanningPageController::generate (D2).
        $exceptions->render(function (\App\Exceptions\TripInvalidTransitionException $e, Request $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'error_code' => 'TRIP_INVALID_TRANSITION',
                    'message' => $e->getMessage(),
                    'trip_id' => $e->tripId,
                    'current_status' => $e->currentStatus,
                    'attempted_action' => $e->attemptedAction,
                    'reason' => $e->reason,
                ], 409);
            }
        });
    })->create();
