<template>
    <div>
        <h1>Recipe List</h1>

        <div v-if="loading">Loading recipes...</div>

        <div v-if="error" class="text-danger">
            Error fetching recipes: {{ error }}
        </div>

        <div v-if="!loading && !error">
            <div v-if="recipes.length === 0">
                <p>No recipes available.</p>
            </div>

            <div class="row row-cols-1 row-cols-md-3 g-4">
                <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../axios";  // Axios instance for API calls
import RecipeCard from "../components/RecipeCard.vue";  // Import the card component

// State management
const recipes = ref([]);
const loading = ref(true);
const error = ref(null);

// Function to fetch recipes
const fetchRecipes = async () => {
    try {
        const response = await api.get("/api/recipes");
        recipes.value = response.data || [];
    } catch (err) {
        error.value = "Failed to fetch recipes";
        console.error("Error fetching recipes:", err);
    } finally {
        loading.value = false;
    }
};

// Fetch the recipes on component mount
onMounted(fetchRecipes);
</script>

<style scoped>
.row {
    margin-top: 2rem;
}
</style>