<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Product extends Model
{
    protected $fillable =
    [
        'name',
        'description',
        'price',
        'priceWithTax',
        'discountPrice',
        'stock',
        'category_id',
        'brand_id',
        'stockMinimun',
        'image',
    ];

    public function category():BelongsTo
    {
        return $this->belongsTo(Category::class)->withTrashed();
    }

    public function brand():BelongsTo
    {
        return $this->belongsTo(Brand::class)->withTrashed();
    }
}
