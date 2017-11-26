<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    public function __construct(array $attributes = [])
    {
        static::saving(function($model) {
            $model->composeCustomSearch();
        });
        parent::__construct($attributes);
    }

    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'start_date',
        'end_date',
    ];

    public function positions()
    {
        return $this->belongsToMany('App\Position')->withTimestamps();
    }

    public function composeCustomSearch() {
        $this->custom_search = implode (' ', [
            $this->name,
            $this->href,
            $this->s_id,
            $this->position,
            $this->salary,
            $this->birthday instanceof \DateTime ? $this->birthday->format('Y-m-d H:i:s') : $this->birthday,
            $this->published_at instanceof \DateTime ? $this->published_at->format('Y-m-d H:i:s') : $this->published_at,
            $this->phone_prim,
            $this->phone_sec,
            $this->address,
            $this->add_info,
            $this->raw_data,
        ]);
    }
}
