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

Auth::routes();
// OAuth Routes
Route::get('auth/{provider}', 'Auth\LoginController@redirectToProvider')->name('social_redirect');
Route::get('auth/{provider}/callback', 'Auth\LoginController@handleProviderCallback')->name('social_callback');

Route::get('/', 'IndexController@index')->name('index_index');

Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['role:Admin']], function()
{
    // only /admin/ routes in here that will be in a namespace folder of "backend" with admin middleware
    //Route::resource('pages', 'PagesController'); // app/Http/controllers/backend/PagesController.php

    Route::get('/', 'IndexController@index')->name('admin_home');

    Route::get('products', 'ProductsController@index')->name('admin_products');
    Route::post('products/toggle/active/{id}', 'ProductsController@toggleActive')->name('admin_products_toggle_active');
    Route::get('products/{id}', 'ProductsController@edit')->name('admin_products_edit');
    Route::post('products/{id}', 'ProductsController@editHandler')->name('admin_products_edit_handler');

    Route::get('users', 'UsersController@index')->name('admin_users');
    Route::post('users/toggle/admin/{id}', 'UsersController@toggleAdmin')->name('admin_users_toggle_admin');
    Route::post('users/toggle/banned/{id}', 'UsersController@toggleBanned')->name('admin_users_toggle_banned');

    Route::get('posts', 'PostsController@index')->name('admin_posts');
    Route::get('posts/add', 'PostsController@add')->name('admin_posts_add');
    Route::post('posts/add', 'PostsController@addHandler')->name('admin_posts_add_handler');
    Route::get('posts/{id}', 'PostsController@edit')->name('admin_posts_edit');
    Route::post('posts/{id}', 'PostsController@editHandler')->name('admin_posts_edit_handler');
    Route::get('posts/delete/{id}', 'PostsController@deleteHandler')->name('admin_posts_delete_handler');
    Route::post('posts/toggle/active/{id}', 'PostsController@toggleActive')->name('admin_posts_toggle_active');

    Route::get('tags/source', 'TagsController@source')->name('admin_tags_source');

    Route::get('categories', 'CategoriesController@index')->name('admin_categories');
    Route::post('categories/{id}', 'CategoriesController@editHandler')->name('admin_categories_edit_handler');
    Route::get('categories/saveterms/{id}', 'CategoriesController@savetermsHandler')->name('admin_categories_saveterms_handler');

    Route::get('contentblocks', 'ContentblocksController@index')->name('admin_contentblocks');
    Route::get('contentblocks/add', 'ContentblocksController@add')->name('admin_contentblocks_add');
    Route::post('contentblocks/add', 'ContentblocksController@addHandler')->name('admin_contentblocks_add_handler');
    Route::get('contentblocks/{id}', 'ContentblocksController@edit')->name('admin_contentblocks_edit');
    Route::post('contentblocks/{id}', 'ContentblocksController@editHandler')->name('admin_contentblocks_edit_handler');
    Route::get('contentblocks/delete/{id}', 'ContentblocksController@deleteHandler')->name('admin_contentblocks_delete_handler');
    Route::post('contentblocks/toggle/active/{id}', 'ContentblocksController@toggleActive')->name('admin_contentblocks_toggle_active');
});

Route::group(['prefix' => 'user',], function()
{
    Route::get('profile', 'UsersController@profile')->name('users_profile');
    Route::post('profile', 'UsersController@profileHandler')->name('users_profile_handler');

    Route::get('password', 'UsersController@password')->name('users_password');
    Route::post('password', 'UsersController@passwordHandler')->name('users_password_handler');
    Route::post('password/setup', 'UsersController@passwordSetup')->name('users_password_setup');
});