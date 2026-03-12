<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardStatisticsService;
use Illuminate\Http\JsonResponse;

class StatisticsController extends Controller
{
    public function __construct(
        private readonly DashboardStatisticsService $statistics,
    ) {
    }

    public function dashboard(): JsonResponse
    {
        return response()->json($this->statistics->summary());
    }

    public function revenueChart(): JsonResponse
    {
        return response()->json($this->statistics->revenueChart());
    }

    public function mobilRevenue(): JsonResponse
    {
        return response()->json($this->statistics->mobilRevenue());
    }
}
