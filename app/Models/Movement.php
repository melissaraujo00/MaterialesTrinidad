<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Product;
use App\Models\Type;

class Movement extends Model
{
    protected $fillable = [
        'date',
        'hour',
        'product_quantity',
        'product_id',
        'type_id'
    ];

    public function product():BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function type():BelongsTo
    {
        return $this->belongsTo(Type::class);
    }
}
