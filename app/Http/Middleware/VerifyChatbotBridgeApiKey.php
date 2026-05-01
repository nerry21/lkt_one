<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class VerifyChatbotBridgeApiKey
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! config('chatbot_bridge.enabled')) {
            return response()->json([
                'error' => 'bridge_disabled',
                'code' => 'BRIDGE_DISABLED',
            ], 503);
        }

        $providedKey = (string) $request->header('X-Chatbot-Bridge-Key', '');
        $expectedKey = (string) config('chatbot_bridge.api_key');

        if ($expectedKey === '' || ! hash_equals($expectedKey, $providedKey)) {
            Log::channel(config('chatbot_bridge.log_channel'))->warning('Bridge auth rejected', [
                'ip' => $request->ip(),
                'path' => $request->path(),
                'has_header' => $providedKey !== '',
            ]);

            return response()->json([
                'error' => 'unauthorized',
                'code' => 'INVALID_API_KEY',
            ], 401);
        }

        $requestId = (string) Str::uuid();

        Log::channel(config('chatbot_bridge.log_channel'))->info('Bridge request', [
            'request_id' => $requestId,
            'method' => $request->method(),
            'path' => $request->path(),
            'ip' => $request->ip(),
        ]);

        $response = $next($request);
        $response->headers->set('X-Bridge-Request-Id', $requestId);

        return $response;
    }
}
