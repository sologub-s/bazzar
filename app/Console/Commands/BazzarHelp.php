<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarHelp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:help';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Show help';

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
    public function handle(BazzarParser $parser)
    {
        $this->info("
            To do all the stuff just run the following 
            
            php artisan bazzar:workflow:all
            
            -- OR --
            
            php artisan bazzar:clean
            php artisan bazzar:download
            php artisan bazzar:parse:shops
            php artisan bazzar:parse:categories
            php artisan bazzar:parse:productsandbrands
            php artisan bazzar:parse:prices
            php artisan bazzar:clean
            php artisan bazzar:parse:properties
            php artisan bazzar:parse:images
            
            ;;;
              
        ");
        $this->line('');
    }
}
