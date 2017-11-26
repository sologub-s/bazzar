<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['ava_id','name','parent_id','category_id','brand_id','img','parsed','properties_json','description','images_json','active','in_stock','prices_json','price_min','price_max',];
}
