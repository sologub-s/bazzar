<?php

namespace App\Console\Commands;

use App\Brand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use FastSimpleHTMLDom\Document;

class BazzarCronExport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:cron:export {--i|interval=7200}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Doing bazzar:workflow:all repeatedly but not more often then once per {interval} seconds';

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

        $interval = (int)abs($this->option('interval'));
        $this->line('Starting to repeat bazzar:workflow:all with minimum interval of '.$interval.' seconds...');

        while (true) {
            $startTime = time();
            $this->line('--------------------------------------------------');
            $this->line('Starting workflow (timestamp: '.$startTime.')...');
            mail('zeitgeist1988@gmail.com', 'CronExport - starting workflow', 'CronExport - starting workflow');
            try {
                $this->call('bazzar:workflow:all');
            } catch (\Exception $e) {
                $this->line('');
                $this->error($e->getMessage());
                $this->error($e->getTraceAsString());
                $this->line('');
                mail('zeitgeist1988@gmail.com', 'CronExport error', $e->getMessage());
            }
            $endTime = time();
            $this->line('Workflow completed (timestamp: '.$endTime.')');

            $timeSpent = $endTime - $startTime;
            if ($timeSpent < $interval) {
                $this->line('Waiting ' . ($interval - $timeSpent) . ' seconds before next start.');
                sleep($interval - $timeSpent);
            } else {
                $this->line('Last execution took  ' . ($timeSpent - $interval) . ' seconds longer than interval so next start is right now..');
            }
        }

        $this->info('Terminated.');
    }
}
