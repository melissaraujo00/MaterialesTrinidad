<?php

namespace App\Policies;

use App\Models\User;

class InventoryReportPolicy
{
    /**
     * Create a new policy instance.
     */
      public function view(User $user): bool
    {
        return $user->can('ver reporte');
    }

    public function download(User $user): bool
    {
        return $user->can('generar reporte');
    }
}
