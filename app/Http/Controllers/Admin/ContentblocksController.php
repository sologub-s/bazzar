<?php

namespace App\Http\Controllers\Admin;

use App\Contentblock;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContentblocksController extends Controller
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
     * Show the contentblocks list
     *
     * @return \Illuminate\Http\Response
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $contentblocks = Contentblock::where('id', '>', '0');

        foreach([
                    'filter_active' => 'active',
                ] as $filter => $field) {
            if ($request->has($filter)) {
                $contentblocks->where($field, $request->input($filter));
            }
        }

        $contentblocks->orderBy($request->input('orderby', 'id'), $request->input('ascdesc', 'asc'));

        return view('admin/contentblocks/index', [
            'contentblocks' => $contentblocks->paginate($request->has('items_limit') && in_array($request->input('items_limit'), ['10','25','50','100',]) ? $request->input('items_limit') : 10),
        ]);
    }

    /**
     * Show the contentblocks add form
     *
     * @return \Illuminate\Http\Response
     */
    public function add(\Illuminate\Http\Request $request)
    {
        return view('admin/contentblocks/add');
    }

    /**
     * Contentblocks add handler
     *
     * @return \Illuminate\Http\Response
     */
    public function addHandler(\Illuminate\Http\Request $request)
    {
        try {
            $contentblock = (new Contentblock)->fill([
                'name' => $request->post('name'),
                'slug' => $request->post('slug'),
                'content' => $request->post('content'),
                'active' => $request->has('active') ? 1 : 0,
            ]);
            $contentblock->save();
        } catch (\Exception $e) {
            if (false !== strpos($e->getMessage(), 'Duplicate entry')) {
                if($duplicateEntry = Contentblock::where('name', 'LIKE', '%'.$request->post('name').'%')->orWhere('slug', 'LIKE', '%'.slug($request->post('name')).'%')->first()) {
                    return redirect()->route('admin_contentblocks_add')->with('error', "The Contentblock with the same name or slug is already exists: ".route('admin_contentblocks_edit', ['id' => $duplicateEntry->id]))->withInput();
                }
            }
            return redirect()->route('admin_contentblocks_add')->with('error', $e->getMessage())->withInput();
        }
        return redirect()->route('admin_contentblocks_edit', $contentblock->id)->with('status', 'Contentblock created!');
    }

    /**
     * Show the contentblocks edit form
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(\Illuminate\Http\Request $request, $id)
    {
        return view('admin/contentblocks/edit', [
            'contentblock' => Contentblock::where('id', $id)->firstOrFail(),
        ]);
    }

    /**
     * Contentblock edit handler
     *
     * @return \Illuminate\Http\Response
     */
    public function editHandler(\Illuminate\Http\Request $request, $id)
    {
        try {
            Contentblock::where('id', $id)->firstOrFail()->fill([
                'name' => $request->post('name'),
                'slug' => $request->post('slug'),
                'content' => $request->post('content'),
                'active' => $request->has('active') ? 1 : 0,
            ])->save();
        } catch (\Exception $e) {
            if (false !== strpos($e->getMessage(), 'Duplicate entry')) {
                if($duplicateEntry = Contentblock::where('name', 'LIKE', '%'.$request->post('name').'%')->orWhere('slug', 'LIKE', '%'.slug($request->post('name')).'%')->first()) {
                    return redirect()->route('admin_contentblocks_edit', $id)->with('error', "The Contentblock with the same name or slug is already exists: ".route('admin_contentblocks_edit', ['id' => $duplicateEntry->id]))->withInput();
                }
            }
            return redirect()->route('admin_contentblocks_edit', $id)->with('error', $e->getMessage())->withInput();
        }
        return redirect()->route('admin_contentblocks_edit', $id)->with('status', 'Contentblock updated!');
    }

    public function deleteHandler(\Illuminate\Http\Request $request, $id)
    {
        try {
            Contentblock::destroy($id);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Cannot delete entry with id #'.$id)->withInput();
        }
        return redirect()->back()->with('status', 'Contentblock deleted!');
    }

    public function toggleActive (Request $request, $id) {
        header('Content-Type: application/json');
        if (!$contentblock = Contentblock::where('id', $id)->first()) {
            die(json_encode(['success' => false, 'errors' => ['Contentblock not found']]));
        }
        try {
            $contentblock->active = (int)!$contentblock->active;
            $contentblock->save();
            die(json_encode(['success' => true, 'contentblockActive' => $contentblock->active]));
        } catch (\Exception $e) {
            die(json_encode(['success' => false, 'errors' => [$e->getMessage()]]));
        }

    }

}