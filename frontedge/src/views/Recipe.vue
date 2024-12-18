<template>
    <div class="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <h1 class="display-4 text-success">Recipe Page</h1>
        <p class="lead mt-4">Discover amazing recipes here!</p>

        <!-- Recipe Form -->
        <div class="card shadow-sm" style="width: 30rem;">
            <div class="card-body">
                <h5 class="card-title">Add a New Recipe</h5>
                <form @submit.prevent="createRecipe" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="recipeName" class="form-label">Recipe Name</label>
                        <input type="text" id="recipeName" v-model="recipe.name" class="form-control" required />
                    </div>

                    <div class="mb-3">
                        <label for="timeToCook" class="form-label">Time to Cook (mins)</label>
                        <input type="number" id="timeToCook" v-model="recipe.time_to_cook" class="form-control"
                            required />
                    </div>

                    <!-- Category Select -->
                    <div class="mb-3">
                        <label for="category" class="form-label">Category</label>
                        <select id="category" v-model="recipe.category_id" class="form-select" required>
                            <option disabled value="">Select Category</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>

                    <!-- File Input for Image Upload -->
                    <div class="mb-3">
                        <label for="image" class="form-label">Recipe Image</label>
                        <input type="file" id="image" @change="handleImageUpload" class="form-control" />
                    </div>

                    <button type="submit" class="btn btn-primary">Create Recipe</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../axios";  // Axios instance for API calls

export default {
    name: "Recipe",
    setup() {
        const recipe = ref({
            name: "",
            time_to_cook: null,
            category_id: "",
            image: null, // Will store image file
        });

        const categories = ref([]);

        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const response = await api.get("/api/categories");
                categories.value = response.data;  // Store fetched categories
            } catch (err) {
                console.error("Error fetching categories:", err);
                alert("Failed to fetch categories.");
            }
        };

        // Handle image upload
        const handleImageUpload = (event) => {
            recipe.value.image = event.target.files[0]; // Get the file from input
        };

        // Function to create a new recipe
        const createRecipe = async () => {
            try {
                const formData = new FormData();
                formData.append("name", recipe.value.name);
                formData.append("time_to_cook", recipe.value.time_to_cook);
                formData.append("category_id", recipe.value.category_id);
                if (recipe.value.image) {
                    formData.append("image", recipe.value.image);
                }

                // Debug: Log FormData to ensure fields are populated
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }

                // Send POST request
                const response = await api.post("/api/recipes", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert("Recipe created successfully!");
                recipe.value = { name: "", time_to_cook: null, category_id: "", image: null }; // Reset the form
            } catch (err) {
                if (err.response && err.response.status === 422) {
                    console.error("Validation Errors:", err.response.data.errors);
                    alert(`Validation failed: ${JSON.stringify(err.response.data.errors)}`);
                } else {
                    alert("Failed to create the recipe.");
                    console.error("Error:", err);
                }
            }
        };


        // Fetch categories when the component is mounted
        onMounted(fetchCategories);

        return {
            recipe,
            categories,
            createRecipe,
            handleImageUpload,
        };
    },
};
</script>

<style scoped>
.card {
    width: 100%;
    max-width: 500px;
}

.card-title {
    font-size: 1.5rem;
}

.btn {
    width: 100%;
    margin-top: 10px;
}
</style>
