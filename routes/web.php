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

Route::get('/', 'IndexController@index')->name('mainpage');
Route::get('/err/{code}', 'IndexController@error')->name('error');

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

    Route::get('settings', 'SettingsController@index')->name('admin_settings');
    Route::match(['get', 'post'], 'settings/edit/{id?}', 'SettingsController@edit')->name('admin_settings_edit');

    Route::get('menulinks', 'MenulinksController@index')->name('admin_menulinks');
    Route::post('menulinks/edit/handler/{id?}', 'MenulinksController@editHandler')->name('admin_menulinks_edit_handler');
    Route::match(['get', 'post'], 'menulinks/delete/{id}', 'MenulinksController@delete')->name('admin_menulinks_delete');
    Route::match(['get', 'post'], 'menulinks/edit/{id?}', 'MenulinksController@edit')->name('admin_menulinks_edit');
    Route::post('menulinks/toggle/active/{id}', 'MenulinksController@toggleActive')->name('admin_menulinks_toggle_active');
    Route::match(['get','post'], 'menulinks/move/{direction}/{id}', 'MenulinksController@move')->name('admin_menulinks_move');

});

Route::group(['prefix' => 'user',], function()
{
    Route::get('profile', 'UsersController@profile')->name('users_profile');
    Route::post('profile', 'UsersController@profileHandler')->name('users_profile_handler');
    Route::get('favourites', 'UsersController@favourites')->name('users_favourites');
    Route::post('favourites/toggle', 'UsersController@favouritesToggle')->name('users_favourites_toggle');

    Route::get('password', 'UsersController@password')->name('users_password');
    Route::post('password', 'UsersController@passwordHandler')->name('users_password_handler');
    Route::post('password/setup', 'UsersController@passwordSetup')->name('users_password_setup');

    Route::post('favourites/toggle', 'UsersController@favouritesToggle')->name('users_favourites_toggle');
});

Route::group(['prefix' => 'catalogue',], function()
{
    Route::get('/', 'CatalogueController@index')->name('catalogue');
    Route::get('search/{search_request?}', 'CatalogueController@search')->name('catalogue_search')->where(['search_request' => '^((?!/).)*$']);
    Route::get('{cats}', 'CatalogueController@products')->name('catalogue_products')->where(['cats' => '[0-9/]+']);
    Route::get('{cats}/{product_slug}.html', 'CatalogueController@theproduct')->name('catalogue_theproduct')
        ->where(['cats'=>'[0-9/]+', 'product_slug'=>'[a-z-_\d]+']);
});

Route::group(['prefix' => 'blog',], function()
{
    Route::get('/', 'BlogController@index')->name('blog');
    Route::get('{post_slug}.html', 'BlogController@post')->name('blog_post')
        ->where(['post_slug'=>'[a-z-_\d]+']);
    Route::get('tag/{tag_slug}', 'BlogController@tag')->name('blog_tag')
        ->where(['tag_slug'=>'[a-z-_\d]+']);
});