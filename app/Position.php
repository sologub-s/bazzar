<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function profiles()
    {
        return $this->belongsToMany('App\Profile')->withTimestamps();
    }

}
