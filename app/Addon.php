<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Addon extends Model
{

    protected $fillable = ['product_id', 'properties_json','description','images_json','prices_json',];

    public function product () {
        return $this->belongsTo('App\Product');
    }
}
