<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => 'auth'], function () {
  Route::group(['prefix' => '/qariah/relatives'], function () {
    Route::get('/add/{parentId}', [App\Http\Controllers\Admin\RelativesController::class, 'add'])->name('qariah.relatives.add');
    Route::get('show/{id}', [App\Http\Controllers\Admin\RelativesController::class, 'show'])->name('qariah.relatives.show');
    Route::put('/{id}', [App\Http\Controllers\Admin\RelativesController::class, 'update'])->name('qariah.relatives.update');
    Route::post('/create', [App\Http\Controllers\Admin\RelativesController::class, 'store'])->name('qariah.relatives.create');
    Route::delete('/delete/{id}', [App\Http\Controllers\Admin\RelativesController::class, 'destroy'])->name('qariah.relatives.destroy');
    Route::get('/list/{qariahId}', [App\Http\Controllers\Admin\RelativesController::class, 'index'])->name('qariah.relatives');
  });

  Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
  Route::delete('/qariah/delete/{id}', [App\Http\Controllers\Admin\QariahController::class, 'destroy'])->name('qariah.destroy');
  Route::get('/qariah/add', [App\Http\Controllers\Admin\QariahController::class, 'add'])->name('qariah.add');
  Route::put('/qariah/{id}', [App\Http\Controllers\Admin\QariahController::class, 'update'])->name('qariah.update');
  Route::get('/qariah/{id}', [App\Http\Controllers\Admin\QariahController::class, 'show'])->name('qariah.show');
  Route::post('/qariah/create', [App\Http\Controllers\Admin\QariahController::class, 'store'])->name('qariah.create');
  Route::get('/qariah', [App\Http\Controllers\Admin\QariahController::class, 'index'])->name('qariah');
});

Auth::routes();
