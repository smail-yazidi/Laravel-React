<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder
{
    public function run()
    {
        Post::create([
            'title' => 'Getting Started with Laravel',
            'content' => 'Laravel is a powerful PHP framework for web development.',
            'author' => 'John Doe'
        ]);

        Post::create([
            'title' => 'Building APIs with Laravel',
            'content' => 'Learn how to create RESTful APIs using Laravel.',
            'author' => 'Jane Smith'
        ]);

        Post::create([
            'title' => 'MySQL Database Integration',
            'content' => 'Connect your Laravel app to MySQL database.',
            'author' => 'Bob Johnson'
        ]);

        Post::create([
            'title' => 'Frontend with React',
            'content' => 'Building modern frontends with React and Tailwind CSS.',
            'author' => 'Alice Brown'
        ]);

        Post::create([
            'title' => 'Deployment Best Practices',
            'content' => 'How to deploy your Laravel application to production.',
            'author' => 'Mike Wilson'
        ]);
    }
}
