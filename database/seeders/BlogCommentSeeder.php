<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BlogComment;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = Blog::all();
        $users = User::where('role', 'user')->get();

        if ($blogs->isEmpty() || $users->isEmpty()) {
            return;
        }

        foreach ($blogs as $blog) {
            $user = $users->random();
            $parentComment = BlogComment::create([
                'blog_id' => $blog->id,
                'user_id' => $user->id,
                'comment' => 'This article provided incredible insights for our engineering workflow!',
                'is_approved' => true,
            ]);

            // Add a threaded reply
            BlogComment::create([
                'blog_id' => $blog->id,
                'user_id' => $users->except($user->id)->random()->id,
                'parent_id' => $parentComment->id,
                'comment' => 'Completely agree! The section on system design was spot on.',
                'is_approved' => true,
            ]);
        }
    }
}
