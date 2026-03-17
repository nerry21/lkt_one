<?php

namespace App\Http\Controllers\Survey;

use App\Http\Controllers\Controller;
use App\Http\Requests\Survey\StoreSurveyRequest;
use App\Models\CustomerSurvey;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;

class PublicSurveyController extends Controller
{
    public function show(): View
    {
        return view('survey.form', [
            'questions'     => CustomerSurvey::questions(),
            'ratingOptions' => CustomerSurvey::ratingOptions(),
            'pageTitle'     => 'Survei Kepuasan Pelanggan | Lancang Kuning Travelindo',
            'guardMode'     => 'none',
            'pageScript'    => '',
        ]);
    }

    public function store(StoreSurveyRequest $request): RedirectResponse
    {
        CustomerSurvey::create($request->validated());

        return redirect()->route('survey.thank-you');
    }

    public function thankYou(): View
    {
        return view('survey.thank-you', [
            'pageTitle'  => 'Terima Kasih | Lancang Kuning Travelindo',
            'guardMode'  => 'none',
            'pageScript' => '',
        ]);
    }
}
