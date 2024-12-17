<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RecipeController extends Controller
{
    public function index()
    {
        return Recipe::with('category')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'time_to_cook' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|file|image|max:2048',
        ]);

        // Store the file in 'storage/app/public/recipes' and get the relative path
        $imagePath = $request->file('image')->store('recipes', 'public');

        // Save the recipe data
        $recipe = Recipe::create([
            'name' => $request->name,
            'time_to_cook' => $request->time_to_cook,
            'category_id' => $request->category_id,
            'image' => $imagePath, // Save only the relative path
        ]);

        return $recipe;
    }



    public function show($id)
    {
        return Recipe::with('category')->findOrFail($id);
    }
    public function update(Request $request, $id)
    {
        try {
            $recipe = Recipe::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'time_to_cook' => 'required|integer',
                'category_id' => 'required|exists:categories,id',
                'image' => 'nullable|file|image|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('recipes', 'public');
                $validatedData['image'] = $imagePath;
            }

            $recipe->update($validatedData);

            return response()->json(['message' => 'Recipe updated successfully', 'recipe' => $recipe]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }



    public function destroy($id)
    {
        Recipe::destroy($id);
        return response()->json(['message' => 'Recipe deleted']);
    }
}
