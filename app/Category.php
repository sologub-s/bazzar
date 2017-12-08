<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class Category extends Model
{
    protected $fillable = ['ava_id','name','parent_id','terms',];

    /**
     * @param array<Category>|Collection<Category> $list
     * @param int $parent_id
     * @return Array
     */
    public static function createTree($list = [], $parent_id = 0) : Array
    {
        $list = (array) $list;
        $result = [];
        foreach ($list as $item) {
            if ($item['parent_id'] == $parent_id) {
                $item['children'] = self::createTree($list, $item['id']);
                $result[$item['id']] = $item;
            }
        }
        return $result;
    }
}
