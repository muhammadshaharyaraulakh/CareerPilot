<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Route (No Middleware)
|--------------------------------------------------------------------------
*/
Route::get('/', [CompanyController::class, 'index'])->name('home');

/*
|--------------------------------------------------------------------------
| Admin Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/AdminDashboard', function () {
        return Inertia::render('AdminDashboard');
    })->name('AdminDashboard');
});

/*
|--------------------------------------------------------------------------
| Company Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'company'])->group(function () {
    Route::get('/CompanyDashboard', function () {
        return Inertia::render('CompanyDashboard');
    })->name('CompanyDashboard');

    Route::get('/CompanyProfile', function () {
        return Inertia::render('CompanyProfile');
    })->name('CompanyProfile');
});

/*
|--------------------------------------------------------------------------
| Candidate Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'candidate'])->group(function () {
    Route::get('/CandidateDashboard', function () {
        return Inertia::render('CandidateDashboard');
    })->name('CandidateDashboard');
});

/*
|--------------------------------------------------------------------------
| General Authenticated User Routes (Require 'auth' Middleware)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/FindJob', function () {
        return Inertia::render('FindJob');
    })->name('FindJob');

    Route::get('/JobDetails/{id?}', function () {
        return Inertia::render('JobDetails');
    })->name('JobDetails');

    Route::get('/FindEmployers', function () {
        return Inertia::render('FindEmployers');
    })->name('FindEmployers');

    Route::get('/CompanyDetails/{id?}', function () {
        return Inertia::render('CompanyDetails');
    })->name('CompanyDetails');

    Route::get('/AllBlogs', function () {
        return Inertia::render('AllBlogs');
    })->name('AllBlogs');

    Route::get('/SingleBlog/{id?}', function () {
        return Inertia::render('SingleBlog');
    })->name('SingleBlog');

    Route::get('/About', function () {
        return Inertia::render('About');
    })->name('About');

    Route::get('/Contact', function () {
        return Inertia::render('Contact');
    })->name('Contact');

    Route::get('/Faq', function () {
        return Inertia::render('Faq');
    })->name('Faq');

    Route::get('/TermsOfService', function () {
        return Inertia::render('TermsOfService');
    })->name('TermsOfService');

    Route::get('/ComingSoon', function () {
        return Inertia::render('ComingSoon');
    })->name('ComingSoon');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Error & Fallback Routes
|--------------------------------------------------------------------------
*/
Route::get('/404', function () {
    return Inertia::render('NotFound');
})->name('NotFound');

Route::get('/403', function () {
    return Inertia::render('Forbidden');
})->name('Forbidden');

Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__ . '/auth.php';
