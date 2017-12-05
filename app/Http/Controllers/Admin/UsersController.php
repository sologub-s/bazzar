<?php

namespace App\Http\Controllers\Admin;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Spatie\Permission\Models\Role;

class UsersController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the products list
     *
     * @return \Illuminate\Http\Response
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $users = \App\User::where('id', '>', 0);

        if($request->has('filter_admin')) {
            if ($request->input('filter_admin') == 1) {
                $users->whereHas('roles', function ($query) use ($request) {
                    $roleAdmin = Role::findByName('Admin');
                    $query->where('id', $roleAdmin->id);
                });
            } else {
                $users->has('roles', '<', 1);
            }
        }

        if ($request->has('search_request') && !empty($request->input('search_request'))) {
            $users->where(function($q) use ($request) {
                $q->where('name', 'LIKE', '%'.$request->input('search_request').'%')
                    ->orWhere('email', 'LIKE', '%'.$request->input('search_request').'%');
            });
        }

        foreach([
                    'filter_banned' => 'banned',
                ] as $filter => $field) {
            if ($request->has($filter)) {
                $users->where($field, $request->input($filter));
            }
        }

        return view('admin/users/index', [
            'users' => $users->paginate($request->has('items_limit') && in_array($request->input('items_limit'), ['10','25','50','100',]) ? $request->input('items_limit') : 10),
        ]);
    }

    /**
     * Show the product edit form
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(\Illuminate\Http\Request $request, $id)
    {
        return view('admin/products/edit', [
            'product' => \App\Product::where('id', $id)->firstOrFail(),
            'categories' => \App\Category::orderBy('name')->get(),
            'brands' => \App\Brand::orderBy('name')->get(),
        ]);
    }

    public function toggleAdmin (Request $request, $id) {
        header('Content-Type: application/json');
        if (Auth::user()->id == $id) {
            die(json_encode(['success' => false, 'errors' => ['Cannot change your own adminship']]));
        }
        if (!$user = \App\User::where('id', $id)->first()) {
            die(json_encode(['success' => false, 'errors' => ['User not found']]));
        }
        try {
            if ($user->hasRole(Role::findByName('Admin'))) {
                $user->removeRole(Role::findByName('Admin'));
            } else {
                $user->assignRole(Role::findByName('Admin'));
            }
            die(json_encode(['success' => true, 'userIsAdmin' => $user->fresh()->hasRole(Role::findByName('Admin'))]));
        } catch (\Exception $e) {
            die(json_encode(['success' => false, 'errors' => [$e->getMessage()]]));
        }

    }

    public function toggleBanned (Request $request, $id) {
        header('Content-Type: application/json');
        if (Auth::user()->id == $id) {
            die(json_encode(['success' => false, 'errors' => ['Cannot ban/unban yourself']]));
        }
        if (!$user = \App\User::where('id', $id)->first()) {
            die(json_encode(['success' => false, 'errors' => ['User not found']]));
        }
        try {
            $user->banned = (int)!$user->banned;
            $user->save();
            die(json_encode(['success' => true, 'userBanned' => $user->banned]));
        } catch (\Exception $e) {
            die(json_encode(['success' => false, 'errors' => [$e->getMessage()]]));
        }

    }

    /**
     * Product edit handler
     *
     * @return \Illuminate\Http\Response
     */
    public function editHandler(\Illuminate\Http\Request $request, $id)
    {
        try {
            \App\Product::where('id', $id)->firstOrFail()->fill([
                'name' => $request->post('name'),
                'slug' => $request->post('slug'),
                'description' => $request->post('description'),
                'active' => $request->has('active') ? 1 : 0,
            ])->save();
        } catch (\Exception $e) {
            return redirect()->route('admin_products_edit', $id)->with('error', $e->getMessage());
        }
        return redirect()->route('admin_products_edit', $id)->with('status', 'Product updated!');
    }
}
