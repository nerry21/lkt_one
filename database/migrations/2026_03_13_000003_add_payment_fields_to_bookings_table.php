<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('payment_proof_path')->nullable()->after('payment_method');
            $table->timestamp('paid_at')->nullable()->after('payment_proof_path');
            $table->uuid('validated_by')->nullable()->after('paid_at');
            $table->timestamp('validated_at')->nullable()->after('validated_by');
            $table->text('validation_notes')->nullable()->after('validated_at');
            $table->timestamp('ticket_issued_at')->nullable()->after('validation_notes');
            $table->string('ticket_status')->default('Draft')->after('ticket_issued_at');

            $table->index(['validated_by']);
            $table->index(['ticket_status']);
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropIndex(['validated_by']);
            $table->dropIndex(['ticket_status']);

            $table->dropColumn([
                'payment_proof_path',
                'paid_at',
                'validated_by',
                'validated_at',
                'validation_notes',
                'ticket_issued_at',
                'ticket_status',
            ]);
        });
    }
};
