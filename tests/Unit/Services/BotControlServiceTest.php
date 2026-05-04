<?php

declare(strict_types=1);

namespace Tests\Unit\Services;

use App\Models\BotControlSetting;
use App\Services\BotControl\BotControlService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class BotControlServiceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
    }

    public function test_default_mode_is_off_after_seed(): void
    {
        $service = new BotControlService();

        $this->assertSame('off', $service->getMode());
    }

    public function test_set_mode_persists_and_invalidates_cache(): void
    {
        $service = new BotControlService();
        $service->setMode('whitelist', '628117598804');

        $this->assertSame('whitelist', $service->getMode());
        $this->assertDatabaseHas('bot_control_settings', [
            'key' => 'bot_mode',
            'value' => 'whitelist',
            'updated_by_phone' => '628117598804',
        ]);
    }

    public function test_set_mode_rejects_invalid_value(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        (new BotControlService())->setMode('invalid');
    }

    public function test_get_whitelist_returns_seeded_phones_from_migration(): void
    {
        Cache::flush();
        $service = new BotControlService();

        $this->assertSame(
            ['628117598804', '6281267975175', '6282364210642'],
            $service->getWhitelist(),
        );
    }

    public function test_set_whitelist_filters_empty_strings(): void
    {
        $service = new BotControlService();
        $service->setWhitelist(['628117598804', '', '  ', '6281267975175']);

        $this->assertSame(['628117598804', '6281267975175'], $service->getWhitelist());
    }

    public function test_snapshot_returns_full_state(): void
    {
        $service = new BotControlService();
        $service->setMode('live_public');
        $service->setWhitelist(['628117598804']);

        $snap = $service->snapshot();

        $this->assertSame('live_public', $snap['mode']);
        $this->assertSame(['628117598804'], $snap['whitelist']);
        $this->assertNotNull($snap['updated_at']);
    }
}
