<?php

namespace App\GraphQL\Auth;

use App\Models\AccountServer\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class AuthType extends GraphQLType {
  

  protected $attributes = [
    'name' => 'User',
    'description' => 'A user',
    'model' => User::class
  ];

  public function fields() {
    return [

    ];
  }


}