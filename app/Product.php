<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['ava_id','name','parent_id','category_id','brand_id','img','parsed','properties_json','description','images_json','active','in_stock','prices_json','price_min','price_max',];

    public function category () {
        return $this->belongsTo('App\Category');
    }

    public function brand () {
        return $this->belongsTo('App\Brand');
    }

    public function prices()
    {
        return $this->hasMany('App\Price', 'product_id');
    }
}
