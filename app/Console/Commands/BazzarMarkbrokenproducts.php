<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarMarkbrokenproducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:markbrokenproducts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mark products with broken category';

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
        set_time_limit(0);

        $this->comment('Parsing the list of Categories...');
        DB::connection()->getPdo()->exec("UPDATE products SET broken = 1 WHERE category_id IN(SELECT id FROM categories WHERE broken = 1)");
        $this->info('Done.');

        $this->call('bazzar:createcategoriestree');
    }
}
