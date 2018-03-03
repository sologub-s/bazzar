<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarWorkflowAll extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:workflow:all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Do main stuff';

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
        $this->call('bazzar:clean');
        $this->call('bazzar:download');
        $this->call('bazzar:parse:shops');
        $this->call('bazzar:parse:categories');
        $this->call('bazzar:parse:productsandbrands');
        $this->call('bazzar:parse:prices');
        $this->call('bazzar:clean');
        $this->call('bazzar:index:products');
        $this->call('bazzar:create:sitemap');
        //$this->call('php artisan bazzar:parse:properties');
        //$this->call('php artisan bazzar:parse:images');

        $this->line('');
    }
}
