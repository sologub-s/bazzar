<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use FastSimpleHTMLDom\Document;

class BazzarParseAdditional extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:parse:additional {--w|worker} {--cs|chunksize=100}';

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

        if ($this->option('worker')) {
            $this->info('Worker mode is ON');
            $this->info('Parsing all items with parsed == 0, '.(int)abs($this->option('chunksize')).' per time...');
        } else {
            $this->info('Worker mode is OFF');
            $this->info('Parsing '.(int)abs($this->option('chunksize')).' items and then stop...');
        }

        $totalParsed = 0;

        while(true)
        {
            $products = \App\Product::where('parsed', 0)/*->where('in_stock', 1)*/->limit((int)abs($this->option('chunksize')))->get();
            if (!sizeof($products)) {
                $this->info('No products found with parsed == 0');
                if ($this->option('worker')) {
                    $this->comment('Sleeping for a 10 seconds before try again...');
                    sleep(10);
                    continue;
                }
                break;
            }
            $this->comment('Parsing chunk of '.sizeof($products).' items...');
            $bar = $this->output->createProgressBar(sizeof($products));
            $bar->start();
            foreach($products as $k => $product) {
                sleep(rand(3, 7));
                try {
                    $url = 'http://ava.ua/product/'.$product->ava_id.'/'.$product->slug.'/';
                    $content = file_get_contents_curl($url);
                    $html = new Document($content);
                    unset($content);

                    $data = [];
                    try {
                        $trs = [];
                        if(!empty((array)$html->find('tbody#properties'))) {
                            $trs = (array) $html->find('tbody#properties')[0]->children();
                        }
                        $dataIndex = -1;
                        while(sizeof($trs) > 0) {
                            $item = array_shift($trs);
                            if (isset($item->style)) {
                                continue;
                            }
                            if (!isset($item->class)) {
                                $dataIndex++;
                                $data[$dataIndex] = [];
                                $data[$dataIndex]['group'] = str_replace(["\n","\r"], '', trim($item->find('h3')->plaintext));
                                $data[$dataIndex]['properties'] = [];
                                continue;
                            }
                            $data[$dataIndex]['group'] = isset($data[$dataIndex]['group']) ? $data[$dataIndex]['group'] : 'Основные характеристики';
                            $data[$dataIndex]['properties'] = isset($data[$dataIndex]['properties']) ? $data[$dataIndex]['properties'] : [];
                            array_push($data[$dataIndex]['properties'], ['name' => str_replace(["\n","\r"], '', trim($item->find('th')->plaintext)), 'value' => str_replace(["\n","\r"], '', trim($item->find('td')->plaintext))]);
                        }
                    } catch (\Exception $e) {
                        $this->error('product # '.$product->id.' @ '.$url.' : properties : '.$e->getMessage());
                    }

                    $description = '';
                    try {
                        $descriptionNode = $html->find('table.characteristics');
                        if(!empty((array)$descriptionNode)) {
                            $description = $descriptionNode[0]->find('td')[0]->innertext;
                        }
                    } catch (\Exception $e) {
                        $this->error('product # '.$product->id.' @ '.$url.' : description : '.$e->getMessage());
                    }

                    unset($html);

                    sleep(1);
                    $images = [];
                    $imagesUrl = 'http://ava.ua/zoom/'.$product->ava_id.'/?image=0';
                    $imagesContent = file_get_contents_curl($imagesUrl);
                    $imagesHtml = new Document($imagesContent);
                    unset($imagesContent);
                    if(!empty((array)$imagesHtml->find('a.img_pas'))) {
                        foreach((array)$imagesHtml->find('a.img_pas') as $item) {
                            $matches = [];
                            preg_match("/'(.*)'/i", $item->getAttribute('style'), $matches);
                            $images[] = [
                                'normal' => $item->getAttribute('data-img'),
                                'small' => isset($matches[1]) ? $matches[1] : null,
                            ];
                        }
                    }
                    unset($imagesHtml);

                    try {
                        $product->fill([
                            'properties_json' => json_encode($data, JSON_UNESCAPED_UNICODE),
                            'parsed' => 1,
                            'description' => $description,
                            'images_json' => json_encode($images, JSON_UNESCAPED_UNICODE),
                        ])->save();
                    } catch (\Exception $e) {
                        //$this->error('product # '.$product->id.' @ '.$url.' : save : '.$e->getMessage());
                    }

                } catch (\Exception $e) {
                    if (false !== stristr($e->getMessage(), '404 Not Found')) {
                        $product->delete();
                    } elseif (false !== stristr($e->getMessage(), 'Lock wait timeout exceeded; try restarting transaction')) {
                        // do nothing
                    } else {
                        $errorMessage = 'product # '.$product->id.' @ '.$url.' : unknown : '.$e->getMessage();
                        $this->error($errorMessage);
                        mail('zeitgeist1988@gmail.com', 'ParseAdditional error', $errorMessage);
                    }

                }

                $bar->advance();
                $totalParsed++;
                unset($products[$k]);
            }
            $bar->finish();
            $this->line('');
            if (!$this->option('worker')) {
                break;
            } else {
                $this->line('');
                $this->info('Total parsed since starting: ' . $totalParsed);
            }
        }
        $this->info('Done.');
    }
}
