<?php

namespace App\Services\BotControl;

use App\Models\BotControlSetting;
use Illuminate\Support\Facades\Cache;

class BotControlService
{
    private const CACHE_TTL_SEC = 30;
    private const CACHE_KEY_MODE = 'bot_control:mode';
    private const CACHE_KEY_WHITELIST = 'bot_control:whitelist';

    /**
     * @var array<int, string>
     */
    public const ALLOWED_MODES = ['off', 'whitelist', 'live_public'];

    public function getMode(): string
    {
        return Cache::remember(self::CACHE_KEY_MODE, self::CACHE_TTL_SEC, function () {
            $row = BotControlSetting::where('key', 'bot_mode')->first();
            return $row?->value ?? 'off';
        });
    }

    public function setMode(string $mode, ?string $byPhone = null): void
    {
        if (! in_array($mode, self::ALLOWED_MODES, true)) {
            throw new \InvalidArgumentException("Invalid bot mode: {$mode}");
        }

        BotControlSetting::updateOrCreate(
            ['key' => 'bot_mode'],
            ['value' => $mode, 'updated_by_phone' => $byPhone],
        );

        Cache::forget(self::CACHE_KEY_MODE);
    }

    /**
     * @return array<int, string>
     */
    public function getWhitelist(): array
    {
        return Cache::remember(self::CACHE_KEY_WHITELIST, self::CACHE_TTL_SEC, function () {
            $row = BotControlSetting::where('key', 'whitelist_phones')->first();
            $raw = $row?->value ?? '';
            return array_values(array_filter(array_map('trim', explode(',', $raw))));
        });
    }

    /**
     * @param array<int, string> $phones
     */
    public function setWhitelist(array $phones, ?string $byPhone = null): void
    {
        $clean = array_values(array_filter(array_map('trim', $phones)));

        BotControlSetting::updateOrCreate(
            ['key' => 'whitelist_phones'],
            ['value' => implode(',', $clean), 'updated_by_phone' => $byPhone],
        );

        Cache::forget(self::CACHE_KEY_WHITELIST);
    }

    /**
     * @return array{mode: string, whitelist: array<int, string>, updated_at: string|null}
     */
    public function snapshot(): array
    {
        $modeRow = BotControlSetting::where('key', 'bot_mode')->first();

        return [
            'mode' => $this->getMode(),
            'whitelist' => $this->getWhitelist(),
            'updated_at' => $modeRow?->updated_at?->toIso8601String(),
        ];
    }
}
