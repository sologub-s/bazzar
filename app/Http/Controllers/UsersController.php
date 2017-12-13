<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Auth\ResetsPasswords;

class UsersController extends Controller
{
    use ResetsPasswords;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth', ['only' => ['create', 'store']]);
        $this->middleware('auth');
    }

    /**
     * Show the User profile
     *
     * @return \Illuminate\Http\Response
     */
    public function profile(\Illuminate\Http\Request $request)
    {
        return view('users/profile');
    }

    public function profileHandler(\Illuminate\Http\Request $request)
    {

        try {
            Auth()->user()->fill([
                'name' => $request->post('name'),
            ])->save();
        } catch (\Exception $e) {
            return redirect()->route('users_profile')->with('error', $e->getMessage())->withInput();
        }
        return redirect()->route('users_profile')->with('status', 'Profile updated!')->withInput();
    }

    public function password(\Illuminate\Http\Request $request)
    {
        return view('users/password');
    }

    public function passwordHandler(\Illuminate\Http\Request $request)
    {
        try {
            if (!Hash::check($request->post('password_current'), Auth()->user()->password)) {
                return redirect()->route('users_password')->with('error', 'Текущий пароль указан неверно');
            }
            if ($request->post('password_current') == $request->post('password_new')) {
                return redirect()->route('users_password')->with('error', 'Новый пароль должен отличаться от старого');
            }
            if ($request->post('password_new') != $request->post('password_confirmation')) {
                return redirect()->route('users_password')->with('error', 'Новый пароль и подтверждение нового пароля не совпадают');
            }
            if(!$request->post('password_new') || strlen($request->post('password_new')) < 6) {
                return redirect()->route('users_password')->with('error', 'Пароль должен быть 6 символов или длиннее');
            }
            Auth()->user()->fill([
                'password' => Hash::make($request->post('password_new')),
            ])->save();
        } catch (\Exception $e) {
            return redirect()->route('users_password')->with('error', $e->getMessage());
        }
        return redirect()->route('users_password')->with('status', 'Пароль изменен!');
    }

    public function passwordSetup(\Illuminate\Http\Request $request)
    {
        try {
            if (!is_null(Auth()->user()->password)) {
                return redirect()->route('users_password')->with('error', 'У этой учетной записи уже установлен пароль');
            }
            if ($request->post('password_new') != $request->post('password_confirmation')) {
                return redirect()->route('users_password')->with('error', 'Новый пароль и подтверждение нового пароля не совпадают');
            }
            if(!$request->post('password_new') || strlen($request->post('password_new')) < 6) {
                return redirect()->route('users_password')->with('error', 'Пароль должен быть 6 символов или длиннее');
            }
            Auth()->user()->fill([
                'password' => Hash::make($request->post('password_new')),
            ])->save();
        } catch (\Exception $e) {
            return redirect()->route('users_password')->with('error', $e->getMessage());
        }
        return redirect()->route('users_password')->with('status', 'Пароль установлен!');
    }

}
