<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Add phone field to users table — Sesi 70 PR-CRM-6G.
 *
 * Format: E.164 tanpa '+', e.g. "628117598804" (sama dengan customers.phone_normalized).
 * Nullable: ada user existing yang phone-nya belum dikonfirmasi.
 * Unique: 1 phone = 1 user account.
 *
 * Backfill 3 admin existing dengan phone E.164:
 *   - nerry21 (nerrypopindo@gmail.com) → 628117598804
 *   - meme18 (maidianasari95@gmail.com) → 6281267975175
 *   - zizi12 (zizi@gmail.com) → 6282364210642
 *
 * Idempotent: hanya update kalau phone NULL atau berbeda. Skip kalau row not found.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        if (! Schema::hasColumn('users', 'phone')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('phone', 20)->nullable()->after('username');
            });
        }

        $this->backfillPhones();

        if (! $this->hasPhoneUniqueIndex()) {
            // After backfill — supaya unique constraint tidak fail kalau ada existing duplicate (defensive).
            Schema::table('users', function (Blueprint $table) {
                $table->unique('phone');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('users') || ! Schema::hasColumn('users', 'phone')) {
            return;
        }

        if ($this->hasPhoneUniqueIndex()) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropUnique('users_phone_unique');
            });
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone');
        });
    }

    /**
     * Backfill phones for known admins.
     * Lookup by email (primary) with username fallback.
     * Format: E.164 without '+', e.g. "628117598804".
     */
    protected function backfillPhones(): void
    {
        $admins = [
            ['email' => 'nerrypopindo@gmail.com', 'username' => 'nerry21', 'phone' => '628117598804'],
            ['email' => 'maidianasari95@gmail.com', 'username' => 'meme18', 'phone' => '6281267975175'],
            ['email' => 'zizi@gmail.com', 'username' => 'zizi12', 'phone' => '6282364210642'],
        ];

        foreach ($admins as $admin) {
            $user = DB::table('users')->where('email', $admin['email'])->first();
            if ($user === null) {
                $user = DB::table('users')->where('username', $admin['username'])->first();
            }
            if ($user === null) {
                echo "  [backfill] User not found: {$admin['email']} / {$admin['username']} — skipped.\n";
                continue;
            }
            if (empty($user->phone) || $user->phone !== $admin['phone']) {
                DB::table('users')
                    ->where('id', $user->id)
                    ->update(['phone' => $admin['phone']]);
                echo "  [backfill] Updated phone for {$admin['username']} ({$admin['email']}) → {$admin['phone']}.\n";
            } else {
                echo "  [backfill] Phone already set for {$admin['username']} — skipped.\n";
            }
        }
    }

    protected function hasPhoneUniqueIndex(): bool
    {
        return match (DB::getDriverName()) {
            'sqlite' => collect(DB::select("PRAGMA index_list('users')"))
                ->contains(fn (object $i): bool => ($i->name ?? null) === 'users_phone_unique'),
            'mysql', 'mariadb' => collect(DB::select('SHOW INDEX FROM users'))
                ->contains(fn (object $i): bool => ($i->Key_name ?? null) === 'users_phone_unique'),
            'pgsql' => collect(DB::select(
                "SELECT indexname FROM pg_indexes WHERE schemaname = current_schema() AND tablename = 'users'"
            ))->contains(fn (object $i): bool => ($i->indexname ?? null) === 'users_phone_unique'),
            default => false,
        };
    }
};
