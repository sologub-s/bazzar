<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use App\Addon;

class Product extends Model
{

    use Searchable;

    protected $fillable = ['ava_id','name','slug','parent_id','category_id','brand_id','img','parsed','active','in_stock','price_min','price_max',];

    public function addon () {
        return $this->hasOne('App\Addon');
    }

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

    public function users ()
    {
        return $this->belongsToMany('App\Users')->withTimestamps();
    }

    public function searchableAs()
    {
        return 'products';
    }

    public function toSearchableArray () {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->addon()->first()->description ?? '',
        ];
    }

    public function mainImage() {
        if ($this->addon()->first()->images_json) {
            $images = json_decode($this->addon()->first()->images_json, true);
            if (sizeof($images)) {
                return $images[0]['normal'];
            }
        }
        return $this->img ?? null;
    }

    public function createCats ($categoryList) {
        return self::createCatsStatic($this->category_id, $categoryList);
    }

    public static function createCatsStatic ($category_id, $categoryList) {
        //dd($category_id, $categoryList);
        $cats = [];
        $parentId = $category_id;
        while (true)
        {
            $found = false;
            foreach ($categoryList as $category) {
                if ($category['id'] == $parentId) {
                    $found = true;
                    $cats[] = $category['id'];
                    if ($category['parent_id'] == 0) {
                        break 2;
                    }
                    $parentId = $category['parent_id'];
                }
            }
            if(!$found) {
                break;
            }
        }
        return implode('/', array_reverse($cats));
    }
}
