<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = ['name','href','region_id'];

    public function region()
    {
        return $this->belongsTo('App\Region', 'region_id');
    }
}
