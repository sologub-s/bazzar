<?php

namespace App\Console\Commands;

use Config;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class BazzarCountTags extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:count:tags';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Count amount of posts related to each tag';

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
    public function handle()
    {

        $counts = DB::connection()->getPdo()->query("SELECT tag_id, COUNT(*) AS count FROM post_tag GROUP BY tag_id")->fetchAll();
        array_walk($counts, function (&$v) {
            $v = "WHEN ".(int) $v['tag_id']." THEN ".$v['count'];
        });
        DB::connection()->getPdo()->exec("
              UPDATE tags
                SET
                    `total` = CASE `id` ".implode(' ', $counts)." ELSE 0 END
                ");
    }
}