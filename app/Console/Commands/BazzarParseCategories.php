<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarParseCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:parse:categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parsing the list of categories from existing .xml file';

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

        $this->comment('Parsing the list of Categories...');
        if(!file_exists($storagePrefix.'/export_xml'.'/categories.xml')) {
            $this->warn('file ' . $storagePrefix.'/export_xml'.'/categories.xml' . ' does not exists, stopping.');
        }
        $categoriesXml = simplexml_load_string(file_get_contents($storagePrefix.'/export_xml'.'/categories.xml'));
        $categoriesItems = json_decode(json_encode($categoriesXml), true)['item'];
        $this->info('Parsed, total: '.sizeof($categoriesItems));

        $this->comment('Saving the list of Categories...');
        foreach ($categoriesItems as $categoriesItem) {
            array_walk($categoriesItem, function (&$v) {
                $v = empty($v) ? '' : $v;
            });

            DB::connection()->getPdo()->exec("
                  INSERT INTO
                    categories (`created_at`, `updated_at`, `ava_id`, `name`, `slug`)
                  VALUES (
                    CURRENT_TIMESTAMP,
                    CURRENT_TIMESTAMP,
                    ".DB::connection()->getPdo()->quote($categoriesItem['@attributes']['id']).",
                    ".DB::connection()->getPdo()->quote($categoriesItem['name']).",
                    ".DB::connection()->getPdo()->quote(slug($categoriesItem['name']))." 
                    )
                  ON DUPLICATE KEY UPDATE
                   `updated_at` = CURRENT_TIMESTAMP,
                   `name` = VALUES(`name`),
                   `slug` = VALUES(`slug`)
                  ");
        }
        $this->info('Done.');

        $this->call('bazzar:createcategoriestree');
    }
}
