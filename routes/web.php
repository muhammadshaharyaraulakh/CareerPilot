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

Route::get('/Contact', function () {
    return Inertia::render('Contact');
})->name('Contact');

Route::get('/find-job', function () {
    return Inertia::render('FindJob');
})->name('find.job');

Route::get('/FindJob', function () {
    return Inertia::render('FindJob');
})->name('FindJob');

Route::get('/job-details/{id?}', function () {
    return Inertia::render('JobDetails');
})->name('job.details');

Route::get('/JobDetails', function () {
    return Inertia::render('JobDetails');
})->name('JobDetails');

Route::get('/find-employers', function () {
    return Inertia::render('FindEmployers');
})->name('find.employers');

Route::get('/FindEmployers', function () {
    return Inertia::render('FindEmployers');
})->name('FindEmployers');

Route::get('/company-details/{id?}', function () {
    return Inertia::render('CompanyDetails');
})->name('company.details');

Route::get('/CompanyDetails', function () {
    return Inertia::render('CompanyDetails');
})->name('CompanyDetails');

Route::get('/About', function () {
    return Inertia::render('About');
})->name('About');

Route::get('/blogs', function () {
    return Inertia::render('AllBlogs');
})->name('blogs');

Route::get('/AllBlogs', function () {
    return Inertia::render('AllBlogs');
})->name('AllBlogs');

Route::get('/blog/{id?}', function () {
    return Inertia::render('SingleBlog');
})->name('SingleBlog');

Route::get('/company-profile', function () {
    return Inertia::render('CompanyProfile');
})->name('company.profile');

Route::get('/CompanyProfile', function () {
    return Inertia::render('CompanyProfile');
})->name('CompanyProfile');

Route::get('/CompanyDashboard', function () {
    return Inertia::render('CompanyDashboard');
})->name('CompanyDashboard');

Route::get('/company-dashboard', function () {
    return Inertia::render('CompanyDashboard');
})->name('company.dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('CompanyDashboard');
})->name('dashboard');

Route::get('/CandidateDashboard', function () {
    return Inertia::render('CandidateDashboard');
})->name('CandidateDashboard');

Route::get('/candidate-dashboard', function () {
    return Inertia::render('CandidateDashboard');
})->name('candidate.dashboard');

Route::get('/AdminDashboard', function () {
    return Inertia::render('AdminDashboard');
})->name('AdminDashboard');

Route::get('/admin-dashboard', function () {
    return Inertia::render('AdminDashboard');
})->name('admin.dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

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
