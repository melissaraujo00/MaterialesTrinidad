<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Municipality;
use App\Models\Department;

class District extends Model
{
    protected $fillable =
    [
        'name',
        'municipality_id'
    ];

    //CADA distrito PERTENECE A UN departamento
    public function municipality():BelongsTo
    {
        return $this->belongsTo(Municipality::class);
    }



}
