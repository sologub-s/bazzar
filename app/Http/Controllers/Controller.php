<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\View;

use App\Category;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $categoriesList = [];
    public $categoriesTree = [];

    public function __construct()
    {

        $this->categoriesList = Category::with(['categories'])->where('broken', 0)->get()->toArray();
        $this->categoriesTree = Category::createTree($this->categoriesList);

        View::share('categoriesList', $this->categoriesList);
        View::share('categoriesTree', $this->categoriesTree);
    }
}
