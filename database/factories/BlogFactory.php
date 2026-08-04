<?php

namespace Database\Factories;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    protected $model = Blog::class;

    public function definition(): array
    {
        $title = fake()->sentence(6);
        return [
            'blog_category_id' => BlogCategory::factory(),
            'company_id' => Company::factory(),
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(),
            'content' => fake()->paragraphs(5, true),
            'cover_image' => null,
            'gallery_images' => [],
            'status' => 'approved',
            'is_approved' => true,
            'approved_by' => User::factory(),
            'approved_at' => now(),
            'read_time' => '5 min read',
            'views_count' => fake()->numberBetween(10, 500),
        ];
    }
}
