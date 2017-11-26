<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Components\WorkuaParser;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(WorkuaParser $parser)
    {
        return view('index/index');
    }
}
