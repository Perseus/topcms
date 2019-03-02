<?php

namespace App\GraphQL\User;

use App\Models\AccountServer\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class UserType extends GraphQLType {
  

  protected $attributes = [
    'name' => 'User',
    'description' => 'A user',
    'model' => User::class
  ];

  public function fields() {
    return [
      'id' => [
        'type' => Type::nonNull(Type::int()),
        'description' => 'ID of the user',
      ],
      'email' => [
        'type' => Type::nonNull(Type::string()),
        'description' => 'Email of the user'
      ],
      'login_status' => [ 
        'type' => Type::int(),
        'description' => 'Is the user logged in right now?',
      ],
      'last_login_ip' => [
        'type' => Type::string(),
        'description' => 'Last IP the user logged in with',
      ],
      'last_login_mac' => [
        'type' => Type::string(),
        'description' => 'Last MAC the user logged in with',
      ],

    ];
  }


}