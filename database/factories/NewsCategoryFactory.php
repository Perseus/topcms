<?php

use Faker\Generator as Faker;
use App\Models\SiteInfo\NewsCategory;

$factory->define(NewsCategory::class, function (Faker $faker) {
    return [
        //
        'title' => 'Test Category',
        'colour' => $faker->hexColor
    ];
});
