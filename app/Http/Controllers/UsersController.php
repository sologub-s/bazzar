<?php

namespace App\Http\Controllers;

use App\User;
use App\Product;
use App\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Auth\ResetsPasswords;
//use Symfony\Component\HttpFoundation\Response;

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
        parent::__construct();
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

    public function favourites(\Illuminate\Http\Request $request)
    {

        $favourites = Auth::user()->products()
            ->orderBy('product_user.created_at', 'desc')
            ->with([
                'category', 'brand', 'prices' => function($query) {
                    $query->orderBy('price', 'ASC');
                }
            ])
            ->where('broken', 0)
            ->where('active', 1);
        $products = $favourites = $favourites->get();
        $favouritesArray = $favourites->toArray();
        $favouritesMapped = [];
        while($favourite = array_shift($favouritesArray)) {
            $favouritesMapped[$favourite['id']] = $favourite;
        }

        return view('users/favourites', [
            'products' => $products,
            'favourites' => $favouritesMapped,
        ]);
    }

    public function favouritesToggle(Request $request, Response $response)
    {
        $response->header('Content-Type', 'application/json; charset='.($response->getCharset() ?: 'UTF-8'), true);

        if (!Product::find($request->input('product_id'))) {
            return response()->json([
                'currentStatus' => 'notfound',
            ], 404);
        }
        $attachResult = Auth::user()->products()->toggle($request->input('product_id'));

        return response()->json([
            'currentStatus' => in_array($request->input('product_id'), $attachResult['attached']) ? 'added' : 'removed',
            //'user' => Auth()->user()->email ?? 'unauthorized',
        ], 200);
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
