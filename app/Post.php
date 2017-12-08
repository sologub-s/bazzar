<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Illuminate\Notifications\Notifiable;

class Post extends Model
{
    use Searchable;
    use Notifiable;

    protected $fillable = ['name','slug','content','active','image',];

    public function searchableAs()
    {
        return 'posts';
    }

    public function toSearchableArray () {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'content' => $this->content,
            'image' => $this->image,
        ];
    }
}
