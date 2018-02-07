<?php

namespace App\Models\SiteInfo;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    //
    public $table = 'authors';
    protected $connection = 'SiteInfo';


    public function news() {
        $this->hasMany('App\Models\SiteInfo\News');
    }

    public function downloads() {
        $this->hasMany('App\Models\SiteInfo\Downloads');
    }
}
