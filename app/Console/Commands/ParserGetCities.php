<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\WorkuaParser;

class ParserGetCities extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parser:get:cities';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start work.ua parser to obtain a list of cities';

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
    public function handle(WorkuaParser $parser)
    {
        set_time_limit(0);

        $this->comment('Obtaining list of regions...');
        $regions = $parser->getRegions();
        $this->info('Total regions obtained: '.sizeof($regions));
        sleep(2);

        foreach ($regions as $region) {
            $regionModel = \App\Region::firstOrCreate(['name' => $region['name']], $region);
            foreach($region['cities'] as $city) {
                $city['region_id'] = $regionModel->id;
                \App\City::firstOrCreate(['href' => $city['href']], $city);
                $this->line("City '".$city['name']."' with region_id '".$city['region_id']."'");
            }
        }
    }
}
