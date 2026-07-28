<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->admin()->create();

        $companies = [
            'Upwork',
            'Google',
            'Apple',
            'Microsoft',
            'Amazon',
            'Meta',
            'Netflix',
            'Spotify',
            'Adobe',
            'Slack',
        ];

        foreach ($companies as $name) {
            Company::firstOrCreate(
                ['name' => $name],
                [
                    'location' => fake()->city() . ', ' . fake()->country(),
                    'user_id' => $admin->id,
                ]
            );
        }
    }
}
