<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\District;

class Municipality extends Model
{
    protected $fillable =
    [
        'name',
        'department_id',
    ];

    //CADA municipio PERTENECE A UN distrito
    public function department():BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    //el municipio tiene muchos distritos
    public function district():HasMany
    {
         return $this->hasMany(District::class);
    }
}
