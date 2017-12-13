<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        return $this->guard()->attempt(
            array_merge($this->credentials($request), ['banned'=>0]), $request->filled('remember')
        );
    }

    /**
     * Get the failed login response instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws ValidationException
     */
    protected function sendFailedLoginResponse(Request $request)
    {

        if($user = \App\User::where('email', $request->email)->first()) {
            $messages = [];
            if (!Hash::check($request->password, $user->password)) {
                $messages['password'] = isset($messages['password']) ? array_merge($messages['password'], [trans('auth.password_wrong')]) : [trans('auth.password_wrong')];
                /*
                throw ValidationException::withMessages([
                    'password' => [trans('auth.password_wrong')],
                ]);
                */
            }
            if ($user->banned == 1) {
                $messages['banned'] = isset($messages['banned']) ? array_merge($messages['banned'], [trans('auth.banned')]) : [trans('auth.banned')];
                /*
                throw ValidationException::withMessages([
                    'banned' => [trans('auth.banned')],
                ]);
                */
            }
        } else {
            $messages[$this->username()] = isset($messages[$this->username()]) ? array_merge($messages[$this->username()], [trans('auth.user_not_found')]) : [trans('auth.user_not_found')];
        }

        /*
        throw ValidationException::withMessages([
            $this->username() => [trans('auth.user_not_found')],
            'password' => [trans('auth.password_wrong')],
            'banned' => [trans('auth.banned')],
        ]);
        */

        return redirect()->route('login')->with('error', $messages)->withInput();
        throw ValidationException::withMessages($messages);
    }
}
