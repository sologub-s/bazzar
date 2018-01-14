<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Post;
use App\Tag;

class BlogController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        return view('blog/index', [
            'posts' => Post::with(['tags',])->where('active', 1)->orderBy('created_at', 'desc')->paginate(12),
            'tags' => Tag::all(),
        ]);
    }

    public function tag(Request $request, $tag_slug)
    {

        $tag = Tag::where('slug', $tag_slug)->first();

        return view('blog/tag', [
            'posts' => $tag->posts()->with(['tags',])->where('active', 1)->paginate(12),
            'tag' => $tag,
            'tags' => Tag::all(),
        ]);
    }


    public function post(Request $request, $post_slug)
    {

        return view('blog/post', [
            'post' => Post::with(['tags',])->where('slug', $post_slug)->where('active', 1)->first(),
        ]);
    }

}