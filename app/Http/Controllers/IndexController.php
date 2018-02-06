<?php

namespace App\Http\Controllers;

use App\Contentblock;
use App\Shop;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Components\WorkuaParser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Product;

class IndexController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $products = Product
            ::with([
                'category', 'brand', 'prices' => function($query) {
                    $query->orderBy('price', 'ASC');
                }
            ])
            ->where('broken', 0)
            ->where('active', 1)
            ->where('has_ava_img', 1)
            ->orderBy('created_at', 'desc')
            ->limit(6);

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

        return view('index/index', [
            'favourites' => $favouritesMapped,
            'products' => $products->get(),
        ]);
    }

    public function contacts()
    {
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

        return view('index/contacts', [
            'favourites' => $favouritesMapped,
            'contacts' => Contentblock::get('contacts')['contacts'] ?? '',
        ]);
    }

    public function shops()
    {
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

        $shops = DB::connection()->getPdo()->query("
            SELECT
                s.id, s.name, s.logo, p.href, p.ordering
            FROM
                shops s
            LEFT JOIN
                prices p
            ON (s.id = p.shop_id)
            WHERE
                p.shop_id IS NOT NULL
            GROUP BY s.id
            ORDER BY
                s.name ASC, p.ordering DESC
        ")->fetchAll();

        return view('index/shops', [
            'favourites' => $favouritesMapped,
            'shops' => $shops,
        ]);
    }

    public function compare()
    {
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

        $ids = array_slice(session('compare', []), 0, 50);

        $compareProducts = empty($ids) ? [] : Product
            ::orderBy('created_at', 'desc')
            ->where('broken', 0)
            ->where('active', 1)
            ->where(function($query)  use ($ids) {
                foreach($ids as $id) {
                    $query->orWhere('id', $id);
                }
            })->get();

        return view('index/compare', [
            'favourites' => $favouritesMapped,
            'compareProducts' => $compareProducts,
        ]);
    }

    public function compareToggle(Request $request, Response $response)
    {
        $response->header('Content-Type', 'application/json; charset='.($response->getCharset() ?: 'UTF-8'), true);

        if (!Product::find($request->input('product_id'))) {
            return response()->json([
                'currentStatus' => 'notfound',
            ], 404);
        }
        $inCompare = $request->session()->get('compare', []);

        if(isset($inCompare[$request->input('product_id')])) {
            unset($inCompare[$request->input('product_id')]);
            $request->session()->put('compare', $inCompare);
            return response()->json([
                'currentStatus' => 'removed',
                'countInCompare' => sizeof($inCompare),
            ], 200);
        }
        $inCompare[$request->input('product_id')] = $request->input('product_id');
        $request->session()->put('compare', $inCompare);
        return response()->json([
            'currentStatus' => 'added',
            'countInCompare' => sizeof($inCompare),
        ], 200);
    }

    public function error($code, Response $response)
    {
        if ($code !== '404')
        {
            dd ($code);
        }

        $products = Product
            ::with([
                'category', 'brand', 'prices' => function($query) {
                    $query->orderBy('price', 'ASC');
                }
            ])
            ->where('broken', 0)
            ->where('active', 1)
            ->where('has_ava_img', 1)
            ->orderBy('created_at', 'desc')
            ->limit(6);

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
        $response->setStatusCode($code)->setContent(view('index/error_404', [
            'favourites' => $favouritesMapped,
            'products' => $products->get(),
        ]));
        return $response;
    }
}
