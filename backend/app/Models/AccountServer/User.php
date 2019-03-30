<?php

namespace App\Models\AccountServer;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class AccountLogin
 * @package App\Models
 * @version October 18, 2016, 4:25 am UTC
 */
class User extends Authenticatable implements JWTSubject
{

    use Notifiable;

    public $table = 'account_login';
    protected $connection = 'AccountServer';
    public $timestamps = false;
    protected $appends = array('permissions');

    public $fillable = [
        'name',
        'password',
        'originalPassword',
        'sid',
        'login_status',
        'enable_login_tick',
        'login_group',
        'last_login_time',
        'last_logout_time',
        'last_login_ip',
        'enable_login_time',
        'total_live_time',
        'last_login_mac',
        'ban',
        'email',
        'squestion',
        'answer',
        'register_ip',
        'refered_by',
        'last_ip_detected',
        'refer_points',
        'vip'
    ];

    protected $hidden = [
      'password',
      'originalPassword',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'password' => 'string',
        'originalPassword' => 'string',
        'sid' => 'integer',
        'login_status' => 'integer',
        'login_group' => 'string',
        'last_login_ip' => 'string',
        'last_login_mac' => 'string',
        'email' => 'string',
        'squestion' => 'string',
        'answer' => 'string',
        'register_ip' => 'string',
        'refered_by' => 'integer',
        'last_ip_detected' => 'string',
        'refer_points' => 'integer',
        'vip' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    public function getAuthIdentifier() {
     
      return $this->name;
    }

    public function getAuthPassword() {
      return $this->password;
    }

    public function getRememberToken() {
      return null; // not supported
    }

    public function setRememberToken($value) {
            // not supported
    }

    public function getRememberTokenName() {
      return null; // not supported
    }

    /**
     * Overrides the method to ignore the remember token.
     */
    public function setAttribute($key, $value) {
      $isRememberTokenAttribute = $key == $this->getRememberTokenName();
      if (!$isRememberTokenAttribute)
      {
        parent::setAttribute($key, $value);
      }
    }

    public function gameDetails() {
      return $this->hasOne(\App\Models\GameDB\Account::class,'act_id');
    }

    public function isAdmin() {
      return (($this->gameDetails->gm) == 99);
    }

    public function getIsBannedAttribute() {
      return ($this->ban === 1);
    }

    public function getPermissionsAttribute() {
      $permissions = [];

      if ( $this->gameDetails->gm == 99 ) {
        $permissions = [ 'site', 'admin' ];
      } else if ( $this->gameDetails->gm < 99 && $this->gameDetails->gm > 0 ) {
        $permissions = [ 'site' ];
      }

      return $permissions;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

        
}
