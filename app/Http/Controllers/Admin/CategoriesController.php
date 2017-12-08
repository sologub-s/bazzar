<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoriesController extends Controller
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
     * Show the categories list
     *
     * @return \Illuminate\Http\Response
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $categories = Category::orderBy('name')->get();

        return view('admin/categories/index', [
            'categories' => $categories,
            'categoriesTree' => Category::createTree($categories->toArray()),
        ]);
    }

    public function toggleActive (Request $request, $id) {
        header('Content-Type: application/json');
        if (!$product = \App\Product::where('id', $id)->first()) {
            die(json_encode(['success' => false, 'errors' => ['Product not found']]));
        }
        try {
            $product->active = (int)!$product->active;
            $product->save();
            die(json_encode(['success' => true, 'productActive' => $product->active]));
        } catch (\Exception $e) {
            die(json_encode(['success' => false, 'errors' => [$e->getMessage()]]));
        }

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

    public function savetermsHandler(\Illuminate\Http\Request $request, $id)
    {
        set_time_limit(300);
        try {
            \App\Category::where('id', $id)->firstOrFail()->fill([
                'terms' => urldecode($request->get('terms')),
            ])->save();
            //\App\Product::where('category_id', $id)->searchable();
        } catch (\Exception $e) {
            return redirect()->route('admin_categories', $id)->with('error', $e->getMessage());
        }
        return redirect()->route('admin_categories', $id)->with('status', 'Category #'.$id.' updated!');
    }

}
