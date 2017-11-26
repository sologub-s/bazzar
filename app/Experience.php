<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'birthday',
        'published_at',
    ];
}
