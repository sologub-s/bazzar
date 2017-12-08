<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 07.12.2017
 * Time: 17:24
 */

/**
 * All Observers should be registered in App\Providers\AppServiceProvider !!!
 */

namespace App\Observers;

use \App\Contentblock;


class ContentblockObserver
{

    /**
     * Listen to saving event. (before save)
     *
     * @param  Contentblock $post
     * @return void
     */
    public function saving(Contentblock $contentblock)
    {
        $contentblock->slug = $contentblock->slug ? slug($contentblock->slug) : slug($contentblock->name);
    }

}