<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

class Role extends Model
{
    protected $fillable =
    [
        'name',
        'description'
    ];

    public function User():HasMany
    {
        return $this->hasMany(User::class);
    }
}
