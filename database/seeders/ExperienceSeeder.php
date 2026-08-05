<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\User;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $candidates = User::where('role', 'user')->get();

        foreach ($candidates as $candidate) {
            Experience::firstOrCreate(
                ['user_id' => $candidate->id, 'job_title' => 'Software Engineer'],
                [
                    'company_name' => 'TechCorp Solutions',
                    'location' => 'San Francisco, CA',
                    'start_date' => '2022-07-01',
                    'end_date' => null,
                    'is_current' => true,
                    'description' => 'Architected high-throughput microservices handling millions of API requests daily.',
                ]
            );
        }
    }
}
