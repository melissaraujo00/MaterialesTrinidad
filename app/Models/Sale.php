<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sale extends Model
{
    protected $fillable = [
        'quote_id',
        'customer_id',
        'user_id',
        'date',
        'subtotal',
        'total',
    ];

     public function details()
    {
        return $this->hasMany(SaleDetail::class);
    }

    
}
