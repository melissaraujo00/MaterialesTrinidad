<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\District;

class Municipality extends Model
{
    protected $fillable =
    [
        'name',
        'district_id'

    ];

        //CADA municipio PERTENECE A UN distrito
        public function district():BelongsTo
        {
            return $this->belongsTo(District::class);
        }
}
