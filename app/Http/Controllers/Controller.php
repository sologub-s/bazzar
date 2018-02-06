<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use App\Product;

use App\Category;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $categoriesList = [];
    public $categoriesTree = [];

    public function __construct()
    {

        $this->categoriesList = View::shared('categoriesList');
        $this->categoriesTree = View::shared('categoriesTree');
            View::share('inCompare', session('compare', []));

    }
}
