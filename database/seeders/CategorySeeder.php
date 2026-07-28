<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@careerpilot.com',
        ]);

        $categories = [
            'Web Development',
            'Mobile Development',
            'AI Engineering',
            'Machine Learning',
            'Data Engineering',
            'Data Science',
            'DevOps',
            'Cloud Engineering',
            'Cybersecurity',
            'Full Stack Development',
            'Backend Development',
            'Frontend Development',
            'Software Engineering',
            'Blockchain & Web3',
            'IoT Development',
            'Embedded Systems',
            'QA Automation',
            'UI/UX Design',
            'Product Management',
            'Site Reliability Engineering (SRE)',
        ];

        foreach ($categories as $title) {
            Category::firstOrCreate(
                ['title' => $title],
                ['created_by' => $admin->id]
            );
        }
    }
}
