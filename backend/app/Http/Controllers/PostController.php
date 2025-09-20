<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    // READ - Get all posts
    public function index()
    {
        return response()->json(Post::all());
    }

    // READ - Get single post
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    // CREATE - Store new post
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'author' => 'nullable|string|max:255'
        ]);

        $post = Post::create($request->all());
        return response()->json($post, 201);
    }

    // UPDATE - Update existing post
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'author' => 'nullable|string|max:255'
        ]);

        $post->update($request->all());
        return response()->json($post);
    }

    // DELETE - Remove post
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Post deleted successfully'], 204);
    }
}