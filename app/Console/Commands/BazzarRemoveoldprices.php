<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use FastSimpleHTMLDom\Document;

class BazzarRemoveoldprices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:removeoldprices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Removing prices that are not related to any product or shop';

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

        $this->comment('Deleting prices with empty relations...');

        DB::connection()->getPdo()->exec("
            DELETE
              prices
            FROM
              prices
            LEFT JOIN
              products ON (prices.product_id = products.id)
            LEFT JOIN
              shops ON (prices.shop_id = shops.id)
            WHERE
              products.id IS NULL
              OR
              shops.id IS NULL
              ");

        $this->comment('Deleting prices that were not present in the last import...');

        $maxParseTime = DB::connection()->getPdo()->query("SELECT MAX(parse_time) AS max_parse_time FROM prices")->fetch()['max_parse_time'];

        DB::connection()->getPdo()->exec("DELETE FROM prices WHERE parse_time < " . DB::connection()->getPdo()->quote($maxParseTime));

        $this->info('Done.');

    }
}
