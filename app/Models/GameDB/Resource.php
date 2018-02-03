<?php

namespace App\Models\GameDB;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Resource
 * @package App\Models
 * @version October 18, 2016, 4:30 am UTC
 */
class Resource extends Model
{
 
    public $table = 'Resource';
    protected $connection = 'GameDB';
    public $timestamps = false;

    public $fillable = [
        'cha_id',
        'type_id',
        'content'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'cha_id' => 'integer',
        'content' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    
}
