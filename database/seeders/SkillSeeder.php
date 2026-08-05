<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            ['name' => 'Laravel', 'category' => 'Backend Development'],
            ['name' => 'React', 'category' => 'Frontend Development'],
            ['name' => 'Vue.js', 'category' => 'Frontend Development'],
            ['name' => 'Node.js', 'category' => 'Backend Development'],
            ['name' => 'Python', 'category' => 'Data & AI'],
            ['name' => 'TypeScript', 'category' => 'Web Development'],
            ['name' => 'Docker', 'category' => 'DevOps'],
            ['name' => 'Kubernetes', 'category' => 'DevOps'],
            ['name' => 'AWS', 'category' => 'Cloud Computing'],
            ['name' => 'PostgreSQL', 'category' => 'Database'],
            ['name' => 'MySQL', 'category' => 'Database'],
            ['name' => 'GraphQL', 'category' => 'API Development'],
            ['name' => 'TailwindCSS', 'category' => 'Frontend Design'],
            ['name' => 'Figma', 'category' => 'UI/UX Design'],
            ['name' => 'Next.js', 'category' => 'Frontend Development'],
        ];

        foreach ($skills as $skill) {
            Skill::firstOrCreate(['name' => $skill['name']], $skill);
        }
    }
}
