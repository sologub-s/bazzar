<?php

namespace App\Console\Commands;

use Config;
use Illuminate\Console\Command;
use TeamTNT\TNTSearch\TNTSearch;

class BazzarIndexProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:index:products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Index the products table';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $tnt = new TNTSearch;
        $tnt->loadConfig([
            'driver'    => config('database.connections.mysql.driver'),
            'host'      => config('database.connections.mysql.host'),
            'database'  => config('database.connections.mysql.database'),
            'username'  => config('database.connections.mysql.username'),
            'password'  => config('database.connections.mysql.password'),
            'storage'   => config('scout.tntsearch.storage'),
        ]);
        $indexer = $tnt->createIndex('products.index');
        $indexer->query('SELECT `id`, `name`, `description` FROM products;');
        $indexer->run();
    }
}