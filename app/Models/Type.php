<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Rules\TypeRules;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Type extends Model
{
    protected $fillable = 
    [
        'type',
        'description'
    ];
}
