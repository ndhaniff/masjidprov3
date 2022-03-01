<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Qariah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $now = now();
        $lastYear = $now->copy()->subYear();
        $qariahTotal = Qariah::count();
        $qariahThisYear = Qariah::where('created_at', '>=', $now->startOfYear()->toDateTimeString())
            ->where('created_at', '<=', $now->endOfYear()->toDateTimeString())
            ->count();
        $qariahPrevTotal = Qariah::where('created_at', '>=', $lastYear->startOfYear()->toDateTimeString())
            ->where('created_at', '<=', $lastYear->endOfYear()->toDateTimeString())->count();

        return Inertia::render('Dashboard', compact('qariahPrevTotal', 'qariahTotal', 'qariahThisYear'));
    }
}
