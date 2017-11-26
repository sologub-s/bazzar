<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\WorkuaParser;

class ParserGetProfiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parser:get:profiles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start work.ua parser to obtain a list of profiles';

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
        $listUrl = 'https://www.work.ua/resumes-odesa/';

        set_time_limit(0);

        $totalPages = $parser->getTotalPages($listUrl);
        $totalPages = 1;
        $this->info('Total pages: ' . $totalPages);
        sleep(4);

        $this->comment('Collecting the list of CVs:');
        $curpageBar = $this->output->createProgressBar($totalPages);
        $curpageBar->start();

        $alreadyPresentSids = DB::table('profiles')->pluck('s_id')->all();
        $cvs = [];

        for($i = 1; $i <= $totalPages; $i++) {
            $cvs = array_values(array_filter(array_unique(array_merge($cvs, $parser->getCvsFromPage($listUrl, $i))), function($v) use ($alreadyPresentSids) {
                return !in_array($v, $alreadyPresentSids);
            }));
            sleep(mt_rand(3, 7));
            $curpageBar->advance();
        }
        $curpageBar->finish();

        $this->line('');
        $totalCvs = sizeof($cvs);
        $this->info('Found ' . $totalCvs . ' CVs from ' . $totalPages . ' pages');

        $this->comment('Traversing the list of CVs:');
        $cvsBar = $this->output->createProgressBar(sizeof($cvs));
        $cvsBar->start();

        $skipped = [
            'notfound' => [],
        ];

        foreach($cvs as $cv) {
            $cvContent = $parser->getCv($cv);
            if($parser->isNotFound($cvContent)) {
                array_push($skipped['notfound'], $cv);
                sleep(mt_rand(5, 10));
                continue;
            }
            $cvContentParsed = $parser->parseCvContent($cvContent);
            $profile = \App\Profile::firstOrCreate(['s_id' => $cvContentParsed['s_id']], array_merge(array_filter($cvContentParsed, function ($v) { return !is_array($v); }), ['full_page' => $cvContent]));

            $positionsIds = [];
            while (isset($cvContentParsed['positions']) && $name = array_shift($cvContentParsed['positions'])) {
                $name = ucfirst($name);
                $nameLowercase = mb_strtolower($name);
                array_push($positionsIds, (\App\Position::firstOrCreate(['name_lowercase' => $nameLowercase], ['name' => $name, 'name_lowercase' => $nameLowercase]))->id);
            }
            if(sizeof($positionsIds)) {
                $profile->positions()->attach(array_unique($positionsIds));
            }
            sleep(mt_rand(5, 10));
            $cvsBar->advance();
        }

        $cvsBar->finish();

        $this->line('');
        $this->info("Total " . $totalCvs . " new CVs found, " . sizeof($skipped['notfound']) . " skipped due to 'notfound' reason, ".($totalCvs - sizeof($skipped['notfound']))." added to DB");
        $this->line('');

        //echo $parser->getCvAsUser($token, '3508137');
    }
}
