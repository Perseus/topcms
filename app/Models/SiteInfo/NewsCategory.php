<?php

namespace App\Models\SiteInfo;

use Illuminate\Database\Eloquent\Model;

class NewsCategory extends Model
{
    //
    public $table = 'news_categories';
    protected $connection = 'SiteInfo';


    public function news() {
        $this->belongsToMany('App\Models\SiteInfo\News');
    }
}
