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
  Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
  Route::get('/qariah/add', [App\Http\Controllers\Admin\QariahController::class, 'add'])->name('qariah.add');
  Route::put('/qariah/{id}', [App\Http\Controllers\Admin\QariahController::class, 'update'])->name('qariah.update');
  Route::get('/qariah/{id}', [App\Http\Controllers\Admin\QariahController::class, 'show'])->name('qariah.show');
  Route::post('/qariah/create', [App\Http\Controllers\Admin\QariahController::class, 'store'])->name('qariah.create');
  Route::get('/qariah', [App\Http\Controllers\Admin\QariahController::class, 'index'])->name('qariah');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
