<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarParseProductsandbrands extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:parse:productsandbrands';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parsing the list of products and brands from existing .xml file';

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

        if(!file_exists($storagePrefix.'/export_xml'.'/products.xml')) {
            $this->warn('file ' . $storagePrefix.'/export_xml'.'/products.xml' . ' does not exists, stopping.');
        }

        $this->comment('Counting lines in products.xml...');
        $file = new \SplFileObject($storagePrefix.'/export_xml'.'/products.xml');
        $totalLines = 0;
        exec("wc -l ".$storagePrefix.'/export_xml'.'/products.xml', $totalLines);
        $totalLines = (int)explode(' ', $totalLines[0])[0];
        $this->comment('Total '.$totalLines.' lines in a file products.xml');
        $this->line('');

        $this->comment('Parsing the list of Products and Brands...');
        $counter = 0;
        $chunkSize = 500;
        $completed = false;
        $presentBrands = [];
        $presentCategories = [];
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

            foreach ($chunk as $k => $productsItem) {

                array_walk($productsItem, function (&$v, $k) {
                    $v = empty($v) ? '' : $v;
                    $v = is_array($v) && $k !== '@attributes' ? null : $v;
                });

                $presentBrands[$productsItem['brand']] =
                    !isset($presentBrands[$productsItem['brand']]) ?
                        \App\Brand::firstOrCreate(
                            ['slug' => mb_strtolower(str_slug($productsItem['brand']))],
                            ['name' => $productsItem['brand'], 'slug' => mb_strtolower(str_slug($productsItem['brand']))]
                        )->id :
                        $presentBrands[$productsItem['brand']];

                $presentCategories[$productsItem['parent_id']] =
                    !isset($presentCategories[$productsItem['parent_id']]) ?
                        \App\Category::where('ava_id', $productsItem['parent_id'])->first()->id :
                        $presentCategories[$productsItem['parent_id']];

                try {
                    $chunk[$k] = '('.implode(', ', [
                            'CURRENT_TIMESTAMP',                                                                // created_at
                            'CURRENT_TIMESTAMP',                                                                // updated_at
                            DB::connection()->getPdo()->quote($productsItem['@attributes']['id']),              // ava_id
                            DB::connection()->getPdo()->quote($productsItem['name']),                           // name
                            DB::connection()->getPdo()->quote(mb_strtolower(str_slug($productsItem['name']))),  // slug
                            DB::connection()->getPdo()->quote($productsItem['parent_id']),                      // parent_id
                            DB::connection()->getPdo()->quote($presentCategories[$productsItem['parent_id']]),  // category_id
                            DB::connection()->getPdo()->quote($presentBrands[$productsItem['brand']]),          // brand_id
                            DB::connection()->getPdo()->quote($productsItem['img']),                            // img
                        ]).')';
                } catch (\Exception $e) {
                    unset($chunk[$k]);
                    continue;
                }

            }

            DB::connection()->getPdo()->exec("
                  INSERT INTO
                    products (`created_at`, `updated_at`, `ava_id`, `name`, `slug`, `parent_id`, `category_id`, `brand_id`, `img`)
                  VALUES ".implode(', ', $chunk)."
                  ON DUPLICATE KEY UPDATE
                   `updated_at` = CURRENT_TIMESTAMP,
                   `name` = VALUES(`name`),
                   `slug` = VALUES(`slug`),
                   `parent_id` = VALUES(`parent_id`),
                   `category_id` = VALUES(`category_id`),
                   `brand_id` = VALUES(`brand_id`),
                   `img` = VALUES(`img`)
                  ");
        }

        $bar->finish();
        $this->line('');
        $this->info('Done.');
    }
}
