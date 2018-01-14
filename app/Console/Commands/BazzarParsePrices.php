<?php

namespace App\Console\Commands;

use App\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarParsePrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:parse:prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parsing the list of prices from existing .xml file';

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

        $parseTime = time();

        $this->comment('Started: '.date("H:i:s"));
        $storagePrefix = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix();

        if(!file_exists($storagePrefix.'/export_xml'.'/prices.xml')) {
            $this->warn('file ' . $storagePrefix.'/export_xml'.'/prices.xml' . ' does not exists, stopping.');
        }

        $this->comment('Counting lines in prices.xml...');
        $file = new \SplFileObject($storagePrefix.'/export_xml'.'/prices.xml');
        $totalLines = 0;
        exec("wc -l ".$storagePrefix.'/export_xml'.'/prices.xml', $totalLines);
        $totalLines = (int)explode(' ', $totalLines[0])[0];
        $this->comment('Total '.$totalLines.' lines in a file prices.xml');
        $this->line('');

        $this->comment('Parsing the list of Prices...');
        $counter = 0;
        $chunkSize = 500;
        $completed = false;
        $savedPrices = 0;

        $shops = \App\Shop::all(['id','ava_id',]);
        $shopsMap = [];
        foreach($shops as $shop) {
            $shopsMap[$shop->ava_id] = $shop->id;
        }
        unset($shops);

        $products = Product::all(['id','ava_id',]);
        $productsMap = [];
        foreach($products as $product) {
            $productsMap[$product->ava_id] = $product->id;
        }
        unset($products);

        $bar = $this->output->createProgressBar($totalLines);
        $bar->start();
        while(!$completed) {
            $chunk = [];
            $stopAt = $counter + $chunkSize;
            while($counter <= $stopAt) {
                $file->next();
                $line = $file->current();
                if ($file->eof()) {
                    $completed = true;
                    break;
                }
                if (
                    !(false === strpos($line, "<items>")) ||
                    !(false === strpos($line, "</items>")) ||
                    !(false === strpos($line, "<?xml"))
                ) {
                    $counter++;
                    $bar->advance();
                    continue;
                }
                while (substr(str_replace(["\n","\r"], '', $line), -7) !== '</item>') {
                    if (!(false === strpos($line, "</items>"))) {
                        break 1;
                    }
                    $bar->advance();
                    $counter++;
                    $stopAt++;
                    $file->next();
                    $line .= $file->current();
                    if ($file->eof()) {
                        $bar->advance();
                        break 1;
                    }
                    $line = str_replace(["\n","\r"], '', $line);
                }
                $line = preg_replace('/<category>(.*)<\/category>/i', '', $line);
                $line = str_replace('$main::PROTOCOL', 'http:', $line);
                try {
                    $xmlLine = simplexml_load_string('<?xml version="1.0" encoding="utf-8"?><items>'.$line.'</items>', 'SimpleXMLElement', LIBXML_NOCDATA);
                    $chunk[] = json_decode(json_encode($xmlLine), true)['item'];
                } catch (\Exception $e) {
                    if (
                        strpos($e->getMessage(), 'parser error') ||
                        strpos($e->getMessage(), 'namespace error')
                    ) {
                        $counter++;
                        $bar->advance();
                        continue;
                    }
                    throw $e;
                }
                $counter++;
                $bar->advance();
            }

            foreach ($chunk as $k => $pricesItem) {

                if (!isset($shopsMap[$pricesItem['shop_id']]) || !isset($productsMap[$pricesItem['product_id']])) {
                    unset($chunk[$k]);
                    continue;
                }

                array_walk($pricesItem, function (&$v, $k) {
                    $v = empty($v) ? '' : $v;
                    $v = is_array($v) && $k !== '@attributes' ? null : $v;
                });

                try {
                    $chunk[$k] = '('.implode(', ', [
                            'CURRENT_TIMESTAMP',                                                                // created_at
                            'CURRENT_TIMESTAMP',                                                                // updated_at
                            DB::connection()->getPdo()->quote($pricesItem['@attributes']['id']),                // ava_id
                            DB::connection()->getPdo()->quote($pricesItem['name']),                             // name
                            DB::connection()->getPdo()->quote($pricesItem['shop_id']),                          // ava_shop_id
                            DB::connection()->getPdo()->quote($shopsMap[$pricesItem['shop_id']]),               // shop_id
                            DB::connection()->getPdo()->quote(str_replace(',', '.', $pricesItem['price'])),     // price
                            DB::connection()->getPdo()->quote($pricesItem['country']),                          // country
                            DB::connection()->getPdo()->quote($pricesItem['product_id']),                       // ava_product_id
                            DB::connection()->getPdo()->quote($productsMap[$pricesItem['product_id']]),         // product_id
                            DB::connection()->getPdo()->quote($pricesItem['product_pid']),                      // product_pid
                            DB::connection()->getPdo()->quote($pricesItem['ordering']),                         // ordering
                            DB::connection()->getPdo()->quote($pricesItem['img']),                              // img
                            DB::connection()->getPdo()->quote($pricesItem['href']),                             // href
                            DB::connection()->getPdo()->quote($pricesItem['description']),                      // description
                            DB::connection()->getPdo()->quote($parseTime),                                      // parse_time
                        ]).')';
                } catch (\Exception $e) {
                    unset($chunk[$k]);
                    continue;
                }

            }

            DB::connection()->getPdo()->exec("
                  INSERT INTO
                    prices (`created_at`, `updated_at`, `ava_id`, `name`, `ava_shop_id`, `shop_id`, `price`, `country`, `ava_product_id`, `product_id`, `product_pid`, `ordering`, `img`, `href`, `description`, `parse_time`)
                  VALUES ".implode(', ', $chunk)."
                  ON DUPLICATE KEY UPDATE
                   `updated_at` = CURRENT_TIMESTAMP,
                   `name` = VALUES(`name`),
                   `ava_shop_id` = VALUES(`ava_shop_id`),
                   `shop_id` = VALUES(`shop_id`),
                   `price` = VALUES(`price`),
                   `country` = VALUES(`country`),
                   `ava_product_id` = VALUES(`ava_product_id`),
                   `product_id` = VALUES(`product_id`),
                   `product_pid` = VALUES(`product_pid`),
                   `ordering` = VALUES(`ordering`),
                   `img` = VALUES(`img`),
                   `href` = VALUES(`href`),
                   `description` = VALUES(`description`),
                   `parse_time` = VALUES(`parse_time`)
                  ");
            $savedPrices += sizeof($chunk);
        }
        $bar->finish();
        $this->line('');
        $this->info('Total of '.$savedPrices.' prices saved');
        $this->comment('Stopped: '.date("H:i:s"));
        $this->info('Done.');

        $this->call('bazzar:removeoldprices');
        $this->call('bazzar:checkinstock');
        $this->call('bazzar:compile:prices');
    }

}
