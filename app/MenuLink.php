<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class MenuLink extends Model implements Sortable
{
    use SortableTrait;

    public $sortable = [
        'order_column_name' => 'order',
        'sort_when_creating' => true,
    ];

    protected $fillable = ['name','href','target','parent_id','order','active','custom_type',];

    public function menulinks()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * @param array<MenuLink>|Collection<MenuLink> $list
     * @param int $parent_id
     * @return Array
     */
    /*
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
    */
}
