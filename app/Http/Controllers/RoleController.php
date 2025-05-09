<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use Inertia\Inertia;
use App\Http\Requests\StoreRoleRequest;

class RoleController extends Controller
{
    public function getRolData(){
        // $rol = Role::query()
        // ->select('id', 'name', 'description')->get();

        // return response()->json(['data' => $rol]);

        $role = Role::query()
            ->select('id', 'name', 'description')
            ->get();

        return response()->json(['data' => $role]);
    }
    public function index()
    {
        // return Inertia::render('roles/Index', [
        //     'roles' => Role::all(),
        // ]);
        return Inertia::render('role/Index', [
            'roles' => Role::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         // Obtener todas las categorías (si es necesario, se puede modificar)
        $roles = Role::all(); // Si quieres pre-poblar con datos existentes, puedes hacer una consulta similar

        // Devolver la vista de Inertia con las categorías
        return Inertia::render('role/create', [
            'roles' => $roles
        ]);
    }
    /*public function create()
{
    return Inertia::render('role/create', [
        'roles' => Role::select('id', 'name')->get(), // Solo necesitamos id y nombre para la verificación
    ]);*/


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        Role::create($request->validated());

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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
