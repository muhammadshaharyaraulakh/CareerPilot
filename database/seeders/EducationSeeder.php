<?php

namespace Database\Seeders;

use App\Models\Education;
use App\Models\User;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $candidates = User::where('role', 'user')->get();

        foreach ($candidates as $candidate) {
            Education::firstOrCreate(
                ['user_id' => $candidate->id, 'degree' => 'Bachelor of Science in Computer Science'],
                [
                    'level' => 'Bachelor Degree',
                    'institution' => 'Stanford University',
                    'field_of_study' => 'Computer Science',
                    'start_date' => '2018-09-01',
                    'end_date' => '2022-06-15',
                    'is_current' => false,
                    'notes' => 'Graduated with Magna Cum Laude honors.',
                ]
            );
        }
    }
}
