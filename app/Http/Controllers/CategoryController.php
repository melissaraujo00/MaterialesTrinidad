<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{

    public function getCategoryData()
    {
        $category = Category::query()
            ->select('id', 'name', 'description')
            ->get();

        return response()->json(['data' => $category]);
    }
    public function index()
    {
        return Inertia::render('category/Index', [
            'categories' => Category::all(),
        ]);
    }

    public function create()
    {
        // Obtener todas las categorías (si es necesario, se puede modificar)
        $categories = Category::all(); // Si quieres pre-poblar con datos existentes, puedes hacer una consulta similar

        // Devolver la vista de Inertia con las categorías
        return Inertia::render('category/Create', [
            'categories' => $categories
        ]);
    }


    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        Category::create($request->validated());

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(Category $category)
    {
        return Inertia::render('category/Edit', [
        'category' => $category,
    ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')->with('success','Category updated successfully');
    }
}
