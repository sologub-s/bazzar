<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Tag extends Model
{
    use Notifiable;

    protected $fillable = ['name','slug','total',];

    public function posts ()
    {
        return $this->belongsToMany('App\Post');
    }

    public static function instantiate ($list, String $separator = ',', Bool $lowercase = true) {
        if (is_null($list)) {
            return [];
        }
        $list = is_string($list) ? explode($separator, $list) : $list;
        if (!is_array($list)) {
            throw new \Exception('$list should be string with commas or array');
        }
        array_walk($list, function (&$v) use ($lowercase) {
            $v = self::firstOrCreate(['name' => trim($lowercase ? mb_strtolower($v) : $v), 'slug' => slug(trim($v)),], ['name' => $v, 'slug' => slug(trim($v)),]);
        });
        return $list;
    }
}
