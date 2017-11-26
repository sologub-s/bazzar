<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarGetExport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:get:export';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start ava parser to download export file';

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
        $storagePrefix = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix();

        /*
        $this->comment('Cleaning out...');
        File::deleteDirectory($storagePrefix.'/export_xml');
        File::delete($storagePrefix.'/export_xml.tar.gz', $storagePrefix.'/export_xml.tar');

        $this->comment('Downloading export file...');
        file_put_contents($storagePrefix.'/export_xml.tar.gz', file_get_contents('http://ava.com.ua/export/1402/630/export_xml.tar.gz'));

        $this->comment('Decompressing...');
        $p = new \PharData($storagePrefix.'/export_xml.tar.gz');
        $p->decompress();
        $this->comment('Extracting...');
        $p = new \PharData($storagePrefix.'/export_xml.tar');
        $p->extractTo($storagePrefix.'/export_xml');
        */

        /*
        $this->comment('Parsing the list of Shops...');
        $shopsXml = simplexml_load_string(file_get_contents($storagePrefix.'/export_xml'.'/shops.xml'));
        $shopsItems = json_decode(json_encode($shopsXml), true)['item'];
        $this->info('Parsed, total: '.sizeof($shopsItems));

        $this->comment('Saving the list of Shops...');
        foreach ($shopsItems as $shopsItem) {
            $shopsItem['ava_id'] = $shopsItem['@attributes']['id'];
            array_walk($shopsItem, function (&$v) {
                $v = empty($v) ? '' : $v;
            });

            //\App\Shop::updateOrCreate(['ava_id' => $shopsItem['ava_id']], $shopsItem);
            \App\Shop::firstOrCreate(['ava_id' => $shopsItem['ava_id']], $shopsItem);
        }
        $this->info('Saved');

        $this->comment('Parsing the list of Categories...');
        $categoriesXml = simplexml_load_string(file_get_contents($storagePrefix.'/export_xml'.'/categories.xml'));
        $categoriesItems = json_decode(json_encode($categoriesXml), true)['item'];
        $this->info('Parsed, total: '.sizeof($categoriesItems));

        $this->comment('Saving the list of Categories...');
        foreach ($categoriesItems as $categoriesItem) {
            $categoriesItem['ava_id'] = $categoriesItem['@attributes']['id'];
            array_walk($categoriesItem, function (&$v) {
                $v = empty($v) ? '' : $v;
            });

            \App\Category::firstOrCreate(['ava_id' => $categoriesItem['ava_id']], $categoriesItem);
        }
        $this->info('Saved');

        $this->comment('Parsing the list of Products and Brands...');
        $productsXml = simplexml_load_string(file_get_contents($storagePrefix.'/export_xml'.'/products.xml'));
        $productsItems = json_decode(json_encode($productsXml), true)['item'];
        $this->info('Parsed, total: '.sizeof($productsItems));

        $this->comment('Saving the list of Products and Brands...');
        $bar = $this->output->createProgressBar(sizeof($productsItems));
        $bar->start();
        foreach ($productsItems as $productsItem) {

            $productsItem['ava_id'] = $productsItem['@attributes']['id'];

            array_walk($productsItem, function (&$v) {
                $v = empty($v) ? '' : $v;
            });

            $brand = \App\Brand::firstOrCreate(['name' => $productsItem['brand']], ['name' => $productsItem['brand']]);
            $productsItem['brand_id'] = $brand->id;
            $productsItem['category_id'] = \App\Category::where('ava_id', $productsItem['parent_id'])->first()->id;

            \App\Product::firstOrCreate(['ava_id' => $productsItem['ava_id']], $productsItem);
            $bar->advance();
        }
        $bar->finish();
        $this->line('');
        $this->info('Saved');

        */

        $this->comment('Parsing the list of Prices...');

        $file = new \SplFileObject($storagePrefix.'/export_xml'.'/prices.xml');
        $counter = 0;
        $completed = false;
        $missedProductIds =[];
        while(!$completed) {
            $chunk = '';
            $stopAt = $counter + 100;
            while($counter <= $stopAt) {
                $this->line('Reading line ' . $counter);
                $file->seek($counter);
                $line = $file->current();
                if (strpos($line, "</items")) {
                    $completed = true;
                    break;
                }
                if (
                    !(false === strpos($line, "<items>")) ||
                    !(false === strpos($line, "</items>")) ||
                    !(false === strpos($line, "<?xml"))
                ) {
                    $counter++;
                    continue;
                }
                while (substr(str_replace(["\n","\r"], '', $line), -7) !== '</item>') {
                    $this->warn('Abnormal line end, concatenating the next line...');
                    $this->warn(substr(str_replace(["\n","\r"], '', $line), -7));
                    $counter++;
                    $stopAt++;
                    $file->seek($counter);
                    $line .= $file->current();
                    $line = str_replace(["\n","\r"], '', $line);
                }
                $chunk .= $line;
                $counter++;
            }
            if (empty($chunk)) {
                continue;
            }
            $chunk = '<?xml version="1.0" encoding="utf-8"?><items>'.$chunk.'</items>';
            $pricesXml = simplexml_load_string($chunk, 'SimpleXMLElement', LIBXML_NOCDATA);
            $pricesItems = json_decode(json_encode($pricesXml), true)['item'];
            $this->comment('Saving the chunk of Prices...');
            $bar = $this->output->createProgressBar(sizeof($pricesItems));
            $bar->start();
            foreach ($pricesItems as $pricesItem) {

                try {
                    $pricesItem['ava_id'] = $pricesItem['@attributes']['id'];

                    array_walk($pricesItem, function (&$v) {
                        $v = empty($v) ? '' : $v;
                    });

                    $pricesItem['ava_shop_id'] = $pricesItem['shop_id'];
                    $pricesItem['shop_id'] = \App\Shop::where('ava_id', $pricesItem['ava_shop_id'])->first()->id;

                    $pricesItem['price'] = str_replace(',', '.', $pricesItem['price']);

                    foreach (['name','img','href','description'] as $v) {
                        $pricesItem[$v] = is_array($pricesItem[$v]) ? null : $pricesItem[$v];
                    }

                    if (!$pricesItem['product_id']) {
                        $missedProductIds[] = $pricesItem;
                        continue;
                    }

                    $pricesItem['ava_product_id'] = $pricesItem['product_id'];
                    $pricesItem['product_id'] = \App\Product::where('ava_id', $pricesItem['ava_product_id'])->first()->id;

                    \App\Price::firstOrCreate(['ava_id' => $pricesItem['ava_id']], $pricesItem);
                } catch (\Exception $e) {
                    dd($pricesItem, $e->getMessage());
                }

                $bar->advance();
            }
            $bar->finish();
            $this->line('');
            $this->info('Chunk of prices saved');
        }

        $this->line('');
        $this->info('All prices saved, items with empty(product_id) found: '.sizeof($missedProductIds));
        die();




        $pricesXml = simplexml_load_string(file_get_contents($storagePrefix.'/export_xml'.'/prices.xml'));
        $pricesItems = json_decode(json_encode($pricesXml), true)['item'];
        $this->info('Parsed, total: '.sizeof($pricesItems));

        $this->comment('Saving the list of Prices...');
        $bar = $this->output->createProgressBar(sizeof($pricesItems));
        $bar->start();
        foreach ($pricesItems as $pricesItem) {

            $pricesItem['ava_id'] = $pricesItem['@attributes']['id'];

            array_walk($pricesItem, function (&$v) {
                $v = empty($v) ? '' : $v;
            });

            $pricesItem['ava_shop_id'] = $pricesItem['shop_id'];
            $pricesItem['shop_id'] = \App\Category::where('ava_id', $pricesItem['ava_shop_id'])->first()->id;

            $pricesItem['ava_product_id'] = $pricesItem['product_id'];
            $pricesItem['product_id'] = \App\Category::where('ava_id', $pricesItem['ava_product_id'])->first()->id;

            \App\Price::firstOrCreate(['ava_id' => $pricesItem['ava_id']], $pricesItem);
            $bar->advance();
        }
        $bar->finish();
        $this->line('');
        $this->info('Saved');
    }
}
