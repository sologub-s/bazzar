<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

use App\Post;
use App\Observers\PostObserver;

use App\Contentblock;
use App\Observers\ContentblockObserver;

use Illuminate\Support\Facades\View;
use App\Category;
use App\Product;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        /**
         * Observers
         */
        Post::observe(PostObserver::class);
        Contentblock::observe(ContentblockObserver::class);

        View::share('categoriesList', Category::with(['categories'])->where('broken', 0)->get()->toArray());
        View::share('categoriesTree', Category::createTree(View::shared('categoriesList')));

        View::share(
            'mostViewed',
            Product
                ::with(['category', 'brand', 'prices' => function($query) {
                    $query->orderBy('price', 'ASC');
                }
                ])
                ->where('broken', 0)
                ->where('active', 1)
                ->orderBy('viewed', 'desc')
                ->orderBy('created_at', 'desc')
                //->inRandomOrder()
                ->limit(6)
                ->get()
        );
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        require_once base_path('app/Http/Helpers.php');

    }
}
