<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Rules\CategoryRules;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'description'];


}


