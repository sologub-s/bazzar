<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarParseShops extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:parse:shops';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parsing the list of shops from existing .xml file';

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

        $this->comment('Parsing the list of Shops...');
        if(!file_exists($storagePrefix.'/export_xml'.'/shops.xml')) {
            $this->warn('file ' . $storagePrefix.'/export_xml'.'/shops.xml' . ' does not exists, stopping.');
        }
        $shopsXml = simplexml_load_string(file_get_contents($storagePrefix.'/export_xml'.'/shops.xml'));
        $shopsItems = json_decode(json_encode($shopsXml), true)['item'];
        $this->info('Parsed, total: '.sizeof($shopsItems));

        $this->comment('Saving the list of Shops...');
        foreach ($shopsItems as $shopsItem) {
            array_walk($shopsItem, function (&$v) {
                $v = empty($v) ? '' : $v;
            });

            DB::connection()->getPdo()->exec("
                  INSERT INTO
                    shops (`created_at`, `updated_at`, `ava_id`, `name`, `slug`, `description`, `href`, `logo`, `tel`, `country`, `city`, `address`)
                  VALUES (
                    CURRENT_TIMESTAMP,
                    CURRENT_TIMESTAMP,
                    ".DB::connection()->getPdo()->quote($shopsItem['@attributes']['id']).",
                    ".DB::connection()->getPdo()->quote($shopsItem['name']).",
                    ".DB::connection()->getPdo()->quote(mb_strtolower(str_slug($shopsItem['name']))).",
                    ".DB::connection()->getPdo()->quote($shopsItem['description']).",
                    ".DB::connection()->getPdo()->quote($shopsItem['href']).",
                    ".DB::connection()->getPdo()->quote($shopsItem['logo']).",
                    ".DB::connection()->getPdo()->quote($shopsItem['tel']).",
                    ".DB::connection()->getPdo()->quote($shopsItem['country']).",
                    ".DB::connection()->getPdo()->quote($shopsItem['city']).",
                    ".DB::connection()->getPdo()->quote($shopsItem['address'])."
                    )
                  ON DUPLICATE KEY UPDATE
                   `updated_at` = CURRENT_TIMESTAMP,
                   `name` = VALUES(`name`),
                   `slug` = VALUES(`slug`),
                   `description` = VALUES(`description`),
                   `logo` = VALUES(`logo`),
                   `logo_is_fetched` = 0,
                   `tel` = VALUES(`tel`),
                   `country` = VALUES(`country`),
                   `city` = VALUES(`city`),
                   `address` = VALUES(`address`)
                  ");
        }
        $this->info('Done.');
    }
}
