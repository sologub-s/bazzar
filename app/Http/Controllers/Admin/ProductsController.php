<?php

namespace App\Http\Controllers\Admin;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ProductsController extends Controller
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
        $products = \App\Product
            ::with([
                'category', 'brand', 'prices' => function($query) {
                    $query->orderBy('price', 'ASC');
                }
            ]);

        if ($request->has('search_request') && !empty($request->input('search_request'))) {
            $ids = \App\Product::search(urldecode($request->input('search_request')))->get()->toArray();
            array_walk($ids, function (&$v) {
                $v = $v['id'];
            });
        }

        foreach([
                    'filter_category' => 'category_id',
                    'filter_brand' => 'brand_id',
                    'filter_active' => 'active',
                    'filter_in_stock' => 'in_stock',
                    'filter_parsed' => 'parsed',
                ] as $filter => $field) {
            if ($request->has($filter)) {
                $products->where($field, $request->input($filter));
            }
        }

        if (isset($ids)) {
            $products->whereIn('id', $ids);
        }

        return view('admin/products/index', [
            'products' => $products->paginate($request->has('items_limit') && in_array($request->input('items_limit'), ['10','25','50','100',]) ? $request->input('items_limit') : 10),
            'categories' => \App\Category::orderBy('name')->get(),
            'brands' => \App\Brand::orderBy('name')->get(),
        ]);
    }

    /**
     * Show the product edit form
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(\Illuminate\Http\Request $request)
    {
        return view('admin/products/edit', [
            'product' => \App\Product::firstOrFail($request->get('id')),
            'categories' => \App\Category::orderBy('name')->get(),
            'brands' => \App\Brand::orderBy('name')->get(),
        ]);
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
