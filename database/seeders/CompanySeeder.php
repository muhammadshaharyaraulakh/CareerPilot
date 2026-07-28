<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->admin()->create();

        // 6 Featured Companies matching uploaded SVG logos
        $featuredCompanies = [
            ['name' => 'Dribbble', 'location' => 'Dhaka, Bangladesh', 'logo' => 'companies/dribbble.svg', 'is_featured' => true],
            ['name' => 'Google', 'location' => 'California, USA', 'logo' => 'companies/google.svg', 'is_featured' => true],
            ['name' => 'Microsoft', 'location' => 'Washington, USA', 'logo' => 'companies/microsoft.svg', 'is_featured' => true],
            ['name' => 'Apple', 'location' => 'California, USA', 'logo' => 'companies/apple.svg', 'is_featured' => true],
            ['name' => 'Amazon', 'location' => 'Seattle, USA', 'logo' => 'companies/amazon.svg', 'is_featured' => true],
            ['name' => 'Figma', 'location' => 'San Francisco, USA', 'logo' => 'companies/figma.svg', 'is_featured' => true],
        ];

        foreach ($featuredCompanies as $compData) {
            Company::updateOrCreate(
                ['name' => $compData['name']],
                [
                    'location' => $compData['location'],
                    'logo' => $compData['logo'],
                    'is_featured' => $compData['is_featured'],
                    'user_id' => $admin->id,
                ]
            );
        }

        // Additional non-featured companies
        $otherCompanies = [
            ['name' => 'Slack', 'location' => 'San Francisco, USA', 'logo' => 'companies/slack.svg'],
            ['name' => 'Spotify', 'location' => 'Stockholm, Sweden', 'logo' => 'companies/spotify.svg'],
            ['name' => 'Adobe', 'location' => 'San Jose, USA', 'logo' => 'companies/adobe.svg'],
            ['name' => 'Netflix', 'location' => 'Los Gatos, USA', 'logo' => 'companies/netflix.svg'],
        ];

        foreach ($otherCompanies as $compData) {
            Company::updateOrCreate(
                ['name' => $compData['name']],
                [
                    'location' => $compData['location'],
                    'logo' => $compData['logo'],
                    'is_featured' => false,
                    'user_id' => $admin->id,
                ]
            );
        }
    }
}
