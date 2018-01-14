<?php

namespace App\Http\Controllers\Admin;

use App\Post;
use App\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
        parent::__construct();
    }

    /**
     * Show the posts list
     *
     * @return \Illuminate\Http\Response
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $posts = Post::with(['tags',]);

        if ($request->has('search_request') && !empty($request->input('search_request'))) {
            $ids = Post::search(urldecode($request->input('search_request')))->get()->toArray();
            array_walk($ids, function (&$v) {
                $v = $v['id'];
            });
        }

        foreach([
            'filter_active' => 'active',
                ] as $filter => $field) {
            if ($request->has($filter)) {
                $posts->where($field, $request->input($filter));
            }
        }

        if (isset($ids)) {
            $posts->whereIn('id', $ids);
        }

        $posts->orderBy($request->input('orderby', 'id'), $request->input('ascdesc', 'asc'));

        return view('admin/posts/index', [
            'posts' => $posts->paginate(10),
        ]);
    }

    /**
     * Show the posts add form
     *
     * @return \Illuminate\Http\Response
     */
    public function add(\Illuminate\Http\Request $request)
    {
        return view('admin/posts/add');
    }

    /**
     * Post add handler
     *
     * @return \Illuminate\Http\Response
     */
    public function addHandler(\Illuminate\Http\Request $request)
    {
        try {
            $post = new Post;
            $post->fill([
                'name' => $request->post('name'),
                'slug' => $request->post('slug'),
                'content' => $request->post('content'),
                'active' => $request->has('active') ? 1 : 0,
                'image' => $request->post('image'),
            ]);
            $post->save();
            $post->tags()->sync(array_map(function($tag) {
                return $tag->id;
            }, Tag::instantiate($request->post('tags'))));
            $post->searchable();
        } catch (\Exception $e) {
            if (false !== strpos($e->getMessage(), 'Duplicate entry')) {
                if($duplicateEntry = Post::where('name', 'LIKE', '%'.$request->post('name').'%')->orWhere('slug', 'LIKE', '%'.slug($request->post('name')).'%')->first()) {
                    return redirect()->route('admin_posts_add')->with('error', "The Post with the same name or slug is already exists: ".route('admin_posts_edit', ['id' => $duplicateEntry->id]))->withInput();
                }
            }
            return redirect()->route('admin_posts_add')->with('error', $e->getMessage())->withInput();
        }
        return redirect()->route('admin_posts_edit', $post->id)->with('status', 'Post created!');
    }

    /**
     * Show the posts edit form
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(\Illuminate\Http\Request $request, $id)
    {
        return view('admin/posts/edit', [
            'post' => Post::with('tags')->where('id', $id)->firstOrFail(),
        ]);
    }

    /**
     * Post edit handler
     *
     * @return \Illuminate\Http\Response
     */
    public function editHandler(\Illuminate\Http\Request $request, $id)
    {
        try {
            $post = Post::where('id', $id)->firstOrFail()->fill([
                'name' => $request->post('name'),
                'slug' => $request->post('slug'),
                'content' => $request->post('content'),
                'active' => $request->has('active') ? 1 : 0,
                'image' => $request->post('image'),
            ]);
            $post->tags()->sync(array_map(function($tag) {
                return $tag->id;
            }, Tag::instantiate($request->post('tags'))));
            $post->save();
            $post->searchable();
        } catch (\Exception $e) {
            return redirect()->route('admin_posts_edit', $id)->with('error', $e->getMessage());
        }
        return redirect()->route('admin_posts_edit', $id)->with('status', 'Post updated!');
    }

    public function toggleActive (Request $request, $id) {
        header('Content-Type: application/json');
        if (!$post = Post::where('id', $id)->first()) {
            die(json_encode(['success' => false, 'errors' => ['Post not found']]));
        }
        try {
            $post->active = (int)!$post->active;
            $post->save();
            die(json_encode(['success' => true, 'postActive' => $post->active]));
        } catch (\Exception $e) {
            die(json_encode(['success' => false, 'errors' => [$e->getMessage()]]));
        }

    }

    public function deleteHandler(\Illuminate\Http\Request $request, $id)
    {
        try {
            Post::destroy($id);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Cannot delete entry with id #'.$id)->withInput();
        }
        return redirect()->back()->with('status', 'Post deleted!');
    }

}