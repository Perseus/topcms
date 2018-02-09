<?php

namespace App\Models\SiteInfo;

use Illuminate\Database\Eloquent\Model;
use App\Models\SiteInfo\Author;
use Carbon\Carbon;
use App\Models\SiteInfo\NewsCategory;

class News extends Model
{
    //
    public $table = 'news';
    protected $connection = 'SiteInfo';






    public function author() {
        $this->belongsTo('App\Models\SiteInfo\Author', 'id');
    }

    public function category() {
        $this->hasOne('App\Models\SiteInfo\NewsCategory', 'id');
    }

    public function getCreatedAtAttribute($value) {
        $carbonDate = new Carbon($value);
        return $carbonDate->diffForHumans();
    }

    public function getAuthorAttribute($value) {
        $author = Author::find($value);
        return $author;
    }

    public function getCategoryAttribute($value) {
        $category = NewsCategory::find($value);
        return $category;
    }
    
}
