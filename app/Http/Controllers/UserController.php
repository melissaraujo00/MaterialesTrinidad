<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function getUsersData()
    {
        $users = User::query()
            ->with('roles')
            ->get()
            ->map( function ($user){
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'firstName' => $user->firstName,
                    'lastName' => $user->lastName,
                    'email' => $user->email,
                    'birthdate'=> $user->birthdate,
                    'phoneNumber' => $user->phoneNumber,
                    'roles' => $user->roles->pluck('name')->toArray(),

                ];
            });

        return response()->json(['data' => $users]);
    }
    /**
     * Display a listing of the resource.
     */

public function index(): Response
{
    $user = auth()->user();

    return Inertia::render('user/Index', [
        'users' => User::all(),
        'roles' => Role::all(),
        'auth' => [
            'user' => [
                'id' => $user?->id,
                'name' => $user?->name,
                'permissions' => $user ? $user->getAllPermissions()->pluck('name') : [],
            ]
        ]
    ]);
}
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();

        // Devolver la vista de Inertia con los roles
        return Inertia::render('user/Create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $user = User::create($request->validated());
        $user->syncRoles($request->role);
        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('roles');
        $roles = Role::all();

        return Inertia::render('user/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        $user->syncRoles($request->role);
        return redirect()->route(route: 'users.index')->with(key: 'success', value: 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success','Usuario eliminado correctamente');
    }
}
