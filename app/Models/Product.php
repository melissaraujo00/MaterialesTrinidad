<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    protected $fillable =
    [
        'name', 
        'description', 
        'price',
        'priceWithTax',
        'stock', 
        'image', 
        'category_id', 
        'brand_id', 
    ];
}
