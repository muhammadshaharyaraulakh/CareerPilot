<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Seeder;

class UserProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $candidates = User::where('role', 'user')->get();

        foreach ($candidates as $candidate) {
            UserProfile::updateOrCreate(
                ['user_id' => $candidate->id],
                [
                    'headline' => 'Senior Full Stack Software Engineer | Laravel & React',
                    'gender' => 'Male',
                    'experience_years' => rand(3, 8),
                    'current_salary' => '$85,000 / year',
                    'expected_salary' => '$110,000 / year',
                    'phone' => '+1 (555) 234-5678',
                    'location' => 'San Francisco, CA',
                    'biography' => 'Passionate software craftsman building scalable web applications with modern PHP, React, and cloud architectures.',
                    'is_public' => true,
                ]
            );
        }
    }
}
