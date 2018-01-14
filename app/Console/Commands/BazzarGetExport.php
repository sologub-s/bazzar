<?php

namespace App\Console\Commands;

use App\Price;
use App\Product;
use App\Shop;
use App\Category;
use Illuminate\Console\Command;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;

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
                    $pricesItem['shop_id'] = Shop::where('ava_id', $pricesItem['ava_shop_id'])->first()->id;

                    $pricesItem['price'] = str_replace(',', '.', $pricesItem['price']);

                    foreach (['name','img','href','description'] as $v) {
                        $pricesItem[$v] = is_array($pricesItem[$v]) ? null : $pricesItem[$v];
                    }

                    if (!$pricesItem['product_id']) {
                        $missedProductIds[] = $pricesItem;
                        continue;
                    }

                    $pricesItem['ava_product_id'] = $pricesItem['product_id'];
                    $pricesItem['product_id'] = Product::where('ava_id', $pricesItem['ava_product_id'])->first()->id;

                    Price::firstOrCreate(['ava_id' => $pricesItem['ava_id']], $pricesItem);
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
            $pricesItem['shop_id'] = Category::where('ava_id', $pricesItem['ava_shop_id'])->first()->id;

            $pricesItem['ava_product_id'] = $pricesItem['product_id'];
            $pricesItem['product_id'] = Category::where('ava_id', $pricesItem['ava_product_id'])->first()->id;

            Price::firstOrCreate(['ava_id' => $pricesItem['ava_id']], $pricesItem);
            $bar->advance();
        }
        $bar->finish();
        $this->line('');
        $this->info('Saved');
    }
}
