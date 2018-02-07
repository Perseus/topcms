<?php

namespace App\Models\SiteInfo;

use Illuminate\Database\Eloquent\Model;

class Download extends Model
{
    //
    public $table = 'downloads';
    protected $connection = 'SiteInfo';


    public function author() {
        $this->belongsTo('App\Models\SiteInfo\Author', 'id');
    }

    public function category() {
        $this->hasOne('App\Models\SiteInfo\DownloadsCategory', 'id');
    }

}
