<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Department extends Model
{
    protected $fillable =
    [
        'name'
    ];

    //el departamento tiene muchos distritos
    public function municipalities():HasMany
    {
        return $this->hasMany(Municipality::class);
    }

}
