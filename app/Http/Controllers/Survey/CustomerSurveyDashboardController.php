<?php

namespace App\Http\Controllers\Survey;

use App\Http\Controllers\Controller;
use App\Models\CustomerSurvey;
use App\Models\Driver;
use App\Models\Mobil;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CustomerSurveyDashboardController extends Controller
{
    public function index(): View
    {
        $surveys = CustomerSurvey::query()
            ->with(['driver', 'mobil'])
            ->orderByDesc('created_at')
            ->paginate(20);

        $drivers = Driver::orderBy('nama')->get(['id', 'nama']);
        $mobils  = Mobil::orderBy('kode_mobil')->get(['kode_mobil', 'jenis_mobil']);

        return view('customer-surveys.index', [
            'pageTitle'       => 'Survei Pelanggan | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript'      => '',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Survei Pelanggan',
            'pageDescription' => 'Hasil jawaban survei kepuasan pelanggan JET (JAYA EXCECUTIVE TRANSPORT)',
            'surveys'         => $surveys,
            'questions'       => CustomerSurvey::questions(),
            'drivers'         => $drivers,
            'mobils'          => $mobils,
        ]);
    }

    public function show(CustomerSurvey $customerSurvey): View
    {
        return view('customer-surveys.show', [
            'pageTitle'       => 'Detail Survei | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript'      => '',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Detail Survei',
            'pageDescription' => 'Jawaban lengkap survei kepuasan pelanggan.',
            'survey'          => $customerSurvey->load(['driver', 'mobil']),
            'questions'       => CustomerSurvey::questions(),
            'ratingOptions'   => CustomerSurvey::ratingOptions(),
        ]);
    }

    public function update(Request $request, CustomerSurvey $customerSurvey): RedirectResponse
    {
        $request->validate([
            'driver_id'  => ['nullable', 'string', 'exists:drivers,id'],
            'kode_mobil' => ['nullable', 'string', 'exists:mobil,kode_mobil'],
        ]);

        $customerSurvey->update([
            'driver_id'  => $request->driver_id ?: null,
            'kode_mobil' => $request->kode_mobil ?: null,
        ]);

        return redirect()->route('customer-surveys.index')
            ->with('success', 'Data survei berhasil diperbarui.');
    }

    public function destroy(CustomerSurvey $customerSurvey): RedirectResponse
    {
        $customerSurvey->delete();

        return redirect()->route('customer-surveys.index')
            ->with('success', 'Data survei berhasil dihapus.');
    }
}
