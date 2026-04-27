<?php

namespace App\Services;

class RegularBookingService
{
    private ?array $fareMap = null;
    private ?array $bookingTypeLabels = null;
    private ?array $departureScheduleLabels = null;
    private ?array $seatLayout = null;
    private ?array $seatOrderMap = null;

    public function bookingTypes(): array
    {
        return [
            [
                'value' => 'self',
                'label' => 'Untuk Diri Sendiri',
                'description' => 'Pemesanan dibuat untuk penumpang utama yang melakukan pengisian form.',
            ],
            [
                'value' => 'other',
                'label' => 'Untuk Orang Lain',
                'description' => 'Pemesanan dibuatkan untuk penumpang lain dan datanya akan dilengkapi pada langkah berikutnya.',
            ],
        ];
    }

    public function departureSchedules(): array
    {
        return [
            ['value' => '05:30', 'label' => 'Subuh - 05.30 WIB'],
            ['value' => '07:00', 'label' => 'Pagi - 07.00 WIB'],
            ['value' => '09:00', 'label' => 'Pagi - 09.00 WIB'],
            ['value' => '13:00', 'label' => 'Siang - 13.00 WIB'],
            ['value' => '16:00', 'label' => 'Sore - 16.00 WIB'],
            ['value' => '19:00', 'label' => 'Malam - 19.00 WIB'],
        ];
    }

    public function passengerCounts(): array
    {
        return collect(range(1, 6))
            ->map(fn (int $count): array => [
                'value' => $count,
                'label' => $count === 1 ? '1 Penumpang' : "{$count} Penumpang",
                'description' => $count === 6
                    ? 'Kursi tambahan 2B akan diperlakukan sebagai opsi opsional.'
                    : 'Menggunakan kursi reguler utama.',
            ])
            ->all();
    }

    public function locations(): array
    {
        return [
            'SKPD',
            'Simpang D',
            'SKPC',
            'Simpang Kumu',
            'Muara Rumbai',
            'Surau Tinggi',
            'Pasirpengaraian',
            'Pekanbaru',
            'Kabun',
            'Tandun',
            'Petapahan',
            'Suram',
            'Aliantan',
            'Bangkinang',
            'Ujung Batu',
            // Sesi 44B PR #1B — locations baru
            'Rambah Samo',
            'SKPA',
            'SKPB',
            'Silam',
            'Kasikan',
            'Kuok',
        ];
    }

    public function bookingTypeValues(): array
    {
        return array_column($this->bookingTypes(), 'value');
    }

    public function bookingTypeLabel(?string $value): string
    {
        return $this->bookingTypeLabels()[(string) $value] ?? 'Belum dipilih';
    }

    public function departureScheduleValues(): array
    {
        return array_column($this->departureSchedules(), 'value');
    }

    public function departureScheduleLabel(?string $value): string
    {
        return $this->departureScheduleLabels()[(string) $value] ?? 'Belum dipilih';
    }

    public function passengerCountLabel(int $count): string
    {
        if ($count <= 0) {
            return 'Belum dipilih';
        }

        return $count === 6 ? '6 Penumpang (Opsional tambahan)' : "{$count} Penumpang";
    }

    public function formatCurrency(int|float|null $amount): string
    {
        return 'Rp ' . number_format((float) ($amount ?? 0), 0, ',', '.');
    }

    public function normalizeIndonesianPhone(string $value): string
    {
        $digits = preg_replace('/\D+/', '', trim($value)) ?? '';

        if ($digits === '') {
            return '';
        }

        if (str_starts_with($digits, '62')) {
            $nationalNumber = ltrim(substr($digits, 2), '0');

            return $nationalNumber === '' ? '' : '0' . $nationalNumber;
        }

        if (str_starts_with($digits, '8')) {
            return '0' . $digits;
        }

        return $digits;
    }

    public function isValidIndonesianPhone(string $value): bool
    {
        return preg_match('/^08[1-9][0-9]{7,12}$/', $this->normalizeIndonesianPhone($value)) === 1;
    }

    public function seatLayout(): array
    {
        if (is_array($this->seatLayout)) {
            return $this->seatLayout;
        }

        return $this->seatLayout = [
            [
                'code' => 'driver',
                'label' => 'Supir',
                'kind' => 'driver',
                'area' => 'driver',
                'description' => 'Posisi pengemudi',
                'is_optional' => false,
            ],
            [
                'code' => '1A',
                'label' => '1A',
                'kind' => 'seat',
                'area' => 'seat-1a',
                'description' => 'Kursi di sebelah supir',
                'is_optional' => false,
            ],
            [
                'code' => '2A',
                'label' => '2A',
                'kind' => 'seat',
                'area' => 'seat-2a',
                'description' => 'Kursi baris tengah sisi kiri',
                'is_optional' => false,
            ],
            [
                'code' => '2B',
                'label' => '2B',
                'kind' => 'seat',
                'area' => 'seat-2b',
                'description' => 'Kursi tambahan opsional',
                'is_optional' => true,
            ],
            [
                'code' => '3A',
                'label' => '3A',
                'kind' => 'seat',
                'area' => 'seat-3a',
                'description' => 'Kursi tengah sisi kanan',
                'is_optional' => false,
            ],
            [
                'code' => '4A',
                'label' => '4A',
                'kind' => 'seat',
                'area' => 'seat-4a',
                'description' => 'Kursi baris belakang sisi kiri',
                'is_optional' => false,
            ],
            [
                'code' => '5A',
                'label' => '5A',
                'kind' => 'seat',
                'area' => 'seat-5a',
                'description' => 'Kursi baris belakang sisi kanan',
                'is_optional' => false,
            ],
        ];
    }

    public function seatLayoutState(array $selectedSeatCodes = [], ?int $passengerCount = null, array $occupiedSeatCodes = [], bool $isAdmin = false): array
    {
        $availableSeatCodes = $passengerCount === null
            ? $this->selectableSeatCodes()
            : $this->availableSeatCodesForPassengerCount($passengerCount, $isAdmin);
        $selectedSeatLookup = array_flip($this->sortSeatCodes($selectedSeatCodes, $availableSeatCodes));
        $occupiedLookup = array_flip($occupiedSeatCodes);

        return collect($this->seatLayout())
            ->map(function (array $seat) use ($availableSeatCodes, $selectedSeatLookup, $occupiedLookup): array {
                if ($seat['kind'] !== 'seat') {
                    return $seat;
                }

                $seat['is_visible'] = in_array($seat['code'], $availableSeatCodes, true);
                $seat['is_occupied'] = $seat['is_visible'] && array_key_exists($seat['code'], $occupiedLookup);
                $seat['is_selected'] = $seat['is_visible'] && !$seat['is_occupied'] && array_key_exists($seat['code'], $selectedSeatLookup);

                return $seat;
            })
            ->all();
    }

    public function selectableSeatCodes(): array
    {
        return collect($this->seatLayout())
            ->filter(fn (array $seat): bool => $seat['kind'] === 'seat')
            ->pluck('code')
            ->all();
    }

    public function availableSeatCodesForPassengerCount(int $passengerCount, bool $isAdmin = false): array
    {
        // Role-based 2B policy: hanya admin yang boleh lihat/pilih kursi 2B
        // (opsional). Non-admin tidak pernah mendapat 2B, berapapun jumlah
        // penumpangnya. Argumen $passengerCount dipertahankan untuk kompatibilitas
        // signature pemanggil existing.
        return collect($this->selectableSeatCodes())
            ->filter(fn (string $seatCode): bool => $isAdmin || $seatCode !== '2B')
            ->values()
            ->all();
    }

    public function sortSeatCodes(array $seatCodes, ?array $allowedSeatCodes = null): array
    {
        $orderMap = $this->seatOrderMap();
        $allowedSeatLookup = $allowedSeatCodes === null
            ? $orderMap
            : array_fill_keys($allowedSeatCodes, true);

        $normalizedSeatCodes = collect($seatCodes)
            ->map(fn ($seatCode): string => trim((string) $seatCode))
            ->filter(fn (string $seatCode): bool => $seatCode !== '' && array_key_exists($seatCode, $orderMap) && array_key_exists($seatCode, $allowedSeatLookup))
            ->unique()
            ->values()
            ->all();

        usort($normalizedSeatCodes, fn (string $left, string $right): int => $orderMap[$left] <=> $orderMap[$right]);

        return $normalizedSeatCodes;
    }

    public function selectedSeatLabels(array $seatCodes): string
    {
        $sortedSeatCodes = $this->sortSeatCodes($seatCodes);

        return $sortedSeatCodes === [] ? 'Belum dipilih' : implode(', ', $sortedSeatCodes);
    }

    public function resolveFare(string $origin, string $destination): ?int
    {
        $normalizedOrigin = $this->normalizeLocation($origin);
        $normalizedDestination = $this->normalizeLocation($destination);

        if ($normalizedOrigin === '' || $normalizedDestination === '' || $normalizedOrigin === $normalizedDestination) {
            return null;
        }

        return $this->fareMap()[$this->routeKey($normalizedOrigin, $normalizedDestination)] ?? null;
    }

    public function routeMatrix(): array
    {
        $matrix = [];

        foreach ($this->fareMap() as $pair => $fare) {
            [$first, $second] = explode('|', $pair, 2);

            $matrix[$first][$second] = $fare;
            $matrix[$second][$first] = $fare;
        }

        return $matrix;
    }

    private function fareMap(): array
    {
        if (is_array($this->fareMap)) {
            return $this->fareMap;
        }

        // Sesi 44B PR #1B: extended sharedOrigins (10 lokasi sub-area Pasirpengaraian).
        // Tambahan: Rambah Samo, SKPA, SKPB. Semua tarif sama 150k ke PKB.
        $sharedOrigins = [
            'SKPD',
            'Simpang D',
            'SKPC',
            'Simpang Kumu',
            'Muara Rumbai',
            'Surau Tinggi',
            'Pasirpengaraian',
            'Rambah Samo',
            'SKPA',
            'SKPB',
        ];

        $specifications = [
            // Tarif tunggal sub-area Pasirpengaraian → titik tujuan (bidirectional via routeKey sort)
            ['origins' => $sharedOrigins, 'destinations' => ['Pekanbaru'], 'fare' => 150000],
            ['origins' => $sharedOrigins, 'destinations' => ['Kabun'], 'fare' => 120000],
            ['origins' => $sharedOrigins, 'destinations' => ['Tandun'], 'fare' => 100000],
            ['origins' => $sharedOrigins, 'destinations' => ['Petapahan'], 'fare' => 130000],
            ['origins' => $sharedOrigins, 'destinations' => ['Suram'], 'fare' => 120000],
            ['origins' => $sharedOrigins, 'destinations' => ['Aliantan'], 'fare' => 120000],
            ['origins' => $sharedOrigins, 'destinations' => ['Bangkinang'], 'fare' => 130000],

            // Tarif tunggal lokasi cabang/tengah → PKB
            ['origins' => ['Bangkinang'], 'destinations' => ['Pekanbaru'], 'fare' => 100000],
            ['origins' => ['Aliantan'], 'destinations' => ['Pekanbaru'], 'fare' => 120000],
            ['origins' => ['Kuok'], 'destinations' => ['Pekanbaru'], 'fare' => 100000],
            ['origins' => ['Kabun'], 'destinations' => ['Pekanbaru'], 'fare' => 120000],
            ['origins' => ['Tandun'], 'destinations' => ['Pekanbaru'], 'fare' => 120000],
            ['origins' => ['Silam'], 'destinations' => ['Pekanbaru'], 'fare' => 120000],
            ['origins' => ['Ujung Batu'], 'destinations' => ['Pekanbaru'], 'fare' => 130000],
            ['origins' => ['Petapahan'], 'destinations' => ['Pekanbaru'], 'fare' => 100000],
            ['origins' => ['Kasikan'], 'destinations' => ['Pekanbaru'], 'fare' => 120000],
            ['origins' => ['Suram'], 'destinations' => ['Pekanbaru'], 'fare' => 120000],

            // Tarif khusus inter-titik (bidirectional)
            ['origins' => ['Ujung Batu'], 'destinations' => ['Pasirpengaraian'], 'fare' => 50000],
            ['origins' => ['Tandun'], 'destinations' => ['Pasirpengaraian'], 'fare' => 100000],
            ['origins' => ['Kabun'], 'destinations' => ['Pasirpengaraian'], 'fare' => 120000],
        ];

        $fareMap = [];

        foreach ($specifications as $specification) {
            foreach ($specification['origins'] as $origin) {
                foreach ($specification['destinations'] as $destination) {
                    if ($origin === $destination) {
                        continue;
                    }

                    $routeKey = $this->routeKey($origin, $destination);

                    if (! array_key_exists($routeKey, $fareMap)) {
                        $fareMap[$routeKey] = $specification['fare'];
                    }
                }
            }
        }

        return $this->fareMap = $fareMap;
    }

    private function bookingTypeLabels(): array
    {
        if (is_array($this->bookingTypeLabels)) {
            return $this->bookingTypeLabels;
        }

        return $this->bookingTypeLabels = collect($this->bookingTypes())
            ->mapWithKeys(fn (array $item): array => [$item['value'] => $item['label']])
            ->all();
    }

    private function departureScheduleLabels(): array
    {
        if (is_array($this->departureScheduleLabels)) {
            return $this->departureScheduleLabels;
        }

        return $this->departureScheduleLabels = collect($this->departureSchedules())
            ->mapWithKeys(fn (array $item): array => [$item['value'] => $item['label']])
            ->all();
    }

    private function seatOrderMap(): array
    {
        if (is_array($this->seatOrderMap)) {
            return $this->seatOrderMap;
        }

        return $this->seatOrderMap = collect($this->selectableSeatCodes())
            ->values()
            ->mapWithKeys(fn (string $seatCode, int $index): array => [$seatCode => $index])
            ->all();
    }

    private function routeKey(string $first, string $second): string
    {
        $locations = [$this->normalizeLocation($first), $this->normalizeLocation($second)];

        sort($locations, SORT_NATURAL | SORT_FLAG_CASE);

        return implode('|', $locations);
    }

    private function normalizeLocation(string $value): string
    {
        return trim($value);
    }

    /**
     * Resolve direction backward-compat (tanpa cluster context).
     * Sesi 44A PR #1A baseline; Sesi 47 Fix #4 sequence-aware refactor.
     *
     * Sesi 47 Fix #4: Delegate ke RouteSequenceService dengan auto-resolve
     * cluster via BookingClusterService::clusterForLocation(). Untuk rute
     * fixed (e.g. Bangkinang→Kabun), cluster terdetect otomatis dari salah
     * satu titik. Untuk rute fully ambigu, fallback ke BANGKINANG sequence
     * (cluster default JET, common prefix 12 titik shared dengan PETAPAHAN
     * jadi direction sama untuk titik pre-divergence).
     *
     * 18+ call sites dipreserve via signature backward-compat. Caller modern
     * yang punya cluster context (booking.route_via) lebih baik pakai
     * resolveDirectionWithCluster() langsung untuk skip cluster auto-detect.
     */
    public function resolveDirection(string $fromCity, string $toCity): string
    {
        $from = trim($fromCity);
        $to = trim($toCity);

        // Sesi 47 Fix #4: Try sequence-based resolve via cluster auto-detection.
        // Untuk rute fixed (e.g. Bangkinang→Kabun), BookingClusterService bisa
        // detect cluster dari clusterForLocation. Untuk rute ambigu, fall back.
        $clusterService = app(BookingClusterService::class);
        $fromCluster = $clusterService->clusterForLocation($from);
        $toCluster = $clusterService->clusterForLocation($to);

        // Pick non-HUB cluster fixed (BANGKINANG atau PETAPAHAN).
        $resolvedCluster = null;
        foreach ([$fromCluster, $toCluster] as $c) {
            if ($c !== null && $c !== 'HUB' && in_array($c, ['BANGKINANG', 'PETAPAHAN'], true)) {
                $resolvedCluster = $c;
                break;
            }
        }

        if ($resolvedCluster !== null) {
            return $this->resolveDirectionWithCluster($resolvedCluster, $from, $to);
        }

        // Fallback: rute fully ambigu (e.g. SKPD→Pekanbaru). Pakai default
        // BANGKINANG sequence (cluster majority JET, common prefix 12 titik
        // identical kedua cluster jadi direction sama untuk titik shared).
        return $this->resolveDirectionWithCluster('BANGKINANG', $from, $to);
    }

    /**
     * Sesi 47 Fix #4: Resolve direction dengan cluster context explicit.
     * Caller modern (BookingController, persistence services) yang sudah tahu
     * cluster (dari booking.route_via) sebaiknya pakai method ini langsung
     * supaya skip cluster auto-detection round-trip.
     *
     * @param  string  $cluster   'BANGKINANG' | 'PETAPAHAN'
     * @param  string  $fromCity  Kota asal
     * @param  string  $toCity    Kota tujuan
     * @return string             'to_pkb' | 'from_pkb'
     */
    public function resolveDirectionWithCluster(string $cluster, string $fromCity, string $toCity): string
    {
        $from = trim($fromCity);
        $to = trim($toCity);

        return app(RouteSequenceService::class)->resolveDirection($cluster, $from, $to);
    }
}
