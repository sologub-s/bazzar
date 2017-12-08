<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contentblock extends Model
{
    protected $fillable = ['name','slug','content','active',];
}
