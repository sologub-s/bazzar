<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Components\WorkuaParser;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(WorkuaParser $parser)
    {

        $s_ids = DB::table('profiles')->pluck('s_id')->all();

        //$content = $parser->getCvAsUser('Tr9qs2L8otDYM7FYNikXL1', 3963195);
        //file_put_contents('./cvContent.dat', $content);
        //die();
        $cvContent = file_get_contents('./cvContent.dat');
        //$cvContent = $parser->getCvAsUser('Tr9qs2L8otDYM7FYNikXL1', 1237159);
        //$cvContent = $parser->getCvAsUser('Tr9qs2L8otDYM7FYNikXL1', 4285611); // not found
        dd($parser->isNotFound($cvContent));
        $cvContentParsed = $parser->parseCvContent($cvContent);
        //$cvContacts = $parser->getContactsAsUser($token, $cv);
        //$cvContactsParsed = $parser->parseContactsData($cvContacts);

        echo $cvContent;

        die();
        (\App\Profile::firstOrCreate(['s_id' => $cvContentParsed['s_id']], $cvContentParsed))->fill($cvContactsParsed)->save();

        //dd($cvContactsParsed);
        $content = file_get_contents('./../cvContent.dat');
        if(isset($_GET['content'])) {
            die($content);
        }

        $parsedCvContent = $parser->parseCvContent($content);

        var_dump($parsedCvContent);
        die();
        return view('home');
    }
}
