<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        $companies = Company::all();

        if ($categories->isEmpty() || $companies->isEmpty()) {
            return;
        }

        $google = Company::where('name', 'Google')->first() ?? $companies->first();
        $figma = Company::where('name', 'Figma')->first() ?? $companies->first();
        $dribbble = Company::where('name', 'Dribbble')->first() ?? $companies->first();
        $apple = Company::where('name', 'Apple')->first() ?? $companies->first();
        $microsoft = Company::where('name', 'Microsoft')->first() ?? $companies->first();
        $amazon = Company::where('name', 'Amazon')->first() ?? $companies->first();

        $catTech = Category::where('title', 'LIKE', '%Graphics%')->first() ?? $categories->first();
        $catCode = Category::where('title', 'LIKE', '%Code%')->first() ?? $categories->first();
        $catDesign = Category::where('title', 'LIKE', '%Design%')->first() ?? $categories->first();
        $catManagement = Category::where('title', 'LIKE', '%Management%')->first() ?? $categories->first();
        $catMarketing = Category::where('title', 'LIKE', '%Marketing%')->first() ?? $categories->first();

        // 12 Explicit Featured Jobs
        $featuredJobsData = [
            [
                'title' => 'Technical Support Specialist',
                'company_id' => $google->id,
                'category_id' => $catTech->id,
                'job_type' => 'Part Time',
                'location' => 'Dhaka, Bangladesh',
                'salary' => '$20,000 - $25,000',
                'positions' => 3,
                'description' => 'We are hiring a Technical Support Specialist to assist global client operations.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Senior UX Designer',
                'company_id' => $figma->id,
                'category_id' => $catDesign->id,
                'job_type' => 'Full Time',
                'location' => 'San Francisco, USA',
                'salary' => '$120,000 - $145,000',
                'positions' => 2,
                'description' => 'Lead creative user experience initiatives across core product design suites.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Marketing Officer',
                'company_id' => $dribbble->id,
                'category_id' => $catMarketing->id,
                'job_type' => 'Internship',
                'location' => 'Dhaka, Bangladesh',
                'salary' => '$15,000 - $20,000',
                'positions' => 4,
                'description' => 'Drive growth campaigns and community engagement programs for digital creators.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Junior Graphic Designer',
                'company_id' => $apple->id,
                'category_id' => $catDesign->id,
                'job_type' => 'Internship',
                'location' => 'California, USA',
                'salary' => '$40,000 - $55,000',
                'positions' => 2,
                'description' => 'Assist senior art directors in creating brand assets and visual campaigns.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Interaction Designer',
                'company_id' => $dribbble->id,
                'category_id' => $catDesign->id,
                'job_type' => 'Part Time',
                'location' => 'Remote, USA',
                'salary' => '$80,000 - $95,000',
                'positions' => 3,
                'description' => 'Craft interactive micro-interactions and motion prototypes for mobile apps.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Project Manager',
                'company_id' => $microsoft->id,
                'category_id' => $catManagement->id,
                'job_type' => 'Full Time',
                'location' => 'Washington, USA',
                'salary' => '$110,000 - $135,000',
                'positions' => 5,
                'description' => 'Coordinate cross-functional engineering teams to ship enterprise cloud features.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Software Engineer',
                'company_id' => $google->id,
                'category_id' => $catCode->id,
                'job_type' => 'Full Time',
                'location' => 'California, USA',
                'salary' => '$130,000 - $160,000',
                'positions' => 4,
                'description' => 'Build high-performance web applications and scalable backend APIs.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Visual Designer',
                'company_id' => $amazon->id,
                'category_id' => $catDesign->id,
                'job_type' => 'Full Time',
                'location' => 'Seattle, USA',
                'salary' => '$85,000 - $105,000',
                'positions' => 2,
                'description' => 'Design user interface systems and marketing landing pages for e-commerce platforms.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'DevOps Engineer',
                'company_id' => $amazon->id,
                'category_id' => $catCode->id,
                'job_type' => 'Full Time',
                'location' => 'Seattle, USA',
                'salary' => '$125,000 - $150,000',
                'positions' => 3,
                'description' => 'Manage CI/CD pipelines, Kubernetes clusters, and cloud infrastructure monitoring.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Front End Developer',
                'company_id' => $figma->id,
                'category_id' => $catCode->id,
                'job_type' => 'Part Time',
                'location' => 'San Francisco, USA',
                'salary' => '$95,000 - $115,000',
                'positions' => 2,
                'description' => 'Develop rich canvas tools using React, WebGL, and TypeScript.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Full Stack Developer',
                'company_id' => $microsoft->id,
                'category_id' => $catCode->id,
                'job_type' => 'Full Time',
                'location' => 'Washington, USA',
                'salary' => '$135,000 - $165,000',
                'positions' => 4,
                'description' => 'Develop web applications using Laravel, React, and SQL database systems.',
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Marketing Manager',
                'company_id' => $apple->id,
                'category_id' => $catMarketing->id,
                'job_type' => 'Internship',
                'location' => 'California, USA',
                'salary' => '$50,000 - $65,000',
                'positions' => 1,
                'description' => 'Oversee product launches, PR strategies, and global media partnerships.',
                'is_featured' => true,
                'status' => 'active',
            ],
        ];

        foreach ($featuredJobsData as $jobData) {
            Job::create($jobData);
        }

        // Additional regular jobs across all companies to populate categories and company stats
        foreach ($companies as $company) {
            $assignedCategories = $categories->random(min(3, $categories->count()));

            foreach ($assignedCategories as $category) {
                Job::factory()->create([
                    'category_id' => $category->id,
                    'company_id' => $company->id,
                    'title' => $category->title . ' Specialist',
                    'location' => $company->location,
                    'is_featured' => false,
                ]);
            }
        }
    }
}
