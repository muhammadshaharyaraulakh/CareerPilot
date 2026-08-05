<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $candidates = User::where('role', 'user')->get();

        foreach ($candidates as $candidate) {
            Project::firstOrCreate(
                ['user_id' => $candidate->id, 'title' => 'AI Career Pilot Assistant'],
                [
                    'description' => 'Real-time job matching engine leveraging natural language processing.',
                    'project_url' => 'https://github.com/careerpilot/ai-assistant',
                    'start_date' => '2024-01-10',
                    'end_date' => '2024-05-20',
                ]
            );
        }
    }
}
