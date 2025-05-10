<?php

namespace App\Http\Controllers;
use App\Models\Permission;
use Inertia\Inertia;
use App\http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function getPermissionData()
    {
        $permissions = Permission::query()
        ->select('id','name')
        ->get();

        return response()->json(['data' => $permissions]);
    }

    public function index()
    {
        return Inertia::render('permission/Index', [
            'permissions' => Permission::all(),
        ]);
    }

    public function create()
    {
        $permissions = Permission::all();

        return Inertia::render('permission/Create', [
            'permissions' => $permissions
        ]);
    }


    public function store(StorePermissionRequest $request)
    {
        Permission::create($request->validated());

        return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
    }

    public function edit(Permission $permission){
        return Inertia::render('permission/Edit', [
            'permission' => $permission,
        ]);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission)
    {

        $permission->update($request->validated());
        return redirect()->route('permissions.index')->with('success', 'Permiso actualizado correctamente.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
        return redirect()->route('permissions.index')->with('success','Permission deleted successfully');
    }
}
