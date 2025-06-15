<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quote extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'total',
        'date',
        'subtotal',
        'customer_id',
        'user_id',
        'status'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con los detalles de la cotización
    public function details() // Asumo que se llama 'details' y apunta a QuoteDetail
    {
        return $this->hasMany(QuoteDetail::class);
    }

    public function products()
{
    return $this->belongsToMany(Product::class, 'product_quote')
                ->withPivot('quantity', 'price')
                ->withTimestamps();
}

}
