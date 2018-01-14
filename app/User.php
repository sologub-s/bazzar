<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable;

    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'provider', 'provider_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function products ()
    {
        return $this->belongsToMany('App\Product')->withTimestamps();
    }

    public static function fromSocial($socialUser, $provider)
    {
        if ($provider == 'facebook') {
            return self::fromFacebook($socialUser);
        }
        if ($provider == 'twitter') {
            return self::fromTwitter($socialUser);
        }
        throw new \Exception("Unknown social provider");
    }

    protected static function fromFacebook($socialUser)
    {
        return self::where('email', $socialUser->user['email'])->first()
            ?: self::where('provider', 'facebook')->where('provider_id', $socialUser->user['id'])->first()
                ?: new self([
                    'provider' => 'facebook',
                    'provider_id' => $socialUser->user['id'],
                    'name' => isset($socialUser->user['name']) ? $socialUser->user['name'] : null,
                    'email' => isset($socialUser->user['email']) ? $socialUser->user['email'] : null,
                ]);
    }
}
