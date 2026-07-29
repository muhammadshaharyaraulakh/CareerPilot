<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [CompanyController::class, 'index'])->name('home');

Route::get('/terms', function () {
    return Inertia::render('TermsOfService');
})->name('TermsOfService');

Route::get('/ComingSoon', function () {
    return Inertia::render('ComingSoon');
})->name('ComingSoon');

Route::get('/Faq', function () {
    return Inertia::render('Faq');
})->name('Faq');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/404', function () {
    return Inertia::render('NotFound');
})->name('NotFound');

Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__ . '/auth.php';
