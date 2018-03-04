<?php

namespace App\Console\Commands;

use App\Addon;
use App\Product;
use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use FastSimpleHTMLDom\Document;

class BazzarFetchImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:fetch:images {--w|worker}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetching images from ava';

    protected $_imagesFolder = 'storage/products';

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

        if (!file_exists(public_path().'/'.$this->_imagesFolder)) {
            mkdir(public_path().'/'.$this->_imagesFolder, 0755, true);
        }

        if ($this->option('worker')) {
            $this->info('Worker mode is ON');
        } else {
            $this->info('Worker mode is OFF');
        }

        $totalFetched = 0;

        while(true)
        {
            $product = Product
                ::with(['addon'])
                ->where('parsed', 1)
                ->where('in_stock', 1)
                ->where('img_fetched', 0)
                ->first();
            if (!$product) {
                $this->info('No products found with parsed == 1 AND in_stock == 1 AND img_fetched == 0');
                if ($this->option('worker')) {
                    $this->comment('Sleeping for a 10 seconds before try again...');
                    sleep(10);
                    continue;
                }
                break;
            }
            $this->line('');
            $this->comment('Fetching for Product with id = '.$product->id.' ...');
            try {

                if (false !== stristr($product->img, 'ava.ua') || false !== stristr($product->img, 'ava.com.ua'))
                {
                    if (!file_exists(public_path().'/'.$this->_imagesFolder.'/'.$product->slug)) {
                        mkdir(public_path().'/'.$this->_imagesFolder.'/'.$product->slug, 0755, true);
                    }
                    $ext = explode('.', $product->img);
                    $ext = $ext[sizeof($ext) - 1];
                    $relativePath = $this->_imagesFolder.'/'.$product->slug.'/'.$product->slug.'_thumb'.'.'.$ext;
                    $filePath = public_path().'/'.$relativePath;
                    $url = str_replace(['http://','https://'], '//', url($relativePath));
                    $this->info($product->img . ' => ' . $filePath . ' @ ' . $url);
                    file_put_contents($filePath, file_get_contents_curl($product->img));
                    $product->img_org = $product->img;
                    $product->img = $url;
                    sleep(rand(2, 4));
                }

                if($images_json = json_decode($product->addon->images_json ?? null, true))
                {
                    $images_json_new = [];
                    foreach ($images_json as $k => $json_image)
                    {
                        $newArrayItem = [];
                        foreach (['normal', 'small'] as $size)
                        {
                            if (!($json_image[$size] ?? false))
                            {
                                continue;
                            }
                            $ext = explode('.', $json_image[$size]);
                            $ext = $ext[sizeof($ext) - 1];
                            $relativePath = $this->_imagesFolder.'/'.$product->slug.'/'.$product->slug.'_'.($k+1).'_'.$size.'.'.$ext;
                            $filePath = public_path().'/'.$relativePath;
                            $url = str_replace(['http://','https://'], '//', url($relativePath));
                            $this->info($json_image[$size] . ' => ' . $filePath . ' @ ' . $url);
                            file_put_contents($filePath, file_get_contents_curl($json_image[$size]));
                            $newArrayItem[$size] = $url;
                            sleep(rand(2, 4));
                        }
                        $images_json_new[] = $newArrayItem;
                    }
                    $product->addon->images_json_org = $product->addon->images_json;
                    $product->addon->images_json = json_encode($images_json_new);
                    $product->addon->save();
                }

                $product->img_fetched = 1;
                $product->save();

            } catch (\Exception $e) {
                if (false !== stristr($e->getMessage(), '404 Not Found')) {
                    $product->delete();
                } elseif (false !== stristr($e->getMessage(), 'Lock wait timeout exceeded; try restarting transaction')) {
                    // do nothing
                } elseif (false !== stristr($e->getMessage(), 'database is locked')) {
                    $errorMessage = 'product # '.$product->id.' : '.$e->getMessage();
                    $this->error($errorMessage);
                } else {
                    $errorMessage = 'product # '.$product->id.' : unknown : '.$e->getMessage();
                    $this->error($errorMessage);
                    mail('zeitgeist1988@gmail.com', 'FetchImages error', $errorMessage);
                }

            }
            $totalFetched++;
            if (!$this->option('worker')) {
                break;
            } else {
                $this->line('');
                $this->info('Total fetched since starting: ' . $totalFetched);
            }
        }
        $this->info('Done.');
    }
}
