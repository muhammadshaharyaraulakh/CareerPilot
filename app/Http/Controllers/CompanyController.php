<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    /**
     * Display landing page with categories, featured companies, and all active featured jobs.
     */
    public function index(): Response
    {
        $categories = Category::withCount('jobs')->get();

        $featuredCompanies = Company::where('is_featured', true)
            ->withCount('jobs')
            ->get();

        // Fetch all active featured jobs from DB with relationships
        $featuredJobs = Job::with(['company', 'category'])
            ->where('is_featured', true)
            ->where('status', 'active')
            ->latest()
            ->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'categories' => $categories,
            'featuredCompanies' => $featuredCompanies,
            'featuredJobs' => $featuredJobs,
        ]);
    }
}
