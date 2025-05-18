<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessData extends Model
{
     use HasFactory;

    protected $fillable=[
        'name',
        'nit',
        'address',
        'phoneNumber',
        'email',
        'logo_path',
        'description'
    ];
}
