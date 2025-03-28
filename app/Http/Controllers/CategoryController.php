<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\RedirectResponse;

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


    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Category::create($data);

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(string $id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('category/categoryEdit', [
            'category' => $category,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        $category->update($data);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('categories.index')->with('success','Category updated successfully');
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
