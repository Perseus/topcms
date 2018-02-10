<?php

use App\Models\SiteInfo\Author;
use Faker\Generator as Faker;

$factory->define(Author::class, function (Faker $faker) {
    return [
        //
        'name' => $faker->name
    ];
});
