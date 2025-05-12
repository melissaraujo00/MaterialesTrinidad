<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Requests\UpdateRoleRequest;


class RoleController extends Controller
{
    public function getRolData(){
        $role = Role::query()
            ->select('id', 'name', 'description')
            ->get();

        return response()->json(['data' => $role]);
    }
    public function index()
    {
        return Inertia::render('role/Index', [
            'roles' => Role::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::select('id', 'name')
                                ->get();
        return Inertia::render('role/create', ['permissions' => $permissions]);
    }

    public function store(StoreRoleRequest $request)
    {
        $role = Role::create($request->validated());
        $role->syncPermissions($request->input('permissions'));
        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $permissions = Permission::select('id', 'name')->get();
        $rolePermissions = $role->permissions->pluck('name')->toArray();

        return Inertia::render('role/Edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'description' => $role->description,
                'permissions' => $rolePermissions, 
            ],
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(UpdateRoleRequest $request, Role $role)
    {
        $role->update($request->validated());
        $role->syncPermissions($request->input('permissions')); // Actualiza los permisos del rol
        return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
