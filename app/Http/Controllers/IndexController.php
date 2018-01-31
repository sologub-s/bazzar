<?php

namespace App\Http\Controllers;

use App\Contentblock;
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
    public function index(WorkuaParser $parser)
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

    public function contacts(WorkuaParser $parser)
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
