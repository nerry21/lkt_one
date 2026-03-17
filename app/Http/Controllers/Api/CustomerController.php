<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\MergeCustomerRequest;
use App\Models\Customer;
use App\Models\User;
use App\Services\CustomerMergeService;
use App\Services\CustomerResolverService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * CustomerController (API)
 *
 * Endpoint backend untuk manajemen customer duplikat.
 * Semua endpoint di sini dilindungi middleware jwt.auth + admin.role:admin.
 *
 * Endpoint:
 *   GET  /api/customers                            — list + filter customers
 *   GET  /api/customers/search                     — autocomplete untuk form booking
 *   GET  /api/customers/duplicates                 — kandidat duplikat
 *   GET  /api/customers/{customer}                 — detail customer
 *   GET  /api/customers/{customer}/merge-preview   — preview merge (read-only)
 *   POST /api/customers/{customer}/merge           — eksekusi merge
 */
class CustomerController extends Controller
{
    public function __construct(
        private readonly CustomerMergeService    $mergeService,
        private readonly CustomerResolverService $resolver,
    ) {}

    // =========================================================================
    // Listing & Search
    // =========================================================================

    /**
     * GET /api/customers
     *
     * List customers dengan pagination dan filter.
     * Query params: search, status, confidence, page, limit
     */
    public function index(Request $request): JsonResponse
    {
        $this->actor($request);

        $search     = trim((string) $request->query('search', ''));
        $status     = trim((string) $request->query('status', ''));
        $confidence = trim((string) $request->query('confidence', ''));
        $page       = max(1, (int) $request->query('page', 1));
        $limit      = max(1, min(100, (int) $request->query('limit', 20)));

        $discountEligible = $request->query('discount_eligible', '');
        $hasPhone         = $request->query('has_phone', '');

        $query = Customer::query()
            ->withCount(['bookings as bookings_count'])
            ->when($search !== '', fn ($q) => $q->search($search))
            ->when($status !== '', fn ($q) => $q->where('status', $status))
            ->when($confidence !== '', fn ($q) => $q->where('identity_confidence', $confidence))
            ->when($discountEligible === '1', fn ($q) => $q->where('discount_eligible', true))
            ->when($hasPhone === '1', fn ($q) => $q->withPhone())
            ->orderByDesc('total_trip_count')
            ->orderByDesc('created_at');

        $total = $query->count();
        $items = $query->forPage($page, $limit)->get()
            ->map(fn (Customer $c): array => $this->listItem($c));

        return response()->json([
            'data'  => $items,
            'total' => $total,
            'page'  => $page,
            'limit' => $limit,
        ]);
    }

    /**
     * GET /api/customers/search?q=...
     *
     * Autocomplete ringan untuk form booking — cari berdasarkan nomor HP atau nama.
     * Mengembalikan maks 10 kandidat dalam format dropdown-friendly.
     *
     * Query params:
     *   q     — teks pencarian (min 2 karakter)
     *   phone — nomor HP (akan dinormalisasi, lebih presisi dari q)
     */
    public function search(Request $request): JsonResponse
    {
        $this->actor($request);

        $phone = trim((string) $request->query('phone', ''));
        $q     = trim((string) $request->query('q', ''));

        // Cari by phone dulu jika tersedia (paling akurat)
        if ($phone !== '') {
            $normalized = $this->resolver->normalizePhone($phone);

            if ($normalized !== null) {
                $customer = $this->resolver->findByPhone($normalized);

                if ($customer !== null) {
                    return response()->json([
                        'match_type' => 'phone_exact',
                        'candidates' => [$this->searchCandidate($customer)],
                    ]);
                }
            }

            // Phone tidak valid atau tidak ditemukan — fallback ke name search
        }

        if (mb_strlen($q) < 2) {
            return response()->json([
                'match_type' => 'none',
                'candidates' => [],
            ]);
        }

        $candidates = Customer::query()
            ->active()
            ->notMerged()
            ->search($q)
            ->orderByDesc('total_trip_count')
            ->limit(10)
            ->get()
            ->map(fn (Customer $c): array => $this->searchCandidate($c));

        return response()->json([
            'match_type' => $candidates->isNotEmpty() ? 'name_search' : 'none',
            'candidates' => $candidates,
        ]);
    }

    /**
     * GET /api/customers/{customer}
     *
     * Detail lengkap satu customer beserta booking terkini dan alias nama.
     */
    public function show(Request $request, string $customer): JsonResponse
    {
        $this->actor($request);

        $c = $this->findCustomer($customer);
        $c->loadMissing(['aliases', 'bookings' => fn ($q) => $q->orderByDesc('trip_date')->limit(10)]);

        return response()->json([
            ...$this->mergeService->customerSummary($c),
            'email'       => $c->email,
            'notes'       => $c->notes,
            'created_at'  => $c->created_at?->toDateTimeString(),
            'merged_into' => $c->merged_into_id
                ? $this->mergeService->customerSummary($c->mergedInto()->withTrashed()->first() ?? new Customer())
                : null,
            'recent_bookings' => $c->bookings->map(fn ($b): array => [
                'id'             => $b->id,
                'booking_code'   => $b->booking_code,
                'trip_date'      => $b->trip_date?->toDateString(),
                'from_city'      => $b->from_city,
                'to_city'        => $b->to_city,
                'booking_status' => $b->booking_status,
                'payment_status' => $b->payment_status,
            ])->all(),
        ]);
    }

    // =========================================================================
    // Deteksi Duplikat
    // =========================================================================

    /**
     * GET /api/customers/duplicates
     *
     * Cari pasangan customer yang berpotensi duplikat.
     * Kriteria: nomor HP sama ATAU alias nama sama di customer berbeda.
     *
     * Hasil dikelompokkan per pasangan dengan skor confidence:
     *   high   — phone_normalized sama
     *   medium — alias nama sama
     *
     * Query params:
     *   confidence — filter: high|medium (default: semua)
     *   limit      — max pasangan yang dikembalikan (default: 50, max: 200)
     */
    public function duplicates(Request $request): JsonResponse
    {
        $this->actor($request);

        $filterConfidence = trim((string) $request->query('confidence', ''));
        $limit            = max(1, min(200, (int) $request->query('limit', 50)));

        $all = $this->mergeService->findPotentialDuplicates();

        if ($filterConfidence !== '') {
            $all = array_filter($all, fn ($pair): bool => ($pair['confidence'] ?? '') === $filterConfidence);
        }

        $pairs = array_slice(array_values($all), 0, $limit);

        $result = array_map(function (array $pair): array {
            /** @var Customer $a */
            $a = $pair['customer_a'];
            /** @var Customer $b */
            $b = $pair['customer_b'];

            return [
                'customer_a'    => $this->mergeService->customerSummary($a),
                'customer_b'    => $this->mergeService->customerSummary($b),
                'reason'        => $pair['reason'],
                'matched_value' => $pair['matched_value'] ?? null,
                'confidence'    => $pair['confidence'],
                'merge_url'     => url("/api/customers/{$a->id}/merge-preview?target_id={$b->id}"),
            ];
        }, $pairs);

        return response()->json([
            'total'  => count($all),
            'shown'  => count($result),
            'pairs'  => $result,
        ]);
    }

    // =========================================================================
    // Merge
    // =========================================================================

    /**
     * GET /api/customers/{customer}/merge-preview?target_id={id}
     *
     * Preview dampak merge TANPA mengubah data.
     * Aman dipanggil berkali-kali.
     *
     * Query params:
     *   target_id — ID customer tujuan (wajib)
     */
    public function mergePreview(Request $request, string $customer): JsonResponse
    {
        $this->actor($request);

        $targetId = (int) $request->query('target_id', 0);
        if ($targetId <= 0) {
            throw new HttpException(422, 'Parameter target_id wajib diisi.');
        }

        $source = $this->findCustomer($customer);
        $target = $this->findCustomer((string) $targetId);

        $preview = $this->mergeService->previewMerge($source, $target);

        // Tambahkan merge_url ke response untuk kemudahan frontend
        $preview['execute_url'] = url("/api/customers/{$source->id}/merge");

        return response()->json($preview);
    }

    /**
     * POST /api/customers/{customer}/merge
     *
     * Eksekusi merge customer source ke target.
     * TIDAK DAPAT DIBATALKAN. Semua operasi dalam satu DB transaction.
     *
     * Body: { "target_id": 5, "reason": "..." }
     *
     * Response 200: summary hasil merge
     * Response 422: validasi gagal atau kondisi tidak aman
     */
    public function merge(MergeCustomerRequest $request, string $customer): JsonResponse
    {
        $actor  = $this->actor($request);
        $source = $this->findCustomer($customer);
        $target = $this->findCustomer((string) $request->validated('target_id'));
        $reason = $request->validated('reason');

        // Guard: validasi kondisi merge via preview terlebih dahulu
        $preview = $this->mergeService->previewMerge($source, $target);

        if (! empty($preview['validation_errors'])) {
            return response()->json([
                'message' => 'Merge tidak dapat dilakukan.',
                'errors'  => $preview['validation_errors'],
            ], 422);
        }

        $summary = $this->mergeService->merge($source, $target, $actor, $reason);

        return response()->json([
            'message' => 'Merge berhasil dilakukan.',
            'summary' => $summary,
        ]);
    }

    // =========================================================================
    // Private helpers
    // =========================================================================

    /**
     * Item ringkas untuk endpoint list (tanpa data berat seperti bookings).
     */
    private function listItem(Customer $customer): array
    {
        return [
            'id'                  => $customer->id,
            'customer_code'       => $customer->customer_code,
            'display_name'        => $customer->display_name,
            'phone_normalized'    => $customer->phone_normalized,
            'phone_original'      => $customer->phone_original,
            'status'              => $customer->status,
            'identity_confidence' => $customer->identity_confidence,
            'total_trip_count'    => $customer->total_trip_count,
            'discount_eligible'   => $customer->discount_eligible,
            'bookings_count'      => $customer->bookings_count ?? 0,
        ];
    }

    /**
     * Format kandidat untuk endpoint search (dropdown-friendly).
     * Field minimal — sengaja ringan untuk autocomplete.
     */
    private function searchCandidate(Customer $customer): array
    {
        return [
            'id'               => $customer->id,
            'customer_code'    => $customer->customer_code,
            'display_name'     => $customer->display_name,
            'phone_normalized' => $customer->phone_normalized,
            'phone_original'   => $customer->phone_original,
            'total_trip_count' => $customer->total_trip_count,
            'discount_eligible'=> $customer->discount_eligible,
            'label'            => $customer->display_label, // "Budi Santoso (CUST-000001 | 628...)"
        ];
    }

    private function findCustomer(string $id): Customer
    {
        $customer = Customer::query()->find($id);

        if (! $customer instanceof Customer) {
            throw new HttpException(404, 'Data customer tidak ditemukan.');
        }

        return $customer;
    }

    private function actor(Request $request): User
    {
        $user = $request->user();

        if (! $user instanceof User) {
            throw new HttpException(403, 'Akses ditolak.');
        }

        return $user;
    }
}
