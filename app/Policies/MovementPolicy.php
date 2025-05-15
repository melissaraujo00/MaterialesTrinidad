<?php

namespace App\Policies;

use App\Models\Movement;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MovementPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('Ver Movimiento');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Movement $movement): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
       return $user->can('Crear Movimiento');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Movement $movement): bool
    {
        return $user->can('Editar Movimiento');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Movement $movement): bool
    {
        return $user->can('Eliminar Movimiento');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Movement $movement): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Movement $movement): bool
    {
        return false;
    }
}
