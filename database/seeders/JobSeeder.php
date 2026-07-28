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

        foreach ($categories as $category) {
            // Seed 2 to 3 dummy jobs for each category
            $randomCompanies = $companies->random(min(3, $companies->count()));

            foreach ($randomCompanies as $company) {
                Job::factory()->create([
                    'category_id' => $category->id,
                    'company_id' => $company->id,
                    'title' => $category->title . ' Specialist',
                ]);
            }
        }
    }
}
