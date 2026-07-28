<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->jobTitle(),
            'company_id' => Company::factory(),
            'category_id' => Category::factory(),
            'job_type' => fake()->randomElement(['Full Time', 'Part Time', 'Contract', 'Remote', 'Internship']),
            'location' => fake()->city() . ', ' . fake()->country(),
            'salary' => '$' . fake()->numberBetween(50, 150) . 'k - $' . fake()->numberBetween(160, 250) . 'k',
            'positions' => fake()->numberBetween(1, 15),
            'description' => fake()->paragraphs(3, true),
            'is_featured' => fake()->boolean(30),
            'status' => 'active',
        ];
    }
}
