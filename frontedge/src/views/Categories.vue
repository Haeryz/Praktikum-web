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
                <li v-for="(cat) in categories" :key="cat.id"
                    class="list-group-item d-flex justify-content-between align-items-center">
                    <span>{{ cat.name }}</span>
                    <div>
                        <button @click="openEditModal(cat)" class="btn btn-warning btn-sm me-2">Edit</button>
                        <button @click="deleteCategory(cat.id)" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Edit Modal -->
        <EditCategoryModal v-if="showEditModal" :category="editableCategory" @close="closeEditModal"
            @update="updateCategory" />
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../axios";
import EditCategoryModal from "../components/EditCategoryModal.vue";

export default {
    name: "Category",
    components: { EditCategoryModal },
    setup() {
        const category = ref({ name: "" });
        const categories = ref([]);
        const showEditModal = ref(false);
        const editableCategory = ref(null);

        // Fetch categories
        const fetchCategories = async () => {
            try {
                const response = await api.get("/api/categories");
                categories.value = response.data;
            } catch (err) {
                console.error("Error fetching categories:", err);
                alert("Failed to fetch categories.");
            }
        };

        // Create a new category
        const createCategory = async () => {
            try {
                const response = await api.post("/api/categories", category.value);
                categories.value.push(response.data);
                category.value.name = "";
                alert("Category created successfully!");
            } catch (err) {
                console.error("Error creating category:", err);
                alert("Failed to create category.");
            }
        };

        // Delete a category
        const deleteCategory = async (id) => {
            try {
                await api.delete(`/api/categories/${id}`);
                categories.value = categories.value.filter((cat) => cat.id !== id);
                alert("Category deleted successfully!");
            } catch (err) {
                console.error("Error deleting category:", err);
                alert("Failed to delete category.");
            }
        };

        // Open edit modal
        const openEditModal = (category) => {
            editableCategory.value = { ...category }; // Clone the category to avoid direct modification
            showEditModal.value = true;
        };

        // Close edit modal
        const closeEditModal = () => {
            showEditModal.value = false;
            editableCategory.value = null;
        };

        // Update category
        const updateCategory = async (updatedCategory) => {
            try {
                const response = await api.put(`/api/categories/${updatedCategory.id}`, updatedCategory);
                const index = categories.value.findIndex((cat) => cat.id === updatedCategory.id);
                if (index !== -1) categories.value[index] = response.data;
                alert("Category updated successfully!");
            } catch (err) {
                console.error("Error updating category:", err);
                alert("Failed to update category.");
            } finally {
                closeEditModal();
            }
        };

        onMounted(fetchCategories);

        return {
            category,
            categories,
            createCategory,
            deleteCategory,
            openEditModal,
            closeEditModal,
            updateCategory,
            showEditModal,
            editableCategory,
        };
    },
};
</script>

<style scoped>
.card {
    width: 100%;
    max-width: 500px;
}

.btn {
    margin-top: 10px;
}
</style>
