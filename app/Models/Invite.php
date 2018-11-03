<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Invite
 * @package App\Models
 * @version November 3, 2018, 9:50 pm UTC
 *
 * @property \Illuminate\Database\Eloquent\Collection roleHasPermissions
 * @property string token
 * @property string email
 * @property boolean accepted
 * @property string|\Carbon\Carbon expires_at
 * @property string|\Carbon\Carbon accepted_at
 */
class Invite extends Model
{
    use SoftDeletes;

    public $table = 'invites';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'token',
        'email',
        'accepted',
        'expires_at',
        'accepted_at'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'token' => 'string',
        'email' => 'string',
        'accepted' => 'boolean'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    
}
