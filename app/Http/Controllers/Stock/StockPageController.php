<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Services\StockAllocationService;
use Illuminate\Contracts\View\View;

class StockPageController extends Controller
{
    public function index(StockAllocationService $stockAllocationService): View
    {
        return view('stock.index', [
            'pageTitle' => 'Stok Snack & Air Mineral | Lancang Kuning Travelindo',
            'pageScript' => 'stock/index',
            'guardMode' => 'protected',
            'pageHeading' => 'Stok Snack & Air Mineral',
            'pageDescription' => 'Kelola stok consumable harian yang terhubung dengan keberangkatan',
            'stockPrices' => $stockAllocationService->unitPrices(),
        ]);
    }
}
