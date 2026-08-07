<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\profiles\candidate\AccountSettingController;
use App\Http\Controllers\profiles\candidate\CertificationController;
use App\Http\Controllers\profiles\candidate\EducationController;
use App\Http\Controllers\profiles\candidate\ExperienceController;
use App\Http\Controllers\profiles\candidate\PersonalProfileController;
use App\Http\Controllers\profiles\candidate\ProjectController;
use App\Http\Controllers\profiles\candidate\ResumeController;
use App\Http\Controllers\profiles\candidate\SkillController;
use App\Http\Controllers\profiles\candidate\SocialLinkController;
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

    // Candidate Personal Profile Endpoints
    Route::get('/candidate/personal-profile', [PersonalProfileController::class, 'fetchPersonalData']);
    Route::get('/candidate/personal-profile/avatar', [PersonalProfileController::class, 'fetchProfilePicture']);
    Route::post('/candidate/personal-profile/images', [PersonalProfileController::class, 'updateimages']);
    Route::delete('/candidate/personal-profile/images', [PersonalProfileController::class, 'deleteImage']);
    Route::post('/candidate/personal-profile/update', [PersonalProfileController::class, 'update']);

    // Candidate Resume Endpoints
    Route::get('/candidate/resumes', [ResumeController::class, 'index']);
    Route::get('/candidate/resumes/{id}', [ResumeController::class, 'fetchResume']);
    Route::post('/candidate/resumes', [ResumeController::class, 'store']);
    Route::post('/candidate/resumes/{id}', [ResumeController::class, 'update']);
    Route::delete('/candidate/resumes/{id}', [ResumeController::class, 'destroy']);

    // Candidate Education Endpoints
    Route::get('/candidate/educations', [EducationController::class, 'fetch']);
    Route::get('/candidate/educations/{id}', [EducationController::class, 'fetchEducation']);
    Route::post('/candidate/educations', [EducationController::class, 'store']);
    Route::post('/candidate/educations/{id}', [EducationController::class, 'update']);
    Route::delete('/candidate/educations/{id}', [EducationController::class, 'destroy']);

    // Candidate Experience Endpoints
    Route::get('/candidate/experiences', [ExperienceController::class, 'fetch']);
    Route::get('/candidate/experiences/{id}', [ExperienceController::class, 'fetchExperience']);
    Route::post('/candidate/experiences', [ExperienceController::class, 'store']);
    Route::post('/candidate/experiences/{id}', [ExperienceController::class, 'update']);
    Route::delete('/candidate/experiences/{id}', [ExperienceController::class, 'destroy']);

    // Candidate Certification Endpoints
    Route::get('/candidate/certifications', [CertificationController::class, 'fetch']);
    Route::get('/candidate/certifications/{id}', [CertificationController::class, 'fetchCertification']);
    Route::post('/candidate/certifications', [CertificationController::class, 'store']);
    Route::post('/candidate/certifications/{id}', [CertificationController::class, 'update']);
    Route::delete('/candidate/certifications/{id}', [CertificationController::class, 'destroy']);

    // Candidate Project Endpoints
    Route::get('/candidate/projects', [ProjectController::class, 'fetch']);
    Route::get('/candidate/projects/{id}', [ProjectController::class, 'fetchProject']);
    Route::post('/candidate/projects', [ProjectController::class, 'store']);
    Route::post('/candidate/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/candidate/projects/{id}', [ProjectController::class, 'destroy']);

    // Candidate Skill Endpoints
    Route::get('/candidate/skills', [SkillController::class, 'fetch']);
    Route::get('/candidate/master-skills', [SkillController::class, 'masterSkills']);
    Route::post('/candidate/skills', [SkillController::class, 'store']);
    Route::post('/candidate/skills/{id}', [SkillController::class, 'update']);
    Route::delete('/candidate/skills/{id}', [SkillController::class, 'destroy']);

    // Candidate Social Link Endpoints
    Route::get('/candidate/social-links', [SocialLinkController::class, 'fetch']);
    Route::get('/candidate/social-links/{id}', [SocialLinkController::class, 'fetchSocialLink']);
    Route::post('/candidate/social-links', [SocialLinkController::class, 'store']);
    Route::post('/candidate/social-links/{id}', [SocialLinkController::class, 'update']);
    Route::delete('/candidate/social-links/{id}', [SocialLinkController::class, 'destroy']);

    // Candidate Account Settings Endpoints
    Route::get('/candidate/account-settings', [AccountSettingController::class, 'fetch']);
    Route::post('/candidate/account-settings', [AccountSettingController::class, 'update']);
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
