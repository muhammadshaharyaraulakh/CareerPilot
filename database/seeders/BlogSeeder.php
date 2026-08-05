<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        $companies = Company::all();
        $categories = BlogCategory::all();

        if ($companies->isEmpty() || $categories->isEmpty()) {
            return;
        }

        $blogsData = [
            [
                'title' => '10 Essential Tips for Technical Interviews in 2026',
                'slug' => '10-essential-tips-technical-interviews-2026',
                'excerpt' => 'Mastering system design, algorithmic problem solving, and behavioral questions with modern AI tools.',
                'content' => 'Technical interviews in 2026 require a balance of algorithmic fluency and practical system architecture design. Candidates who excel demonstrate clear communication, systematic debugging strategies, and familiarity with scalable cloud patterns.',
                'read_time' => '5 min read',
                'status' => 'approved',
                'is_approved' => true,
                'cover_image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
                ],
            ],
            [
                'title' => 'The Future of Remote Engineering Teams and Hybrid Culture',
                'slug' => 'future-remote-engineering-teams-hybrid-culture',
                'excerpt' => 'How top tech companies manage synchronous communication, async workflows, and global talent acquisition.',
                'content' => 'As engineering teams expand globally, async documentation and outcome-based performance metrics become the cornerstone of high-performing remote organizations. Learn how leading companies scale engineering culture across time zones.',
                'read_time' => '7 min read',
                'status' => 'approved',
                'is_approved' => true,
                'cover_image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
                ],
            ],
            [
                'title' => 'Building High-Performance Full-Stack Applications with Laravel and Inertia',
                'slug' => 'building-high-performance-full-stack-laravel-inertia',
                'excerpt' => 'Combining the power of server-side Laravel routing with client-side React interactive components.',
                'content' => 'Inertia.js bridges the gap between single-page applications and classic server-driven frameworks. By eliminating GraphQL or REST boilerplate, developers build robust applications with maximum productivity.',
                'read_time' => '6 min read',
                'status' => 'approved',
                'is_approved' => true,
                'cover_image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
                ],
            ],
        ];

        foreach ($blogsData as $index => $b) {
            Blog::updateOrCreate(
                ['slug' => $b['slug']],
                [
                    'blog_category_id' => $categories->random()->id,
                    'company_id' => $companies->random()->id,
                    'title' => $b['title'],
                    'excerpt' => $b['excerpt'],
                    'content' => $b['content'],
                    'cover_image' => $b['cover_image'],
                    'gallery_images' => $b['gallery_images'],
                    'status' => $b['status'],
                    'is_approved' => $b['is_approved'],
                    'approved_by' => $admin?->id,
                    'approved_at' => now(),
                    'read_time' => $b['read_time'],
                    'views_count' => rand(150, 2400),
                ]
            );
        }
    }
}
