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

     // Relación con el cliente
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // Relación con el usuario (vendedor)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con los detalles de venta
    public function details()
    {
        return $this->hasMany(SaleDetail::class);
    }


}
