<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->alignUsersTable();

        if (Schema::hasTable('drivers')) {
            Schema::table('drivers', function (Blueprint $table) {
                if (Schema::hasColumn('drivers', 'updated_at')) {
                    $table->dropColumn('updated_at');
                }

                $table->index('nama');
            });
        }

        if (Schema::hasTable('mobil')) {
            Schema::table('mobil', function (Blueprint $table) {
                if (Schema::hasColumn('mobil', 'updated_at')) {
                    $table->dropColumn('updated_at');
                }

                $table->index('kode_mobil');
            });
        }

        if (Schema::hasTable('keberangkatan')) {
            Schema::table('keberangkatan', function (Blueprint $table) {
                if (Schema::hasColumn('keberangkatan', 'updated_at')) {
                    $table->dropColumn('updated_at');
                }

                $table->index('tanggal');
                $table->index('kode_mobil');
                $table->index('driver_id');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (! Schema::hasColumn('users', 'remember_token')) {
                    $table->rememberToken();
                }

                if (! Schema::hasColumn('users', 'updated_at')) {
                    $table->timestamp('updated_at')->nullable();
                }
            });
        }

        if (Schema::hasTable('drivers')) {
            Schema::table('drivers', function (Blueprint $table) {
                $table->dropIndex(['nama']);

                if (! Schema::hasColumn('drivers', 'updated_at')) {
                    $table->timestamp('updated_at')->nullable();
                }
            });
        }

        if (Schema::hasTable('mobil')) {
            Schema::table('mobil', function (Blueprint $table) {
                $table->dropIndex(['kode_mobil']);

                if (! Schema::hasColumn('mobil', 'updated_at')) {
                    $table->timestamp('updated_at')->nullable();
                }
            });
        }

        if (Schema::hasTable('keberangkatan')) {
            Schema::table('keberangkatan', function (Blueprint $table) {
                $table->dropIndex(['tanggal']);
                $table->dropIndex(['kode_mobil']);
                $table->dropIndex(['driver_id']);

                if (! Schema::hasColumn('keberangkatan', 'updated_at')) {
                    $table->timestamp('updated_at')->nullable();
                }
            });
        }
    }

    protected function alignUsersTable(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        $driver = DB::getDriverName();
        $needsRebuild = Schema::hasColumn('users', 'name')
            || Schema::hasColumn('users', 'username')
            || Schema::hasColumn('users', 'role')
            || Schema::hasColumn('users', 'email_verified_at')
            || Schema::hasColumn('users', 'remember_token')
            || Schema::hasColumn('users', 'updated_at');

        if ($driver === 'sqlite') {
            $columns = collect(DB::select("PRAGMA table_info('users')"))->mapWithKeys(
                fn (object $column) => [$column->name => strtolower((string) $column->type)]
            );

            $needsRebuild = $needsRebuild || ($columns->get('id') ?? '') !== 'uuid';
            $needsRebuild = $needsRebuild || str_contains($columns->get('id') ?? '', 'int');
        }

        if (! $needsRebuild) {
            return;
        }

        DB::transaction(function (): void {
            $temporaryTable = 'users_transport_legacy';

            if (Schema::hasTable($temporaryTable)) {
                Schema::drop($temporaryTable);
            }

            if (DB::getDriverName() === 'sqlite') {
                DB::statement('DROP INDEX IF EXISTS users_email_unique');
                DB::statement('DROP INDEX IF EXISTS users_username_unique');
            }

            Schema::rename('users', $temporaryTable);

            Schema::create('users', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('email')->unique();
                $table->string('nama');
                $table->string('password');
                $table->timestampTz('created_at')->useCurrent();
            });

            $legacyUsers = DB::table($temporaryTable)
                ->select(['id', 'email', 'nama', 'name', 'password', 'created_at'])
                ->get();

            foreach ($legacyUsers as $user) {
                DB::table('users')->insert([
                    'id' => (string) $user->id,
                    'email' => (string) $user->email,
                    'nama' => (string) ($user->nama ?: $user->name ?: str((string) $user->email)->before('@')->replace(['.', '_'], ' ')->title()),
                    'password' => (string) $user->password,
                    'created_at' => $user->created_at,
                ]);
            }

            Schema::drop($temporaryTable);
        });
    }
};
