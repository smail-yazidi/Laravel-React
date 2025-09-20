<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// routes/web.php
use App\Http\Controllers\PostController;

Route::get('/posts', [PostController::class, 'index']);
Route::get('/', function () {
    return view('welcome');
});
