<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $fillable = ['ava_id','name','ava_shop_id','shop_id','price','country','ava_product_id','product_id','product_pid','ordering','img','href','description','parse_time',];
}
