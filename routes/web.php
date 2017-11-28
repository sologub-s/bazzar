<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
Route::get('/', function () {
    return view('welcome');
});
*/

Auth::routes();

Route::get('/', 'IndexController@index')->name('index_index');

Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'before' => 'admin'], function()
{
    // only /admin/ routes in here that will be in a namespace folder of "backend" with admin middleware
    //Route::resource('pages', 'PagesController'); // app/Http/controllers/backend/PagesController.php

    Route::get('/', 'IndexController@index')->name('admin_home');

});

//Route::get('/home', 'HomeController@index')->name('home');
