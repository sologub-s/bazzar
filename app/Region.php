<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{

    protected $fillable = ['name','href'];

    public function cities()
    {
        return $this->hasMany('App\City', 'region_id', 'id');
    }
}
