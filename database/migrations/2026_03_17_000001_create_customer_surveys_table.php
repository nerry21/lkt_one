<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_surveys', function (Blueprint $table): void {
            $table->id();
            $table->string('name');

            // Q1–Q8: rating + saran
            $table->string('q1_answer');
            $table->text('q1_suggestion')->nullable();
            $table->string('q2_answer');
            $table->text('q2_suggestion')->nullable();
            $table->string('q3_answer');
            $table->text('q3_suggestion')->nullable();
            $table->string('q4_answer');
            $table->text('q4_suggestion')->nullable();
            $table->string('q5_answer');
            $table->text('q5_suggestion')->nullable();
            $table->string('q6_answer');
            $table->text('q6_suggestion')->nullable();
            $table->string('q7_answer');
            $table->text('q7_suggestion')->nullable();
            $table->string('q8_answer');
            $table->text('q8_suggestion')->nullable();

            // Q9–Q10: textarea jawaban + saran
            $table->text('q9_answer');
            $table->text('q9_suggestion')->nullable();
            $table->text('q10_answer');
            $table->text('q10_suggestion')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_surveys');
    }
};
