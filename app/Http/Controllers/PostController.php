<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::paginate(10);

        // dd(PostResource::collection($posts));

        return Inertia::render('Post/Index', [
            'posts' => PostResource::collection($posts)
        ]);
    }
}
