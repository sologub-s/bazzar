<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarCreatecategoriestree extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:createcategoriestree';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parsing the categories tree from http://ava.ua/categories/';

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

        try {
            $this->comment('Creating Categories tree...');
            $url = 'http://ava.ua/categories/';
            $this->parseFromPage($url);
            $brokenCategories = DB::connection()->getPdo()->query("SELECT c1.ava_id, c2.id FROM categories c1 LEFT JOIN categories c2 ON (c1.id = c2.parent_id) WHERE c1.parent_id = 0 AND c2.id IS NULL AND c1.broken = 0")->fetchAll();
            $values =[];
            $inIds = [];
            $this->line('Discovering deep categories...');
            $bar = $this->output->createProgressBar(sizeof($brokenCategories));
            $bar->start();
            $missing = 0;
            $avaIdToId = $this->getAvaIdToId();
            foreach ($brokenCategories as $brokenCategory) {
                $url = get_location_curl('http://ava.ua/category/'.$brokenCategory['ava_id'].'/');
                if (false === $url) {
                    DB::connection()->getPdo()->exec("UPDATE categories SET `active` = 0, `broken` = 1 WHERE ava_id = ".(int)$brokenCategory['ava_id']);
                    $missing++;
                    $bar->advance();
                    sleep(rand(1, 3));
                    continue;
                }
                if (true === $url) {
                    DB::connection()->getPdo()->exec("UPDATE categories SET `active` = 1, `broken` = 0 WHERE ava_id = ".(int)$brokenCategory['ava_id']);
                    $this->parseFromPage('http://ava.ua/category/'.$brokenCategory['ava_id'].'/');
                    $bar->advance();
                    sleep(rand(1, 3));
                    continue;
                }
                $parentId = [];
                preg_match_all('/\d+/i', $url, $parentId);
                $values[] = "WHEN ".(int)$brokenCategory['ava_id']." THEN ".$avaIdToId[(string)$parentId[0][sizeof($parentId[0])-2]];
                $inIds[] = (int)$brokenCategory['ava_id'];
                $bar->advance();
                sleep(rand(1, 3));
            }
            $bar->finish();
            $this->line('');
            unset($brokenCategories);
            $this->performUpdate(array_unique($values), array_unique($inIds));
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            mail('zeitgeist1988@gmail.com', 'Createcategoriestree error', $e->getMessage());
        }

        $this->info('Missing categories: '.$missing);
        $this->info('Done.');
    }

    protected function parseFromPage($url) {
        //$this->line('Parsing from page '.$url);
        $content = file_get_contents_curl($url);
        $matches = [];
        preg_match_all('/\/category\/([0-9\/])+/i', $content, $matches);
        unset($content);
        $values = [];
        $inIds = [];
        $avaIdToId = $this->getAvaIdToId();
        foreach($matches[0] as $match) {
            $ids = [];
            preg_match_all('/\d+/i', $match, $ids);
            foreach ($ids[0] as $k => $id) {
                if ($k == 0) {
                    continue;
                }
                $values[] = "WHEN ".(int)$id." THEN ".$avaIdToId[(string)$ids[0][$k-1]];
                $inIds[] = (int) $id;
            }
        }
        $this->performUpdate(array_unique($values), array_unique($inIds));
    }

    protected function getAvaIdToId() {
        $categories = DB::connection()->getPdo()->query("SELECT id, ava_id FROM categories")->fetchAll();
        $avaIdToId = [];
        foreach($categories as $k => $category) {
            $avaIdToId[$category['ava_id']] = $category['id'];
        }
        return $avaIdToId;
    }

    protected function performUpdate ($values, $ids) {
        if (sizeof($values) == 0 || sizeof($ids) == 0) {
            return;
        }
        DB::connection()->getPdo()->exec("
              UPDATE categories
                SET
                    `updated_at` = CURRENT_TIMESTAMP, 
                    `parent_id` = CASE `ava_id` ".implode(' ', $values)." ELSE 0 END,
                    `active` = 1,
                    `broken` = 0
                WHERE `ava_id` IN (".implode(', ', $ids).")
                ");
    }
}
