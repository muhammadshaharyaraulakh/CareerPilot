<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        $categories = [
            [
                'name' => 'Career Advice',
                'slug' => 'career-advice',
                'description' => 'Expert tips and strategic advice to navigate and elevate your professional career path.',
            ],
            [
                'name' => 'Hiring Trends',
                'slug' => 'hiring-trends',
                'description' => 'Insights into global hiring markets, salary standards, and emerging job opportunities.',
            ],
            [
                'name' => 'Interview Prep',
                'slug' => 'interview-prep',
                'description' => 'Actionable guidance on technical and behavioral interview preparation.',
            ],
            [
                'name' => 'Tech Insights',
                'slug' => 'tech-insights',
                'description' => 'Deep dives into modern web technologies, AI tools, and software engineering practices.',
            ],
            [
                'name' => 'Workplace Culture',
                'slug' => 'workplace-culture',
                'description' => 'Fostering inclusive environments, remote work strategies, and team productivity.',
            ],
        ];

        foreach ($categories as $cat) {
            BlogCategory::firstOrCreate(
                ['slug' => $cat['slug']],
                [
                    'name' => $cat['name'],
                    'description' => $cat['description'],
                    'created_by' => $admin?->id,
                ]
            );
        }
    }
}
