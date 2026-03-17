<?php

namespace App\Http\Requests\Survey;

use App\Models\CustomerSurvey;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSurveyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $ratingRule = Rule::in(CustomerSurvey::ratingOptions());

        return [
            'name'          => ['required', 'string', 'max:100'],

            'q1_answer'     => ['required', 'string', $ratingRule],
            'q1_suggestion' => ['nullable', 'string', 'max:1000'],
            'q2_answer'     => ['required', 'string', $ratingRule],
            'q2_suggestion' => ['nullable', 'string', 'max:1000'],
            'q3_answer'     => ['required', 'string', $ratingRule],
            'q3_suggestion' => ['nullable', 'string', 'max:1000'],
            'q4_answer'     => ['required', 'string', $ratingRule],
            'q4_suggestion' => ['nullable', 'string', 'max:1000'],
            'q5_answer'     => ['required', 'string', $ratingRule],
            'q5_suggestion' => ['nullable', 'string', 'max:1000'],
            'q6_answer'     => ['required', 'string', $ratingRule],
            'q6_suggestion' => ['nullable', 'string', 'max:1000'],
            'q7_answer'     => ['required', 'string', $ratingRule],
            'q7_suggestion' => ['nullable', 'string', 'max:1000'],
            'q8_answer'     => ['required', 'string', $ratingRule],
            'q8_suggestion' => ['nullable', 'string', 'max:1000'],

            'q9_answer'     => ['required', 'string', 'max:2000'],
            'q9_suggestion' => ['nullable', 'string', 'max:1000'],
            'q10_answer'    => ['required', 'string', 'max:2000'],
            'q10_suggestion'=> ['nullable', 'string', 'max:1000'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name'       => 'nama',
            'q1_answer'  => 'jawaban pertanyaan 1',
            'q2_answer'  => 'jawaban pertanyaan 2',
            'q3_answer'  => 'jawaban pertanyaan 3',
            'q4_answer'  => 'jawaban pertanyaan 4',
            'q5_answer'  => 'jawaban pertanyaan 5',
            'q6_answer'  => 'jawaban pertanyaan 6',
            'q7_answer'  => 'jawaban pertanyaan 7',
            'q8_answer'  => 'jawaban pertanyaan 8',
            'q9_answer'  => 'jawaban pertanyaan 9',
            'q10_answer' => 'jawaban pertanyaan 10',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim((string) $this->input('name', '')),
        ]);
    }
}
