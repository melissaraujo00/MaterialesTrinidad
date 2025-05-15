<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTypeRequest;
use App\Http\Requests\UpdateTypeRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Type;

class TypeController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Type::class, 'type');
    }

    public function getTypeData(){
        $type = Type::query()
            ->select('id', 'type', 'description')
            ->get(); 
        return response()->json(['data' => $type]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        return Inertia::render('type/Index', [
            'types' => Type::all(),
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
        return Inertia::render('type/Create', [
            'types' => Type::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTypeRequest $request)
    {
        Type::create($request->validated());

        return redirect()->route('types.index')->with('success', 'Types created successfully.');
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
    public function edit(Type $type)
    {
        return Inertia::render('type/Edit', [
            'type' => $type,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTypeRequest $request, Type $type)
    {
        $type->update($request->validated());

        return redirect()->route('types.index')->with('success', 'Type updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Type $type)
    {
        $type->delete();

        return redirect()->route('types.index')->with('success','Type updated successfully');
    }
}
