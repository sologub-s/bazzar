<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Category;
use App\Product;
use App\Shop;

class CatalogueController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('catalogue/index');
    }

    public function categories(\Illuminate\Http\Request $request, $cats)
    {
        $categoryIds = explode('/', trim($cats, '/'));

        $breadcrumbs = [];
        foreach ($categoryIds as $id) {
            $iteratedIds = $iteratedIds ?? [];
            foreach ($this->categoriesList as $cat) {
                if ($cat['id'] != $id) {
                    continue;
                }
                $iteratedIds[] = $id;
                $breadcrumbs[] = [
                    'url' => route('catalogue_products', implode('/', $iteratedIds)),
                    'name' => $cat['name'],
                ];
            }
        }
        $catId = $categoryIds[sizeof($categoryIds)-1];
        if(!Category::where('id', $catId)->first()) {
            throw new NotFoundHttpException;
        }
        $categories = array_filter($this->categoriesList, function ($v) use ($catId) {
            return $v['parent_id'] == $catId;
        });
        return view('catalogue/categories', [
            'cats' => trim($cats, '/'),
            'breadcrumbs' => $breadcrumbs,
            'categories' => $categories,
        ]);
    }

    public function products(\Illuminate\Http\Request $request, $cats)
    {
        $categoryIds = explode('/', trim($cats, '/'));

        $breadcrumbs = [];
        foreach ($categoryIds as $id) {
            $iteratedIds = $iteratedIds ?? [];
            foreach ($this->categoriesList as $cat) {
                if ($cat['id'] != $id) {
                    continue;
                }
                $iteratedIds[] = $id;
                $breadcrumbs[] = [
                    'url' => route('catalogue_products', implode('/', $iteratedIds)),
                    'name' => $cat['name'],
                ];
                $category = $cat;
            }
        }
        if (!isset($category)) {
            throw new NotFoundHttpException;
        }
        if (sizeof($category['categories'])) {
            return $this->categories($request, $cats);
        }

        $products = Product
            ::with([
                'category', 'brand', 'prices' => function($query) {
                    $query->orderBy('price', 'ASC');
                }
            ]);

        if ($request->has('search_request') && !empty($request->input('search_request'))) {
            $ids = product::search(urldecode($request->input('search_request')))->get()->toArray();
            array_walk($ids, function (&$v) {
                $v = $v['id'];
            });
        }

        if (isset($ids)) {
            $products->whereIn('id', $ids);
        }

        $products
            ->where('broken', 0)
            ->where('active', 1)
            ->where('category_id', $categoryIds[sizeof($categoryIds) - 1]);

        $products->orderBy($request->input('orderby', 'id'), $request->input('ascdesc', 'asc'));

        $favouritesMapped = [];
        if (Auth::user()) {
            $favourites = Auth::user()->products()
                ->orderBy('product_user.created_at', 'desc')
                ->where('broken', 0)
                ->where('active', 1);
            $favourites = $favourites->get();
            $favouritesArray = $favourites->toArray();
            $favouritesMapped = [];
            while($favourite = array_shift($favouritesArray)) {
                $favouritesMapped[$favourite['id']] = $favourite;
            }
        }

        return view('catalogue/products', [
            'cats' => trim($cats, '/'),
            'breadcrumbs' => $breadcrumbs,
            'products' => $products->paginate($request->has('items_limit') && in_array($request->input('items_limit'), ['10','25','50','100',]) ? $request->input('items_limit') : 12),
            'favourites' => $favouritesMapped,
        ]);
    }

    public function search(\Illuminate\Http\Request $request, $search_request = '')
    {

        $products = Product
            ::with([
                'category', 'brand', 'prices' => function($query) {
                    $query->orderBy('price', 'ASC');
                }
            ]);

        if ($search_request && !empty($search_request)) {
            $ids = Product::search(urldecode($search_request))->get()->toArray();
            array_walk($ids, function (&$v) {
                $v = $v['id'];
            });
        }

        if (isset($ids)) {
            $products->whereIn('id', sizeof($ids) ? $ids : [0]);
        }

        $products
            ->where('broken', 0)
            ->where('active', 1);

        $products->orderBy($request->input('orderby', 'id'), $request->input('ascdesc', 'asc'));

        $favouritesMapped = [];
        if (Auth::user()) {
            $favourites = Auth::user()->products()
                ->orderBy('product_user.created_at', 'desc')
                ->with([
                    'category', 'brand', 'prices' => function ($query) {
                        $query->orderBy('price', 'ASC');
                    }
                ])
                ->where('broken', 0)
                ->where('active', 1);
            if (isset($ids)) {
                $favourites->whereIn('products.id', $ids);
            }
            $favourites = $favourites->get();
            $favouritesArray = $favourites->toArray();
            $favouritesMapped = [];
            while ($favourite = array_shift($favouritesArray)) {
                $favouritesMapped[$favourite['id']] = $favourite;
            }
        }

        return view('catalogue/search', [
            'search_request' => $search_request,
            'products' => $products->paginate($request->has('items_limit') && in_array($request->input('items_limit'), ['10','25','50','100',]) ? $request->input('items_limit') : 12),
            'favourites' => $favouritesMapped,
        ]);
    }

    public function theproduct (\Illuminate\Http\Request $request, $cats, $product_slug) {
        $categoryIds = explode('/', trim($cats, '/'));

        $breadcrumbs = [];
        foreach ($categoryIds as $id) {
            $iteratedIds = $iteratedIds ?? [];
            foreach ($this->categoriesList as $cat) {
                if ($cat['id'] != $id) {
                    continue;
                }
                if (sizeof($iteratedIds) && $cat['parent_id'] != $iteratedIds[sizeof($iteratedIds) - 1]) {
                    throw new NotFoundHttpException;
                }
                $iteratedIds[] = $id;
                $breadcrumbs[] = [
                    'url' => route('catalogue_products', implode('/', $iteratedIds)),
                    'name' => $cat['name'],
                ];
            }
        }

        $favouritesMapped = [];
        if (Auth::user()) {
            $favourites = Auth::user()->products()
                ->orderBy('product_user.created_at', 'desc')
                ->where('broken', 0)
                ->where('active', 1);
            $favourites = $favourites->get();
            $favouritesArray = $favourites->toArray();
            $favouritesMapped = [];
            while ($favourite = array_shift($favouritesArray)) {
                $favouritesMapped[$favourite['id']] = $favourite;
            }
        }

        $product = Product
            ::with([
                'category', 'brand', 'prices' => function($query) {
                    $query->orderBy('price', 'ASC');
                }
            ])
            ->where('broken', 0)
            ->where('active', 1)
            ->where('slug', $product_slug)
            ->first();

        if (!$product) {
            throw new NotFoundHttpException;
        }

        $product->viewed++;
        $product->save();

        return view('catalogue/theproduct', [
            'cats' => trim($cats, '/'),
            'breadcrumbs' => $breadcrumbs,
            'shops' => (function () {
                $collection = Shop::get();
                $result = [];
                foreach ($collection as $item) {
                    $result[$item->id] = $item;
                }
                return $result;
            })(),
            'product' => $product,
            'favourites' => $favouritesMapped,
        ]);
    }
}
