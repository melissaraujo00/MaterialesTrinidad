<?php

namespace App\Policies;

use App\Models\BusinessData;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BusinessDataPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('ver datos empresa');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, BusinessData $businessData): bool
    {
        return $user->can('ver datos empresa');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
     public function update(User $user, BusinessData $customer): bool
    {
        return $user->can('editar datos empresa');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, BusinessData $businessData): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, BusinessData $businessData): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, BusinessData $businessData): bool
    {
        return false;
    }
}
