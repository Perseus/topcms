<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\AccountServer\AccountLogin::class, function (Faker $faker) {
    static $password;

    return [
        'name' => $faker->firstName,
        'email' => $faker->unique()->safeEmail,
        'originalPassword' => $password ? $password : 'secret',
        'password' => $password ? strtoupper(md5($password)) : $password = strtoupper(md5('secret')),
        'ban' => 0
    ];
});


$factory->define(App\Models\GameDB\Account::class, function (Faker $faker) {
    static $id;
    static $name;
    return [
        'act_id' => $id,
        'act_name' => $name,
         'gm' => config('server.default_gm')
    ];
});
