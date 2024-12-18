<template>
    <div class="modal-overlay">
        <div class="modal-content card shadow">
            <h5 class="card-header">Edit Category</h5>
            <div class="card-body">
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="categoryName" class="form-label">Category Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            v-model="localCategory.name"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary me-2" @click="close">Cancel</button>
                        <button type="submit" class="btn btn-success">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
    props: {
        category: {
            type: Object,
            required: true,
        },
    },
    emits: ["close", "update"],
    setup(props, { emit }) {
        const localCategory = ref({ ...props.category });

        // Watch for prop changes to keep modal data synced
        watch(
            () => props.category,
            (newCategory) => {
                localCategory.value = { ...newCategory };
            }
        );

        const handleSubmit = () => {
            emit("update", localCategory.value); // Pass updated category back to parent
        };

        const close = () => {
            emit("close");
        };

        return { localCategory, handleSubmit, close };
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.modal-content {
    width: 100%;
    max-width: 500px;
    background: #fff;
    border-radius: 8px;
}
</style>
