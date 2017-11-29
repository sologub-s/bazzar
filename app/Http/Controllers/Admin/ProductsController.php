<?php

namespace App\Http\Controllers\Admin;

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
     * Show the application dashboard.
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

        return view('admin/products/index', [
            /*
            'products' => \App\Product
                ::with('category')
                ->with('brand')
                ->with(['prices' => function($query) {
                    $query->orderBy('price', 'ASC');
                }])
                ->paginate(10),
            */
            'products' => $products->paginate($request->has('items_limit') && in_array($request->input('items_limit'), ['10','25','50','100',]) ? $request->input('items_limit') : 10),
            'categories' => \App\Category::orderBy('name')->get(),
            'brands' => \App\Brand::orderBy('name')->get(),
        ]);
    }
}
