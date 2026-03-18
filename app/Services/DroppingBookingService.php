<?php

namespace App\Services;

class DroppingBookingService extends RegularBookingService
{
    public function allSeatCodes(): array
    {
        return ['1A', '2A', '2B', '3A', '4A', '5A'];
    }

    public function droppingPassengerCount(): int
    {
        return 6;
    }

    public function droppingPassengerCountLabel(): string
    {
        return '6 Penumpang (Dropping — Semua Kursi)';
    }

    public function selectedDroppingSeatLabels(): string
    {
        return implode(', ', $this->allSeatCodes());
    }
}
