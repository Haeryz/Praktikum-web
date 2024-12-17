<template>
    <div class="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <h1 class="display-4 text-success">Category Page</h1>
        <p class="lead mt-4">Manage Categories here!</p>

        <!-- Category Form -->
        <div class="card shadow-sm" style="width: 30rem;">
            <div class="card-body">
                <h5 class="card-title">Add a New Category</h5>
                <form @submit.prevent="createCategory">
                    <div class="mb-3">
                        <label for="categoryName" class="form-label">Category Name</label>
                        <input type="text" id="categoryName" v-model="category.name" class="form-control" required />
                    </div>

                    <button type="submit" class="btn btn-primary">Create Category</button>
                </form>
            </div>
        </div>

        <!-- Categories List -->
        <div v-if="categories.length" class="mt-5">
            <h5>Existing Categories</h5>
            <ul class="list-group">
                <li v-for="(cat, index) in categories" :key="cat.id"
                    class="list-group-item d-flex justify-content-between position-relative">
                    <span>{{ cat.name }}</span>
                    <div class="slide-buttons position-absolute end-0">
                        <button @click="editCategory(cat)" class="btn btn-warning btn-sm">Edit</button>
                        <button @click="deleteCategory(cat.id)" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../axios";  // Axios instance for API calls

export default {
    name: "Category",
    setup() {
        const category = ref({ name: "" });
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

        // Function to create a new category
        const createCategory = async () => {
            try {
                const response = await api.post("/api/categories", category.value);
                categories.value.push(response.data); // Add the new category to the list
                category.value.name = ""; // Reset the form field
                alert("Category created successfully!");
            } catch (err) {
                console.error("Error creating category:", err);
                alert("Failed to create category.");
            }
        };

        // Function to delete a category
        const deleteCategory = async (id) => {
            try {
                await api.delete(`/api/categories/${id}`);
                categories.value = categories.value.filter(cat => cat.id !== id); // Remove the deleted category from the list
                alert("Category deleted successfully!");
            } catch (err) {
                console.error("Error deleting category:", err);
                alert("Failed to delete category.");
            }
        };

        // Function to edit a category (this could be expanded later for updating category)
        const editCategory = (category) => {
            alert(`Edit category: ${category.name}`); // For now, just an alert, can be extended for actual editing
        };

        // Fetch categories when the component is mounted
        onMounted(fetchCategories);

        return {
            category,
            categories,
            createCategory,
            deleteCategory,
            editCategory,
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

.list-group-item {
    display: flex;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    /* Ensure buttons are hidden until slide */
}

.slide-buttons {
    display: flex;
    gap: 5px;
    transform: translateX(100%);
    /* Initially off-screen */
    transition: transform 0.3s ease-in-out;
    visibility: hidden;
    /* Hidden until slide */
}

.list-group-item:hover .slide-buttons {
    transform: translateX(0);
    /* Slide the buttons into view */
    visibility: visible;
}

.list-group-item:hover {
    background-color: #f8f9fa;
    /* Change background color when hovered */
}
</style>
