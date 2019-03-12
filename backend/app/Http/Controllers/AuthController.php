<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\AccountServer\User;
use App\Models\GameDB\Account;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['login', 'register'] ]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $credentials = [
            'name' => $request->username,
            'password' => strtoupper(md5($request->password))
        ];

        $user = User::where('name', $credentials['name'])->where('password', $credentials['password'])->first();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if (!$token = auth()->login($user)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }


    /**
     * Create a user (Insert user into DB and create a token, logging the user in)
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {

        $validatedData = $request->validate([
            'username' => 'required|unique:account_login,name|max:50',
            'password' => 'required|min:8',
            'email' => 'required|unique:account_login,email|email'
        ]);

        
        try {

            $user = new User;
            $user->name = $validatedData['username'];
            $user->password = strtoupper(md5($validatedData['password']));
            $user->originalPassword = $validatedData['password'];
            $user->email = $validatedData['email'];
            $user->save();

            if ($user) {

                $userGameAccount = new Account;
                $userGameAccount->act_id = $user->id;
                $userGameAccount->act_name = $user->name;
                $userGameAccount->gm = 0;
                $userGameAccount->save();

                if ($userGameAccount) {

                    if (!$token = auth()->login($user)) {
                        return response()->json(['error' => 'Unauthorized'], 401);
                    }
            
                    return $this->respondWithToken($token);
                }

            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage() ]);
        }
       
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}