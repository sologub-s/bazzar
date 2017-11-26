<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use FastSimpleHTMLDom\Document;

class BazzarCheckinstock extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:checkinstock';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setting all the products with 0 amount of prices as out of stock and the products with non-0 amount as in stock';

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

        $this->comment('Updating in_stock for products...');

        DB::connection()->getPdo()->exec("
            UPDATE
                products
            LEFT JOIN
                prices ON (products.id = prices.product_id)
            SET
              in_stock = IF(prices.id IS NULL, 0, 1)
              ");

        $this->info('Done.');
    }
}
