<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Rules\CategoryRules;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Product;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'description'];

    public function products():HasMany
    {
        return $this->hasMany(Product::class);
    }
}


