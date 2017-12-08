<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

use App\Post;
use App\Observers\PostObserver;

use App\Contentblock;
use App\Observers\ContentblockObserver;

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
