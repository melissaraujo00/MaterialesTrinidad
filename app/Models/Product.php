<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use Softdeletes;

    protected $fillable =
    [
        'name',
        'description',
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

    public function movements():HasMany
    {
        return $this->hasMany(Movement::class);
    }

    public function offers():HasMany
    {
        return $this->hasMany(Offer::class);
    }

    public function saleDetails()
{
    return $this->hasMany(SaleDetail::class);
}


    public function reduceStock($quantity)
{
    $this->stock -= $quantity;
    if ($this->stock < 0) {
        throw new \Exception("Stock insuficiente del producto: {$this->name}");
    }
    $this->save();
}



}
