<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'description'];

 
    public static $rules = [
        'name' => 'required|string|max:50',
        'description' => 'required|string|max:100',
    ];
}


