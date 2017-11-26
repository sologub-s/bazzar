<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class BazzarparserServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('App\Components\BazzarParser', function ($app) {
            return new \App\Components\BazzarParser();
        });
    }
}
