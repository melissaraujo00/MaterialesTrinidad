<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Inertia::share([
        'auth.user' => function () {
            $user = Auth::user();
            //dd($user->getAllPermissions());

            return $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ] : null;
        },
    ]);
    }
}
