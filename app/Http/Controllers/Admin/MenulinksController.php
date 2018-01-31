<?php

namespace App\Http\Controllers\Admin;

use App\MenuLink;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MenulinksController extends Controller
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
     * Show the categories list
     *
     * @return \Illuminate\Http\Response
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $menuLinks = MenuLink::with(['menulinks' => function($query) {
            $query->ordered();
        },'parent'])->where('parent_id', null)->ordered()->get();

        return view('admin/menulinks/index', [
            'menuLinks' => $menuLinks,
        ]);
    }

    public function toggleActive (Request $request, $id) {
        header('Content-Type: application/json');
        if (!$menuLink = MenuLink::where('id', $id)->first()) {
            die(json_encode(['success' => false, 'errors' => ['MenuLink not found']]));
        }
        try {
            $menuLink->active = (int)!$menuLink->active;
            $menuLink->save();
            die(json_encode(['success' => true, 'menuLinkActive' => $menuLink->active]));
        } catch (\Exception $e) {
            die(json_encode(['success' => false, 'errors' => [$e->getMessage()]]));
        }

    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function edit(\Illuminate\Http\Request $request, $id = null)
    {
        $menuLinks = MenuLink::ordered()->get();
        return view('admin/menulinks/edit', [
            'menuLink' => MenuLink::where('id', $id)->first(),
            'menuLinks' => $menuLinks,
        ]);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function editHandler(\Illuminate\Http\Request $request, $id = null)
    {
        try {
            if ($request->get('parent_id')) {
                if ($request->get('custom_type')) {
                    throw new \Exception('Custom menu link cannot have parent');
                }
                $parent = MenuLink::find($request->get('parent_id'));
                if (!$parent || $parent->parent_id) {
                    throw new \Exception('Wrong parent');
                }
            }
            $menuLink = MenuLink::find($id);
            if (!$menuLink) {
                $menuLink = MenuLink::create();
            }
            $menuLink->fill(array_merge($request->all(), ['active' => $request->has('active') ? 1 : 0,]))->save();
        } catch (\Exception $e) {
            return redirect()->route('admin_menulinks_edit', $id)->with('error', $e->getMessage())->withInput();
        }
        return redirect()->route('admin_menulinks_edit', $menuLink->id)->with('status', 'MenuLink updated!');
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function move(\Illuminate\Http\Request $request, $direction = 'up', $id = null)
    {
        $menuLink = MenuLink::find($id);
        if (!$menuLink) {
            return redirect()->route('admin_menulinks_edit', $id)->with('error', 'Menu link not found');
        }
        if ($direction == 'up') {
            $menuLink->moveOrderUp();
        } else {
            $menuLink->moveOrderDown();
        }
        return redirect()->route('admin_menulinks')->with('status', 'MenuLink '.$menuLink->name.' moved!');
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function delete(\Illuminate\Http\Request $request, $id = null)
    {
        $menuLink = MenuLink::find($id);
        if(!$menuLink) {
            return redirect()->route('admin_menulinks')->with('status', 'MenuLink not found!');
        }
        $menuLink->delete();
        return redirect()->route('admin_menulinks')->with('status', 'MenuLink deleted!');
    }


}
