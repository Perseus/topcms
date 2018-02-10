<?php

namespace App\Models\SiteInfo;

use Illuminate\Database\Eloquent\Model;

class DownloadsCategory extends Model
{
    //
    public $table = 'downloads_categories';
    protected $connection = 'SiteInfo';

    public function downloads() {
        $this->belongsToMany('App\Models\SiteInfo\Downloads');
    }
}
