<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarDownload extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:download';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Downloads fresh .tar.gz';

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

        $this->comment('Downloading export file...');
        file_put_contents($storagePrefix.'/export_xml.tar.gz', file_get_contents('http://ava.com.ua/export/1402/630/export_xml.tar.gz'));

        /*
        $this->comment('Decompressing...');
        $p = new \PharData($storagePrefix.'/export_xml.tar.gz');
        $p->decompress();
        $this->comment('Extracting...');
        $p = new \PharData($storagePrefix.'/export_xml.tar');
        $p->extractTo($storagePrefix.'/export_xml');
        */

        /**
         * https://bugs.php.net/bug.php?id=75101
         */
        if (!file_exists(Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix().'/export_xml')) {
            mkdir(Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix().'/export_xml', 0775, true);
        }
        exec('tar -xvf '.Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix().'/'.'export_xml.tar.gz -C '.Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix().'/export_xml');

        $this->info('Done.');
    }
}
