<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\WorkuaParser;

class ParserGetContacts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parser:get:contacts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start work.ua parser to obtain contacts for the loaded CVs';

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

        $keyring = [
            [
                'login' => 'irena_green@yopmail.com',
                'password' => 'TFIFOzYp5TA',
            ],
            [
                'login' => 'isuhovigor@meta.ua',
                'password' => 'Zdc9E6lS',
            ],
        ];

        $s_ids = DB::table('profiles')->where('parsed', 0)->pluck('s_id')->toArray();
        $totalProfiles = sizeof($s_ids);
        $amountOfParsed = 0;

        $this->info('Total profiles to be parsed: ' . $totalProfiles);

        while($s_id = array_shift($s_ids)) {
            $this->line('-----------------------------------');
            if(!sizeof($keyring)) {
                $this->comment('stopping - keyring is empty');
                break;
            }

            if(!$profile = \App\Profile::where('s_id', $s_id)->first()) {
                $this->comment('skipping '.$s_id.' (has profile disappeared from the DB ?)');
                continue;
            }

            $this->info('working '.$s_id.'...');
            foreach ($keyring as $k => $creds) {
                if (!isset($creds['token'])) {
                    $this->comment('Logging in as ' . $creds['login'] . ' ...');
                    $creds['token'] = $keyring[$k]['token'] = $parser->login($creds['login'], $creds['password']);
                    $this->info('Logged in as ' . $creds['login'] . ', token is: ' . $creds['token']);
                    sleep(mt_rand(3, 7));
                }
                $this->comment("Trying to obtain contacts data with token '".$creds['token']."' of user '".$creds['login']."'...");
                $cvContacts = $parser->getContactsAsUser($creds['token'], $s_id);
                try {
                    $cvContactsParsed = $parser->parseContactsData($cvContacts);
                } catch (\Exception $e) {
                    $this->error("shit happened when trying to obtain contacts for s_id '".$s_id."': " . $e->getMessage());
                    sleep(mt_rand(5, 10));
                    continue;
                }

                if (false === $cvContactsParsed) {
                    $this->comment("got status 'bad' when trying to obtain contacts for s_id ".$s_id);
                    $this->info("removing key '".$creds['login']."' with token '".$creds['token']."' from keyring");
                    unset($keyring[$k]);
                    sleep(mt_rand(5, 10));
                    continue;
                }
                break;
            }

            if(!$cvContactsParsed) {
                continue;
            }

            $profile->fill(array_filter($cvContactsParsed, function ($v) { return is_string($v); }))->fill(['parsed' => 1])->save();
            $amountOfParsed++;
            if (isset($cvContactsParsed['exprns'])) {
                foreach($cvContactsParsed['exprns'] as $exprns) {
                    $exprns['s_id'] = $exprns['id'];
                    $exprns['start_date'] = $exprns['start_date'] == '0000-00-00' ? null : $exprns['start_date'];
                    $exprns['end_date'] = $exprns['end_date'] == '0000-00-00' ? null : $exprns['end_date'];
                    unset($exprns['id']);
                    \App\Experience::firstOrCreate(['s_id' => $exprns['s_id']], $exprns);
                }
            }

            $this->info('profile '.$s_id.' completed.');
            sleep(mt_rand(5, 10));
        }

        $this->line('-----------------------------------');

        $this->info('stopped. total profiles listed: '.$totalProfiles.', successfully parsed: '.$amountOfParsed.', not parsed profiles left: '.($totalProfiles - $amountOfParsed));

    }
}
