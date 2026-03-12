<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        $shouldAddUsername = ! Schema::hasColumn('users', 'username');
        $shouldAddRole = ! Schema::hasColumn('users', 'role');

        if ($shouldAddUsername || $shouldAddRole) {
            Schema::table('users', function (Blueprint $table) use ($shouldAddRole, $shouldAddUsername) {
                if ($shouldAddUsername) {
                    $table->string('username')->nullable();
                }

                if ($shouldAddRole) {
                    $table->string('role')->nullable();
                }
            });
        }

        $this->backfillUsers();

        if (! $this->hasUsernameUniqueIndex()) {
            Schema::table('users', function (Blueprint $table) {
                $table->unique('username');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        $hasRole = Schema::hasColumn('users', 'role');
        $hasUsername = Schema::hasColumn('users', 'username');

        if (! $hasRole && ! $hasUsername) {
            return;
        }

        if ($hasUsername && $this->hasUsernameUniqueIndex()) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropUnique('users_username_unique');
            });
        }

        Schema::table('users', function (Blueprint $table) use ($hasRole, $hasUsername) {
            if ($hasUsername) {
                $table->dropColumn('username');
            }

            if ($hasRole) {
                $table->dropColumn('role');
            }
        });
    }

    protected function backfillUsers(): void
    {
        $users = DB::table('users')
            ->select(['id', 'email', 'nama', 'username', 'role', 'created_at'])
            ->orderBy('created_at')
            ->orderBy('id')
            ->get();

        $usedUsernames = [];

        foreach ($users as $index => $user) {
            $username = $this->normalizeUsername((string) ($user->username ?? ''));

            if ($username === '' || isset($usedUsernames[$username])) {
                $username = $this->makeUniqueUsername(
                    email: (string) ($user->email ?? ''),
                    name: (string) ($user->nama ?? ''),
                    usedUsernames: $usedUsernames,
                );
            }

            $usedUsernames[$username] = true;

            $role = in_array($user->role, ['Super Admin', 'Admin', 'User'], true)
                ? $user->role
                : ($index === 0 ? 'Super Admin' : 'User');

            DB::table('users')
                ->where('id', $user->id)
                ->update([
                    'username' => $username,
                    'role' => $role,
                ]);
        }
    }

    protected function normalizeUsername(string $value): string
    {
        return Str::lower((string) Str::of($value)->trim()->replaceMatches('/[^a-z0-9]+/i', ''));
    }

    protected function makeUniqueUsername(string $email, string $name, array $usedUsernames): string
    {
        $base = $this->normalizeUsername((string) Str::before($email, '@'));

        if ($base === '') {
            $base = $this->normalizeUsername($name);
        }

        if ($base === '') {
            $base = 'user';
        }

        $candidate = $base;
        $suffix = 1;

        while (isset($usedUsernames[$candidate])) {
            $candidate = $base.$suffix;
            $suffix++;
        }

        return $candidate;
    }

    protected function hasUsernameUniqueIndex(): bool
    {
        return match (DB::getDriverName()) {
            'sqlite' => collect(DB::select("PRAGMA index_list('users')"))
                ->contains(fn (object $index): bool => ($index->name ?? null) === 'users_username_unique'),
            'mysql' => collect(DB::select('SHOW INDEX FROM users'))
                ->contains(fn (object $index): bool => ($index->Key_name ?? null) === 'users_username_unique'),
            'pgsql' => collect(DB::select("SELECT indexname FROM pg_indexes WHERE schemaname = current_schema() AND tablename = 'users'"))
                ->contains(fn (object $index): bool => ($index->indexname ?? null) === 'users_username_unique'),
            default => false,
        };
    }
};
