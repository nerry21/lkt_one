<?php

namespace App\Http\Controllers\Survey;

use App\Http\Controllers\Controller;
use App\Models\CustomerSurvey;
use Illuminate\Contracts\View\View;

class CustomerSurveyDashboardController extends Controller
{
    public function index(): View
    {
        $surveys = CustomerSurvey::query()
            ->orderByDesc('created_at')
            ->paginate(20);

        return view('customer-surveys.index', [
            'pageTitle'       => 'Survei Pelanggan | Lancang Kuning Travelindo',
            'pageScript'      => '',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Survei Pelanggan',
            'pageDescription' => 'Hasil jawaban survei kepuasan pelanggan Lancang Kuning Travelindo',
            'surveys'         => $surveys,
            'questions'       => CustomerSurvey::questions(),
        ]);
    }

    public function show(CustomerSurvey $customerSurvey): View
    {
        return view('customer-surveys.show', [
            'pageTitle'       => 'Detail Survei | Lancang Kuning Travelindo',
            'pageScript'      => '',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Detail Survei',
            'pageDescription' => 'Jawaban lengkap survei kepuasan pelanggan.',
            'survey'          => $customerSurvey,
            'questions'       => CustomerSurvey::questions(),
            'ratingOptions'   => CustomerSurvey::ratingOptions(),
        ]);
    }
}
