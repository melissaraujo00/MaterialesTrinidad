<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory;
    use Softdeletes;

    protected $fillable = [
        'name',
        'email',
        'phoneNumber',
        'nit',
        'district_id',
        'address',
        'description',
        'status'

    ];
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }
}
