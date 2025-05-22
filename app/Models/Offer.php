<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'startDate',
        'endDate',
        'description',
        'type',
        'priceNormal',
        'priceOffers',
        'product_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
