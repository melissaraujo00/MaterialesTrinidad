<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quote extends Model
{
    use SoftDeletes;
    
    protected $fillable=[
        'total',
        'date',
        'subtotal',
        'customer_id',
        'trader_id'
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }
    
    public function trader(){
        return $this->belongsTo(Trader::class);
    }
}
