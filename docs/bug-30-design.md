# Bug #30 Design — BookingManagementService Booking-Level Optimistic Locking

**Status:** Phase 0 design draft (untested, pre-implementation reference)
**Scope:** 4 API mutation endpoints
**Sibling:** Bug #38 (4 web endpoints dropping/rental-data) — same pattern, separate Phase 1 execution
**Prerequisites:** Fase 1A + 1B complete (deployed, stable)
**Created:** 2026-04-19 (Phase 0 recon sesi)

---

## 1. Problem Statement

Admin concurrent edit pada same booking row = silent data loss. Seat-level sudah dilindungi Fase 1A (SeatLockService), tapi non-seat fields (driver_name, payment_status, notes, 50+ others) = last-write-wins tanpa conflict detection.

**Race scenario (verified dari audit doc line 911 + R2 code inspection):**
1. Admin A load booking di UI (form pre-filled dari GET /api/bookings/{id})
2. Admin B load same booking concurrently
3. Admin A submit driver_name='Pak Budi' → DB update
4. Admin B submit 0.5s later dengan payload yang carry driver_name='' + payment_status='Dibayar'
5. DB final state: driver_name reverted ke old, payment_status updated
6. Zero error to either admin; Admin A's work silently lost

---

## 2. Scope (4 Endpoints)

| # | Endpoint | Controller Method | Has Transaction? | FormRequest? |
|---|---|---|---|---|
| 1 | PUT /api/bookings/{booking} | Api\BookingController::update | Ya (via updateBooking) | UpdateBookingRequest |
| 2 | DELETE /api/bookings/{booking} | Api\BookingController::destroy | Ya (via deleteBooking) | plain Request |
| 3 | PATCH /api/bookings/{booking}/validate-payment | Api\BookingController::validatePayment | Tidak | plain Request |
| 4 | PATCH /api/bookings/{booking}/departure-status | Api\BookingController::updateDepartureStatus | Tidak | plain Request |

**Out of scope (separate tracking):**
- Bug #38 — dropping-data + rental-data web edit paths (4 endpoints, same pattern)
- Bug #37 — slotAssign bulk update (different race class)
- Bug #40 — /dashboard middleware hygiene (orthogonal)
- Bug #42 — Version-at-delete audit trail in BookingLevelBackup (deferred, stakeholder-request-driven)
- Wizard persistPaymentSelection paths (single-admin-session, zero race)
- Internal service mutators (SeatLockService, ETicketPdfService, TicketBackupService, CustomerMatching/Merge) — bypass via saveQuietly() per policy §10

---

## 3. Solution: Atomic Check-and-Set via Version Column

**Core mechanic (race-free, DB-engine-agnostic):**

```php
// Single SQL statement, no race window:
$affected = Booking::where('id', $bookingId)
    ->where('version', $expectedVersion)
    ->update([...updates..., 'version' => $expectedVersion + 1]);

if ($affected === 0) {
    throw new BookingVersionConflictException($bookingId, $expectedVersion);
}
```

**Why this works:**
- `WHERE id = ? AND version = ?` evaluated atomically by MariaDB
- If Admin B's update lands first, Admin A's WHERE clause fails → 0 rows affected → 409
- No lock held between page load and submit (unlike SELECT FOR UPDATE which holds until commit)
- Version increment part of same UPDATE = monotonically increasing

---

## 4. Migration

**Filename:** `database/migrations/YYYY_MM_DD_HHMMSS_add_version_to_bookings_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // NOT NULL with default 0 for existing rows (backfill on ALTER)
            // Placement after 'return_trip_time' = last column (most recent addition per R5.1)
            $table->unsignedInteger('version')
                ->default(0)
                ->after('return_trip_time');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn('version');
        });
    }
};
```

**Design choices:**
- `unsignedInteger` (not `unsignedBigInteger`) — 4.3B increments per booking suffices
- `default(0)` NOT NULL — existing 60+ production rows auto-initialize; first admin edit increments to 1
- No index — version is never queried alone; always combined with primary key
- Nullable NOT needed — default 0 covers backfill

**Production deploy safety (MariaDB 11.8.6):**
- `ALTER TABLE ADD COLUMN` dengan small default = instant metadata-only operation di MariaDB 10.3+
- Tidak lock table untuk 60 rows (typical LKT One booking count)
- Rollback: `down()` drops column, no data loss untuk fields lain

---

## 5. Model Integration

### 5.1 Booking Model Changes (app/Models/Booking.php)

**No changes to `$fillable`** — version intentionally NOT in fillable (R5.1 §4: `$booking->fill(['version' => X])` akan silently drop).

**Add casts entry:**
```php
protected $casts = [
    // ... existing casts ...
    'version' => 'integer',
];
```

**Add new method at class body (not in booted()):**
```php
/**
 * Atomic version-checked update. Returns true if update landed on expected version,
 * false if version mismatch (caller should throw BookingVersionConflictException).
 *
 * Bypasses Eloquent events via direct query builder — mirrors saveQuietly() philosophy
 * for atomic concurrency control operations.
 */
public function updateWithVersionCheck(array $attributes, int $expectedVersion): bool
{
    $affected = static::query()
        ->where('id', $this->getKey())
        ->where('version', $expectedVersion)
        ->update(array_merge($attributes, ['version' => $expectedVersion + 1]));

    if ($affected > 0) {
        $this->version = $expectedVersion + 1;
        foreach ($attributes as $key => $value) {
            $this->setAttribute($key, $value);
        }
        $this->syncOriginal();
        return true;
    }

    return false;
}
```

**Decision: method on model, NOT trait.**
- R5.1 §5 confirmed zero pre-existing trait — no benefit to trait abstraction for single-model concern
- Method naming explicit: `updateWithVersionCheck` (not `update` override) avoids shadowing Eloquent's `update()` which has wide usage
- Sibling bug #38 services bisa call same method → reuse via method, bukan trait

### 5.2 booted() Hook Preservation

**No changes to booted() saving hook.** Version increment happens di `updateWithVersionCheck()` via direct query, **bypasses** the saving event. Loyalty/driver reconciliation logic tetap run saat `->save()` called via other paths (wizard create, service internal updates).

**Risk mitigation:** When calling `updateWithVersionCheck`, driver_name reconciliation NOT happen. If admin edit set `driver_id` but clear `driver_name`, the method will save as-is without auto-lookup. **Mitigation:** Pre-process payload in controller/service BEFORE calling `updateWithVersionCheck` — either reconcile manually or document as known behavior (Phase 1 test will catch).

---

## 6. Exception

**File:** `app/Exceptions/BookingVersionConflictException.php`

```php
<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

class BookingVersionConflictException extends Exception
{
    public function __construct(
        public readonly int $bookingId,
        public readonly int $expectedVersion,
        string $message = 'Data booking telah diubah oleh admin lain. Silakan refresh dan coba lagi.',
        int $code = 0,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, $code, $previous);
    }

    public function render(Request $request): SymfonyResponse
    {
        if ($request->wantsJson()) {
            return response()->json([
                'error' => 'booking_version_conflict',
                'message' => $this->getMessage(),
                'booking_id' => $this->bookingId,
                'expected_version' => $this->expectedVersion,
            ], 409);
        }

        return redirect()->back()->withErrors([
            'version' => $this->getMessage(),
        ]);
    }

    public function report(): bool
    {
        return false;
    }
}
```

**Consistency:** Mirrors SeatConflictException + WizardBackEditOnPaidBookingException structure (R5.1 §8). 409 Conflict status, snake_case error code, context fields (booking_id, expected_version). `report() = false` — business rule, not error to log.

---

## 7. Controller Integration Pattern

### 7.1 BookingController::update (already in transaction)

**Before (current):**
```php
public function update(UpdateBookingRequest $request, string $booking, BookingManagementService $service): JsonResponse
{
    $actor = $this->actor($request);
    $updatedBooking = $service->updateBooking($this->findBooking($booking), $request->validated(), $actor);
    return response()->json($service->detailPayload($updatedBooking));
}
```

**After:**
```php
public function update(UpdateBookingRequest $request, string $booking, BookingManagementService $service): JsonResponse
{
    $actor = $this->actor($request);
    $validated = $request->validated();
    $expectedVersion = (int) $validated['version'];

    $updatedBooking = $service->updateBooking(
        $this->findBooking($booking),
        $validated,
        $actor,
        $expectedVersion
    );

    return response()->json($service->detailPayload($updatedBooking));
}
```

### 7.2 BookingManagementService::updateBooking

**Add version check BEFORE seat-release + persistBooking:**

```php
public function updateBooking(Booking $booking, array $validated, User $actor, int $expectedVersion): Booking
{
    return DB::transaction(function () use ($booking, $validated, $actor, $expectedVersion): Booking {
        // GATE: version check before any mutation (including passengers delete/recreate)
        if ($booking->version !== $expectedVersion) {
            throw new BookingVersionConflictException($booking->id, $expectedVersion);
        }

        // ... existing seat-release logic ...
        // ... existing persistBooking() ...
        // ... existing lockSeats ...

        // AFTER all mutation complete, atomic version bump on final Booking state
        $success = $persisted->updateWithVersionCheck(
            $persisted->only([/* tracked fields */]),
            $expectedVersion
        );

        if (!$success) {
            throw new BookingVersionConflictException($booking->id, $expectedVersion);
        }

        return $persisted;
    });
}
```

**⚠️ Design tension identified:** Current `persistBooking()` does `$booking->save()` + passengers rebuild + QR regen. Mixing with `updateWithVersionCheck()` creates ordering complexity.

**Two strategies to resolve (decide at Phase 1 start):**

**Strategy A — Pre-check + post-save version bump (simpler):**
1. `if ($booking->version !== $expectedVersion)` → throw immediately (pre-check)
2. Proceed with normal `persistBooking()` → includes `$booking->save()` normally
3. After save, re-read version from DB via `->fresh('version')`
4. If changed during our transaction → rollback via exception
5. Else increment version via `updateWithVersionCheck`

Race window exists between pre-check and save (microseconds inside DB::transaction, but theoretically possible if transaction isolation is READ COMMITTED not SERIALIZABLE). MariaDB default = REPEATABLE READ → reads see consistent snapshot, but writes still race.

**Strategy B — Full atomic update via check-and-set (complex but airtight):**
1. Skip `$booking->save()` entirely in update path
2. `updateWithVersionCheck($allFields, $expectedVersion)` as single atomic op
3. Passengers rebuild AFTER version check succeeds (otherwise passengers destroyed before detecting conflict — same issue flagged R2 §observation 4)
4. Disable booted() saving hook for update path via saveQuietly-equivalent flow

**Recommendation:** Strategy A for bug #30 Phase 1 (pragmatic, maintains code shape). Strategy B if Phase 1 testing reveals races in practice.

### 7.3 BookingController::destroy

**Pattern:** Similar — add version check BEFORE `deleteBooking`:

```php
public function destroy(Request $request, string $booking, BookingManagementService $service): JsonResponse
{
    $actor = $this->actor($request);
    $expectedVersion = (int) $request->input('version', -1);

    if ($expectedVersion < 0) {
        return response()->json(['error' => 'version_required', 'message' => 'Version parameter required'], 422);
    }

    $record = $this->findBooking($booking);

    if ($record->version !== $expectedVersion) {
        throw new BookingVersionConflictException($record->id, $expectedVersion);
    }

    $service->deleteBooking($record, $actor);
    return response()->json(['message' => 'Data pemesanan berhasil dihapus']);
}
```

Since destroy doesn't need post-operation version (row gone), simple pre-check sufficient. Caller must query-string or body-pass `version`.

### 7.4 validatePayment + updateDepartureStatus

**Pattern for non-transactional paths:** Use `updateWithVersionCheck` as **single atomic replacement** for current `$record->fill()->save()` / `$record->update()`:

```php
// validatePayment current:
$record->fill([...payment fields...]);
$record->save();

// validatePayment after:
$expectedVersion = (int) $request->input('version', -1);
$success = $record->updateWithVersionCheck([...payment fields...], $expectedVersion);
if (!$success) {
    throw new BookingVersionConflictException($record->id, $expectedVersion);
}
```

Elegant — no transaction wrapper needed, atomicity guaranteed by single UPDATE statement.

---

## 8. FormRequest Integration

### 8.1 UpdateBookingRequest Override

**File:** `app/Http/Requests/Booking/UpdateBookingRequest.php`

```php
<?php

namespace App\Http\Requests\Booking;

class UpdateBookingRequest extends BookingUpsertRequest
{
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'version' => ['required', 'integer', 'min:0'],
        ]);
    }
}
```

Clean separation: create path (StoreBookingRequest) doesn't require version, update path does.

### 8.2 For validatePayment + updateDepartureStatus + destroy

No FormRequest currently. Inline validation di controller (as shown in §7.3, §7.4). **Optional future improvement (not in Phase 1 scope):** Create `ValidatePaymentRequest`, `UpdateDepartureStatusRequest`, `DestroyBookingRequest` — cleaner but scope expansion.

---

## 9. Frontend Contract

### 9.1 GET /api/bookings/{id} detailPayload()

**Add version to response:**
```php
// BookingManagementService::detailPayload() — add:
'version' => $booking->version,
```

Frontend receives version on page load, stores in state (React state.editItem.version).

### 9.2 PUT /api/bookings/{id} payload

**Required payload field:**
```json
{
  "version": 5,
  // ... other booking fields ...
}
```

Frontend includes `state.editItem.version` in submit payload (resources/js/pages/bookings/index.js line 1583 area).

### 9.3 409 Handling

Frontend intercepts 409 response:
- Parse `error === 'booking_version_conflict'`
- Show modal: "Booking ini telah diubah oleh admin lain. Refresh halaman untuk melihat perubahan terbaru?"
- Options: [Refresh] (GET show, re-populate form) or [Cancel] (discard current edits)

Consistent with seat-conflict modal UX (DR-3 pattern dari Fase 1A).

### 9.4 validatePayment button

Current UI (show.blade.php:342) has no version in JS. **Add:** fetch version from page-level data attribute or re-GET before submit. Payload becomes `{action, validation_notes, version}`.

---

## 10. Internal Mutator Policy

**Services that mutate `bookings` row and MUST NOT fail on version conflict:**

| Service | Current Pattern | Required Change |
|---|---|---|
| SeatLockService::promoteToHard | `$booking->update([...])` line 147 | Change to `$booking->updateQuietly([...])` + skip version increment |
| SeatLockService::releaseSeats | `$booking->update(['selected_seats' => []])` line 233 | Same |
| ETicketPdfService | `$booking->save()` lines 51, 87, 165 | Change to `$booking->saveQuietly()` |
| TicketBackupService | `$booking->saveQuietly()` line 97 | Already compliant |
| CustomerMergeService | `->update(['customer_id' => X])` lines 59, 64, 73 | Use query builder direct (already bypassing model events) |
| CustomerMatchingService | `->update(['customer_id' => X])` lines 93, 231, 292, 378 | Same |

**Policy rule:**

> Internal service mutations that are **consequential** (triggered by admin action, not competing intent) MUST bypass version increment to avoid throwing BookingVersionConflictException during legitimate downstream effects. Use `saveQuietly()` or direct query builder writes. Do NOT increment version from internal services.
>
> Only **admin-initiated mutation endpoints** (4 endpoints in bug #30 scope) increment version.

Implementation: update 4-5 lines across SeatLockService + ETicketPdfService. Trivial.

---

## 11. Phase 1 Execution Plan

**Target: atomic rollback-friendly commits per Fase 1A pattern.**

| Step | Deliverable | Commit Prefix |
|---|---|---|
| 1 | Migration (add_version_to_bookings_table) | `feat:` |
| 2 | Booking model + updateWithVersionCheck method | `feat:` |
| 3 | BookingVersionConflictException | `feat:` |
| 4 | UpdateBookingRequest version rule | `feat:` |
| 5 | BookingManagementService updateBooking integration (Strategy A) | `feat:` |
| 6 | BookingController::update wiring | `feat:` |
| 7 | BookingController::destroy wiring | `feat:` |
| 8 | BookingController::validatePayment wiring | `feat:` |
| 9 | BookingController::updateDepartureStatus wiring | `feat:` |
| 10 | Internal mutator policy — SeatLockService quiet writes | `fix:` |
| 11 | Internal mutator policy — ETicketPdfService quiet writes | `fix:` |
| 12 | Frontend: detailPayload includes version | `feat:` |
| 13 | Frontend: index.js PUT includes version | `feat:` |
| 14 | Frontend: show.blade.php validatePayment includes version | `feat:` |
| 15 | Frontend: 409 modal handling (sibling of DR-3) | `feat:` |
| 16 | Unit test: updateWithVersionCheck — happy path + conflict path | `test:` |
| 17 | Unit test: BookingVersionConflictException render | `test:` |
| 18 | Feature test: PUT /api/bookings concurrent edit simulation | `test:` |
| 19 | docs/bug-30-design.md (save this file) + docs/audit-findings.md closure | `docs:` |
| 20 | Register bug #38 (web paths), bug #40 (middleware), defer bug #37 | `docs:` |

**Estimated:** 2-3 sesi Phase 1 execution. Bug #38 (web paths) uses same migration + model + exception — just different controller wiring.

---

## 12. Test Strategy

### 12.1 Unit tests (reuse SeatLockServiceTest patterns)

**No pcntl_fork needed** — sequential simulation sufficient:

```php
public function test_updateWithVersionCheck_fails_on_stale_version(): void
{
    $booking = Booking::factory()->create(['version' => 5]);

    // Admin A succeeds
    $success1 = $booking->updateWithVersionCheck(['notes' => 'Admin A note'], 5);
    $this->assertTrue($success1);
    $this->assertEquals(6, $booking->fresh()->version);

    // Admin B (holding stale version=5) fails
    $success2 = $booking->fresh()->updateWithVersionCheck(['notes' => 'Admin B note'], 5);
    $this->assertFalse($success2);
    $this->assertEquals('Admin A note', $booking->fresh()->notes); // Admin A's write preserved
}
```

### 12.2 Feature tests

- PUT /api/bookings/{id} dengan stale version → 409 response
- Verify passengers NOT destroyed saat 409 thrown (critical — per R2 observation #4)
- PATCH /validate-payment dengan stale version → 409
- DELETE dengan stale version → 409
- Internal services (SeatLockService) can update booking WITHOUT version increment

### 12.3 Test baseline

Current: **128/0/605 (main @ 070dc2c)**. Phase 1 adds ~8-12 new tests. Expected after Phase 1: ~138-142/0/~640.

---

## 13. Rollout Risks & Rollback

**Risks:**
- **Admin forgets to refresh after 409** → infinite loop submit-fail. **Mitigation:** Modal UX forces refresh button, clears form on cancel.
- **Migration default 0 vs first-submit expectation** → frontend GET returns version=0 for old bookings, increments to 1 after first save. Works correctly — just needs doc note.
- **Internal mutator races** → ETicketPdfService generates PDF while admin edits. Quiet writes bypass version → no 409 during legitimate concurrent internal ops. Policy handles this.
- **Testing gap** — no true parallel test; sequential simulation approximates but misses genuine DB concurrency bugs. **Mitigation:** integration test via actual HTTP requests di staging before deploy.

**Rollback plan:**
- Migration down() drops column (zero data loss for other fields)
- Code revert via git revert on Phase 1 commits
- No data migration needed in rollback (version column simply disappears; existing bookings continue normal ops)

---

## 14. Resolved Decisions (Phase 1 Kickoff, 2026-04-19)

Q1-Q5 from Phase 0 recon resolved at Phase 1 kickoff. Each decision locked with rationale.

### Q1 — updateBooking Integration Strategy

**Decision:** Strategy A (pre-check + post-save version bump)

**Rationale:**
- Preserves existing `persistBooking()` code shape (shared with create path)
- Race window inside `DB::transaction` = microseconds with MariaDB REPEATABLE READ isolation
- Real-world admin concurrent edit gap = seconds/minutes (form open → submit), dominant threat
- Strategy B available as Phase 2B upgrade if production testing reveals race issues

### Q2 — Destroy Payload Convention

**Decision:** Query string (`DELETE /api/bookings/{id}?version=N`)

**Rationale:**
- DELETE with request body is technically valid but poorly supported by HTTP clients/proxies
- Existing DELETE endpoints in codebase don't use body
- Frontend simpler: `fetch('/api/bookings/${id}?version=${v}', {method: 'DELETE'})`
- Controller reads via `$request->query('version')`

### Q3 — FormRequest for Non-Update Endpoints

**Decision:** Defer (inline validation in controller)

**Rationale:**
- FormRequest creation = scope expansion beyond bug #30 core (3 new classes)
- Single version field check = 2 lines inline, mechanically equivalent
- Phase 1 ships faster; FormRequest hygiene deferrable to audit follow-up
- If raised as concern later, can register as separate bug

### Q4 — 409 Conflict Modal UX

**Decision:** Minimal modal (sibling of DR-3 seat conflict UX)

**Rationale:**
- Rich UX (inline field highlighting) requires backend diff computation + 2-4 hr frontend work
- Minimal modal = 30 min work with [Refresh]/[Cancel] buttons
- Deferring rich UX to stakeholder request (post-deploy Bu Bos/Admin Zizi feedback)
- Document as known tradeoff for deployment communication

### Q5 — Version-at-Delete Audit Trail

**Decision:** Skip (defer as bug #42)

**Rationale:**
- DELETE path is rare admin action (soft-delete via status change more common)
- BookingLevelBackup schema doesn't have `final_version` column — scope expansion
- Audit query use case uncertain
- Registered as bug #42 for stakeholder-driven re-evaluation

### Summary Table

| Q | Decision | Impacted Sections |
|---|---|---|
| Q1 | Strategy A | §7.2 (canonical) |
| Q2 | Query string | §7.3 (destroy wiring) |
| Q3 | Defer FormRequest | §8.2 (stays deferred) |
| Q4 | Minimal modal | §9.3 (UX notes) |
| Q5 | Skip audit trail | §14 Q5 (deferred to bug #42) |

---

## 15. References

- Audit origin: `docs/audit-findings.md` lines 911-950 (Section M1 deferral)
- Pattern precedent: `app/Exceptions/SeatConflictException.php` (409 exception shape)
- saveQuietly precedent: `app/Models/Customer.php:81, 253` (hook bypass)
- Migration precedent: `database/migrations/2026_03_19_*_add_return_trip_time_to_bookings_table.php` (simple ALTER)
- Test precedent: `tests/Unit/Services/SeatLockServiceTest.php` (concurrency test shape, sequential simulation)

---

## 16. Decision Log

| Date | Event | Actor | Reference |
|---|---|---|---|
| 2026-04-19 | Phase 0 recon complete (R1-R5) | Nerry + Claude | `579f437` initial design doc commit |
| 2026-04-19 | Q1-Q5 resolved at Phase 1 kickoff | Nerry + Claude | `[this commit]` §14 resolution |
| TBD | Phase 1 Step 1 migration executed | - | - |
| TBD | Phase 1 completion | - | - |

---

**End design sketch. Phase 1 kickoff complete. Ready for Phase 1 Step 1 (migration) execution.**
