<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('drivers', function (Blueprint $table) {
            if (! Schema::hasColumn('drivers', 'phone')) {
                $table->string('phone', 30)->nullable()->after('lokasi');
            }

            if (! Schema::hasColumn('drivers', 'license_number')) {
                $table->string('license_number')->nullable()->after('phone');
            }

            if (! Schema::hasColumn('drivers', 'status')) {
                $table->string('status')->default('Active')->after('license_number');
                $table->index(['status']);
            }
        });

        Schema::table('mobil', function (Blueprint $table) {
            if (! Schema::hasColumn('mobil', 'brand')) {
                $table->string('brand')->nullable()->after('jenis_mobil');
            }

            if (! Schema::hasColumn('mobil', 'model')) {
                $table->string('model')->nullable()->after('brand');
            }

            if (! Schema::hasColumn('mobil', 'seat_capacity')) {
                $table->unsignedInteger('seat_capacity')->default(6)->after('model');
            }

            if (! Schema::hasColumn('mobil', 'status')) {
                $table->string('status')->default('Ready')->after('seat_capacity');
                $table->index(['status']);
            }
        });
    }

    public function down(): void
    {
        Schema::table('drivers', function (Blueprint $table) {
            if (Schema::hasColumn('drivers', 'status')) {
                $table->dropIndex(['status']);
            }

            $dropColumns = collect(['phone', 'license_number', 'status'])
                ->filter(fn (string $column) => Schema::hasColumn('drivers', $column))
                ->values()
                ->all();

            if ($dropColumns !== []) {
                $table->dropColumn($dropColumns);
            }
        });

        Schema::table('mobil', function (Blueprint $table) {
            if (Schema::hasColumn('mobil', 'status')) {
                $table->dropIndex(['status']);
            }

            $dropColumns = collect(['brand', 'model', 'seat_capacity', 'status'])
                ->filter(fn (string $column) => Schema::hasColumn('mobil', $column))
                ->values()
                ->all();

            if ($dropColumns !== []) {
                $table->dropColumn($dropColumns);
            }
        });
    }
};
