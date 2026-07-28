<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('jobs')->get();
        return Inertia::render('Welcome', [
            'categories' => $categories,
        ]);
    }
}
