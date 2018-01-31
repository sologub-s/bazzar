<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contentblock extends Model
{
    protected $fillable = ['name','slug','content','active',];

    public static function get($slug = null)
    {
        $slug = !is_array($slug) ? [$slug] : $slug;
        $result = [];
        foreach (self::where('active', 1)->whereIn('slug', $slug)->get()->toArray() as $item) {
            $result[$item['slug']] = $item;
        }
        return $result;
    }
}
