<?php

namespace App\GraphQL\User\Queries;

use App\Models\AccountServer\User;
use GraphQL;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

class UserQuery extends Query {

  protected $attributes = [
    'name' => 'Users query'
  ];

  public function type() {
    return Type::listOf(GraphQL::type('user'));
  }

  public function args() {
    return [
      'id' => [ 'name' => 'id', 'type' => Type::int() ],
      'email' => [ 'name' => 'email', 'type' => Type::string() ],
    ];
  }

  public function resolve($root, $args) {

    dd(auth()->payload()->get('sub'));
    if (isset($args['id'])) {
      // dd(User::where('id', $args['id'])->get());
      return User::where('id', $args['id'])->get();
    }

    if ( isset( $args['email'] ) ) {
      return User::where('email', $args['email'])->get();
    }
    return User::all();

  } 

}

