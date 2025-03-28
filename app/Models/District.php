<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Municipality;
use App\Models\Department;

class District extends Model
{
    protected $fillable =
    [
        'name',
        'department_id'
    ];



    //CADA distrito PERTENECE A UN departamento
    public function department():BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    //el distrito tiene muchos municipios
    public function municipalities():HasMany
    {
         return $this->hasMany(Municipality::class);
    }


}
