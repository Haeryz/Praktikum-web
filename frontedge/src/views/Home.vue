<template>
    <div class="container my-4">
        <!-- Hero Section -->
        <div class="hero-section mb-5">
            <div class="hero-overlay">
                <h1 class="text-center text-white display-4 fw-bold">Simply Recipes</h1>
                <p class="text-center text-white lead">No Fluff, Just Recipes</p>
            </div>
        </div>

        <div class="row">
            <!-- Left-Side Categories -->
            <div class="col-md-3 mb-4">
                <h4 class="fw-bold mb-3">Recipes</h4>

                <div v-if="categoryLoading" class="text-center text-muted">
                    Loading categories...
                </div>

                <div v-else-if="categoryError" class="text-danger">
                    Error: {{ categoryError }}
                </div>

                <ul v-else class="list-unstyled">
                    <!-- Show All Option -->
                    <li @click="filterByCategory(null)" class="category-item">
                        <a href="#" class="text-decoration-none" :class="{ 'text-primary': selectedCategory === null }">
                            Show All
                        </a>
                    </li>
                    <!-- Categories -->
                    <li v-for="category in categoriesWithCounts" :key="category.id"
                        @click="filterByCategory(category.id)" class="category-item">
                        <a href="#" class="text-decoration-none"
                            :class="{ 'text-primary': selectedCategory === category.id }">
                            {{ category.name }} ({{ category.count }})
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Recipe Cards -->
            <div class="col-md-9">
                <div v-if="loading" class="text-center">Loading recipes...</div>
                <div v-if="error" class="text-danger text-center">
                    Error fetching recipes: {{ error }}
                </div>
                <div v-if="!loading && !error">
                    <div v-if="filteredRecipes.length === 0" class="text-center">
                        <p>No recipes available for this category.</p>
                    </div>

                    <!-- Recipe Cards Grid -->
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        <div class="col" v-for="recipe in filteredRecipes" :key="recipe.id">
                            <RecipeCard :recipe="recipe" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../axios";
import RecipeCard from "../components/RecipeCard.vue";

// State for recipes
const recipes = ref([]);
const loading = ref(true);
const error = ref(null);

// State for categories
const categories = ref([]);
const categoryLoading = ref(true);
const categoryError = ref(null);

// State for filtering
const selectedCategory = ref(null);

// Computed category list with recipe count
const categoriesWithCounts = computed(() => {
    return categories.value.map((category) => {
        const count = recipes.value.filter((recipe) => recipe.category_id === category.id).length;
        return { ...category, count };
    });
});

// Filtered recipes based on selected category
const filteredRecipes = computed(() => {
    if (!selectedCategory.value) return recipes.value; // Show all recipes if no category is selected
    return recipes.value.filter((recipe) => recipe.category_id === selectedCategory.value);
});

// Function to filter recipes by category
const filterByCategory = (categoryId) => {
    selectedCategory.value = categoryId;
};

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

// Function to fetch categories
const fetchCategories = async () => {
    try {
        const response = await api.get("/api/categories");
        categories.value = response.data || [];
    } catch (err) {
        categoryError.value = "Failed to fetch categories";
        console.error("Error fetching categories:", err);
    } finally {
        categoryLoading.value = false;
    }
};

// Fetch the data on component mount
onMounted(() => {
    fetchRecipes();
    fetchCategories();
});
</script>

<style scoped>
/* Hero Section Styling */
.hero-section {
    position: relative;
    background: url("https://images.unsplash.com/photo-1506368083636-6defb67639a7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") no-repeat center center/cover;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
}

/* Category Styling */
ul li a {
    font-size: 1.1rem;
    color: #6c757d;
    transition: color 0.3s;
}

ul li a.text-primary {
    font-weight: bold;
}

ul li a:hover {
    color: #0d6efd;
}

.category-item {
    cursor: pointer;
}

/* Recipe Card Styling */
.card {
    border: none;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
}

.card-img-top {
    height: 180px;
    object-fit: cover;
}

.card-body {
    padding: 1rem;
    text-align: center;
}

.card-title {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.card-text {
    color: #6c757d;
    font-size: 0.9rem;
}
</style>
