<?php

namespace App\Console\Commands;

use App\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarCategoriesimages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:categoriesimages';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign images for categories';

    protected $_defaultImage = 'http://ava.com.ua/img/logo_non_100.gif';

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

        $this->comment('Fetching grouped list of products...');
        DB::connection()->getPdo()->exec("SET SESSION sql_mode = ''");
        $products = DB::connection()->getPdo()->query("
          SELECT p.id, p.category_id, a.images_json 
          FROM `products` p
          LEFT JOIN `addons` a
          ON (p.id = a.product_id)
          WHERE
            p.`active` = 1
            AND
            p.`in_stock` = 1
            AND
            p.`broken` = 0
            AND
            a.images_json IS NOT NULL
          GROUP BY p.category_id
        ")->fetchAll();
        $this->info('Fetched.');
        $this->comment('Updating categories...');
        $bar = $this->output->createProgressBar(sizeof($products));
        $bar->start();
        foreach($products as $product) {
            $img = json_decode($product['images_json'], true)[0]['normal'] ?? null;
            $this->updateCategoryAndAncestors($product['category_id'], $img);
            $bar->advance();
        }
        $bar->finish();
        $this->line('');
        $this->info('Updated.');
        $this->comment('Updating missed categories...');
        DB::connection()->getPdo()->exec("UPDATE categories SET img = ".DB::connection()->getPdo()->quote($this->_defaultImage)." WHERE img IS NULL OR img = ''");
        $this->info('Done.');
    }

    protected function updateCategoryAndAncestors($category_id, $img) {
        if (!$img) {
            return;
        }
        $category = Category::find($category_id);
        $category->img = $img;
        $category->save();
        if ($category->parent_id) {
            $this->updateCategoryAndAncestors($category->parent_id, $img);
        }
    }
}
