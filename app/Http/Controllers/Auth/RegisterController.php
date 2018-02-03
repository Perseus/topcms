<?php

namespace App\Http\Controllers\Auth;

use App\Models\AccountServer\AccountLogin;
use App\Models\GameDB\Account;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        if(config('server.recaptcha')) {
            return Validator::make($data, [
                'username' => 'required|string|max:255|unique:AccountServer.account_login,name',
                'email' => 'required|string|email|max:255|unique:AccountServer.account_login,email',
                'password' => 'required|string|min:6|confirmed',
                'recaptcha_response_field' => 'required|recaptcha'
            ]);
        } else {
            return Validator::make($data, [
                'username' => 'required|string|max:255|unique:AccountServer.account_login,name',
                'email' => 'required|string|email|max:255|unique:AccountServer.account_login,email',
                'password' => 'required|string|min:6|confirmed',
            ]);
        }
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
       // insert in account_login
       $account =  AccountLogin::create([
        'name' => $data['username'],
        'email' => $data['email'],
        'password' => strtoupper(md5($data['password'])),
        'originalPassword' => $data['password'],
        'ban' => 0
        ]);
        // insert in gamedb
        if($account)
        {
            $game = Account::create([
                'act_id' => $account->id,
                'act_name' => ''.$account->name.'',
                'gm' => config('server.default_gm'),
            ]);
        }
        else {
            return false;
        }
        return $game;
    }
}
