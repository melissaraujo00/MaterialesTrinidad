<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Type;
use App\Http\Requests\StoreTypeRequest;

class TypeController extends Controller
{
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
        return Inertia::render('type/Index', [
            'types' => Type::all()
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
