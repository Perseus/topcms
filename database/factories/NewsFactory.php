<?php

use App\Models\SiteInfo\News;
use App\Models\SiteInfo\Author;
use App\Models\SiteInfo\NewsCategory;
use Faker\Generator as Faker;

$factory->define(News::class, function (Faker $faker) {
    return [
        //
        'title' => 'Test News',
        'content' => $faker->realText(),
        'category' => NewsCategory::get()->random()->id ?: 0,
        'author' => Author::get()->random() ?: 0

    ];
});
