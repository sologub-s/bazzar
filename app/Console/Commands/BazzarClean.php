<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BazzarClean extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Removes old .tar.gz and folder';

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

        $this->comment('Cleaning out...');
        File::deleteDirectory($storagePrefix.'/export_xml');
        File::delete($storagePrefix.'/export_xml.tar.gz');
        File::delete($storagePrefix.'/export_xml.tar');
        $this->info('Done.');
    }
}
