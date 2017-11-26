<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $fillable = ['ava_id','name','descroption','href','logo','logo_is_fetched','tel','country','city','address',];
}
