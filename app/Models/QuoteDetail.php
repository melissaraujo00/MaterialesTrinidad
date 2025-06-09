<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuoteDetail extends Model
{
    protected $fillable = [
        'amount',
        'price',
        'subtotal',
        'quote_id',
        'product_id'
    ];

    public function quote()
    {
        return $this->belongsTo(Quote::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
