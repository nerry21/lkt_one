<?php

namespace App\Services;

use Carbon\CarbonImmutable;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use RuntimeException;

class JwtService
{
    protected string $algorithm = 'HS256';

    public function encode(array $claims): string
    {
        $payload = array_merge($claims, [
            'exp' => CarbonImmutable::now()->addHours(24)->timestamp,
        ]);

        $header = [
            'typ' => 'JWT',
            'alg' => $this->algorithm,
        ];

        $segments = [
            $this->base64UrlEncode(json_encode($header, JSON_THROW_ON_ERROR)),
            $this->base64UrlEncode(json_encode($payload, JSON_THROW_ON_ERROR)),
        ];

        $signature = hash_hmac('sha256', implode('.', $segments), $this->secret(), true);
        $segments[] = $this->base64UrlEncode($signature);

        return implode('.', $segments);
    }

    public function decode(string $token): array
    {
        $segments = explode('.', $token);

        if (count($segments) !== 3) {
            throw new RuntimeException('Token tidak valid');
        }

        [$encodedHeader, $encodedPayload, $encodedSignature] = $segments;
        $decodedHeader = json_decode($this->base64UrlDecode($encodedHeader), true);
        $decodedPayload = json_decode($this->base64UrlDecode($encodedPayload), true);

        if (! is_array($decodedHeader) || ! is_array($decodedPayload)) {
            throw new RuntimeException('Token tidak valid');
        }

        if (Arr::get($decodedHeader, 'alg') !== $this->algorithm) {
            throw new RuntimeException('Token tidak valid');
        }

        $expectedSignature = $this->base64UrlEncode(
            hash_hmac('sha256', $encodedHeader.'.'.$encodedPayload, $this->secret(), true)
        );

        if (! hash_equals($expectedSignature, $encodedSignature)) {
            throw new RuntimeException('Token tidak valid');
        }

        if ((int) Arr::get($decodedPayload, 'exp', 0) < CarbonImmutable::now()->timestamp) {
            throw new RuntimeException('Token sudah kadaluarsa');
        }

        return $decodedPayload;
    }

    protected function secret(): string
    {
        return (string) Config::get('app.key', env('JWT_SECRET', 'pekanbaru-transport-secret-key-2024'));
    }

    protected function base64UrlEncode(string $value): string
    {
        return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
    }

    protected function base64UrlDecode(string $value): string
    {
        $padding = 4 - (strlen($value) % 4);

        if ($padding < 4) {
            $value .= str_repeat('=', $padding);
        }

        return base64_decode(strtr($value, '-_', '+/')) ?: '';
    }
}
