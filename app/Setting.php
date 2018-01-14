<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key','value','description','enabled',];

    protected static function get(string $key)
    {
        return self::where('key', $key)->where('enabled', 1)->pluck('value')->first();
    }

}
