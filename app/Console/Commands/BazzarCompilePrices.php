<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use FastSimpleHTMLDom\Document;

class BazzarCompilePrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:compile:prices {--cs|chunksize=10}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parsing the properties, descriptions and images from ava';

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

        $chunkSize = (int) abs($this->option('chunksize'));
        $this->info('Compiling prices for '.$chunkSize.' products per chunk...');
        $totalProducts = \App\Product::where('in_stock', 1)->count();
        $lastProductId = 0;

        $bar = $this->output->createProgressBar($totalProducts);
        $bar->start();

        while($products = DB::connection()->getPdo()->query("SELECT * FROM products WHERE in_stock = '1' AND `id` > ".$lastProductId." LIMIT ".(int)$chunkSize)->fetchAll()) {
            $productIds = [];
            $products_prices_json = [];
            $products_price_min = [];
            $products_price_max = [];
            foreach($products as $k => $product) {

                $lastProductId = $product['id'];
                $prices = DB::connection()->getPdo()->query("SELECT * FROM prices WHERE product_id = ".DB::connection()->getPdo()->quote($product['id']))->fetchAll();

                usort($prices, function ($a, $b) {
                    if ($a['price'] == $b['price']) {
                        return 0;
                    }
                    return $a['price'] < $b['price'] ? -1 : 1;
                });
                $productIds[] = (int)$product['id'];
                unset($products[$k]);
                $products_prices_json[] = "WHEN ".(int)$product['id']." THEN ".DB::connection()->getPdo()->quote(json_encode($prices, JSON_UNESCAPED_UNICODE));
                $products_price_min[] = "WHEN ".(int)$product['id']." THEN ".DB::connection()->getPdo()->quote(isset($prices[0]) ? $prices[0]['price'] : 0);
                $products_price_max[] = "WHEN ".(int)$product['id']." THEN ".DB::connection()->getPdo()->quote(isset($prices[sizeof($prices)-1]) ? $prices[sizeof($prices)-1]['price'] : 0);
            }
            DB::connection()->getPdo()->exec("
              UPDATE products
                SET
                    `prices_json` = CASE `id` ".implode(' ', $products_prices_json)." ELSE `prices_json` END,
                    `price_min` = CASE `id` ".implode(' ', $products_price_min)." ELSE `price_min` END,
                    `price_max` = CASE `id` ".implode(' ', $products_price_max)." ELSE `price_max` END
                WHERE id IN (".implode(', ', $productIds).")
                ");
            $bar->advance(sizeof($productIds));
        }
        $bar->finish();
        $this->line('');
        $this->info('Done.');
    }
}
