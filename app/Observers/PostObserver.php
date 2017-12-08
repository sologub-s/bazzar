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

use \App\Post;


class PostObserver
{

    /**
     * Listen to saving event. (before save)
     *
     * @param  Post  $post
     * @return void
     */
    public function saving(Post $post)
    {
        $post->slug = $post->slug ? slug($post->slug) : slug($post->name);
    }

}