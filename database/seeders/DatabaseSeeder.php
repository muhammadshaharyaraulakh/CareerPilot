<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@careerpilot.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // 2. Create Employee Users
        User::factory()->employee()->count(5)->create();

        // 3. Create Regular Candidate Users
        User::factory()->count(10)->create();

        // 4. Run Entity Seeders in dependent order
        $this->call([
            SkillSeeder::class,
            CategorySeeder::class,
            CompanySeeder::class,
            JobSeeder::class,
            UserProfileSeeder::class,
            EducationSeeder::class,
            ExperienceSeeder::class,
            CertificationSeeder::class,
            ProjectSeeder::class,
            BlogCategorySeeder::class,
            BlogSeeder::class,
            BlogCommentSeeder::class,
        ]);
    }
}
