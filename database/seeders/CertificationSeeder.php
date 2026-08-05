<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\User;
use Illuminate\Database\Seeder;

class CertificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $candidates = User::where('role', 'user')->get();

        foreach ($candidates as $candidate) {
            Certification::firstOrCreate(
                ['user_id' => $candidate->id, 'title' => 'AWS Certified Solutions Architect'],
                [
                    'issuing_organization' => 'Amazon Web Services',
                    'issue_date' => '2023-03-15',
                    'expiration_date' => '2026-03-15',
                    'credential_id' => 'AWS-SAA-8823910',
                    'credential_url' => 'https://aws.amazon.com/verification',
                ]
            );
        }
    }
}
