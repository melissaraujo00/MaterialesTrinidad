<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('category/categories', [
            'categories' => Category::all(),
        ]);
    }

    public function create()
{
    // Obtener todas las categorías (si es necesario, se puede modificar)
    $categories = Category::all(); // Si quieres pre-poblar con datos existentes, puedes hacer una consulta similar

    // Devolver la vista de Inertia con las categorías
    return Inertia::render('category/categoryCreate', [
        'categories' => $categories
    ]);
}


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:categories',
            'description' => 'required|string|max:100',
        ]);

        Category::create($validated);

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(string $id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('category/categoryEdit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => [
                'required', 'string', 'max:50',
                Rule::unique('categories')->ignore($category->id), // Permitir mismo nombre al editar
            ],
            'description' => 'required|string|max:100',
        ]);

        $category->update($validated);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        //
    }

    //  función para verificar duplicados en tiempo real
    public function checkDuplicate(Request $request)
    {
        $name = $request->query('name');

        if (!$name) {
            return response()->json(['error' => 'El nombre es obligatorio'], 400);
        }

        $exists = Category::where('name', $name)->exists();

        return response()->json(['exists' => $exists]);
    }
}
