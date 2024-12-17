<template>
    <div class="card shadow-lg mb-4" style="width: 18rem;">
        <img :src="getImageUrl(recipe.image)" class="card-img-top" :alt="recipe.name">
        <div class="card-body">
            <h5 class="card-title">{{ recipe.name }}</h5>
            <p class="card-text">
                <strong>Time to Cook:</strong> {{ recipe.time_to_cook }} mins
            </p>
            <p class="card-text">
                <strong>Category:</strong> {{ recipe.category?.name || 'N/A' }}
            </p>
            <button class="btn btn-primary me-2" @click="onEdit(recipe)">Edit</button>
            <button class="btn btn-danger" @click="onDelete">Delete</button>
        </div>

        <!-- Unique Modal ID -->
        <input type="checkbox" :id="`editModalToggle-${recipe.id}`" class="modal-toggle" />

        <!-- Edit Modal -->
        <div class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Update Recipe</h5>
                        <label :for="`editModalToggle-${recipe.id}`" class="btn-close">X</label>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="updateRecipe" enctype="multipart/form-data">
                            <div class="mb-3">
                                <label for="name" class="form-label">Recipe Name</label>
                                <input type="text" class="form-control" v-model="updatedRecipe.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="time_to_cook" class="form-label">Time to Cook</label>
                                <input type="number" class="form-control" v-model="updatedRecipe.time_to_cook" required>
                            </div>
                            <div class="mb-3">
                                <label for="image" class="form-label">Upload Image</label>
                                <input type="file" class="form-control" @change="onFileSelected">
                            </div>
                            <button type="submit" class="btn btn-success">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../axios";  // Axios instance for API calls

const props = defineProps({
    recipe: Object
});

const updatedRecipe = ref({ ...props.recipe });
const selectedFile = ref(null);

const getImageUrl = (image) => `http://127.0.0.1:8000/storage/${image}`;

const onEdit = (recipe) => {
    updatedRecipe.value = { ...recipe };
    const modalToggle = document.getElementById(`editModalToggle-${recipe.id}`);
    modalToggle.checked = true;
};

const onFileSelected = (event) => {
    selectedFile.value = event.target.files[0];
};

const updateRecipe = async () => {
    try {
        const formData = new FormData();
        formData.append("name", updatedRecipe.value.name);
        formData.append("time_to_cook", updatedRecipe.value.time_to_cook);
        formData.append("category_id", updatedRecipe.value.category.id);

        if (selectedFile.value) {
            formData.append("image", selectedFile.value);
        }

        // Log formData content
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        await api.post(`/api/recipes/${props.recipe.id}?_method=PUT`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Recipe updated successfully!");
        window.location.reload();
    } catch (err) {
        console.error("Server response:", err.response?.data);
        alert(`Failed to update the recipe: ${JSON.stringify(err.response?.data?.errors || err.message)}`);
    }
};

</script>


<style scoped>
.card-img-top {
    height: 200px;
    object-fit: cover;
}

/* Modal styles */
.modal-toggle {
    display: none;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.modal-toggle:checked+.modal {
    display: flex;
}

.modal-dialog {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 50%;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header .btn-close {
    cursor: pointer;
}

.modal-body {
    padding-top: 10px;
}
</style>
