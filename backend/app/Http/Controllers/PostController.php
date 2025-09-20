<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
      public function index()
    {
        return response()->json([
            ['id' => 1, 'title' => 'First Post'],
            ['id' => 2, 'title' => 'Second Post'],
            ['id' => 3, 'title' => 'Third Post'],
        ]);
    }
}
