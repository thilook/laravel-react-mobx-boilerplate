<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class ModelHasPermission
 * @package App\Models
 * @version October 24, 2018, 7:40 pm UTC
 *
 * @property \App\Models\Permission permission
 * @property \Illuminate\Database\Eloquent\Collection roleHasPermissions
 * @property string model_type
 * @property bigInteger model_id
 */
class ModelHasPermission extends Model
{
    use SoftDeletes;

    public $table = 'model_has_permissions';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'model_type',
        'model_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'permission_id' => 'integer',
        'model_type' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function permission()
    {
        return $this->belongsTo(\App\Models\Permission::class);
    }
}
