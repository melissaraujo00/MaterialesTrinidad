<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\District;

class Department extends Model
{
    protected $fillable =
    [
        'name'
    ];

    //el departamento tiene muchos distritos
    public function districts():HasMany
    {
        return $this->hasMany(District::class);
    }
}
