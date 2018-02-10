<?php

use Illuminate\Database\Seeder;
use App\Models\SiteInfo\Author;
use App\Models\SiteInfo\NewsCategory;
use App\Models\SiteInfo\News;

class NewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Author::class, 5)->create();
        factory(NewsCategory::class, 2)->create();
        factory(News::class, 10)->create();
    }
}
