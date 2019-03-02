<?php

namespace App\GraphQL\Auth\Mutation;

use App\Models\AccountServer\User;
use GraphQL;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class LoginMutation extends Mutation {

  protected $attributes = [
    'name' => 'LoginUser'
  ];

  public function type() {
    return GraphQL::type('auth');
  }

  public function args() {
    return [
      'username' => [ 'name' => 'username', 'type' => Type::nonNull(Type::string()) ],
      'password' => [ 'name' => 'password', 'type' => Type::nonNull(Type::password()) ],
    ];
  }

  public function resolve( $roots, $args ) {
  
    try {
      if ( !$token = JWTAuth::attempt( $args ) ) {
        return 'Invalid Credentials';
      }
    } catch (JWTException $e) {
      return $e->getMessage();
    }
  }

}