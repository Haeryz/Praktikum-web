<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid d-flex justify-content-center">
            <!-- Brand/Logo -->
            <a class="navbar-brand" href="/"
                style="font-size: 28px; font-weight: bold; text-transform: uppercase; background: linear-gradient(to right, cyan, blue, purple); -webkit-background-clip: text; color: transparent;">
                Product Store 🛒
            </a>

            <!-- Toggle button for mobile view -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar Links -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <!-- Create Button -->
                    <li class="nav-item">
                        <router-link to="/recipe" class="btn btn-outline-primary me-2">
                            <i class="fas fa-plus-square" style="font-size: 20px;"></i>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/category" class="btn btn-outline-primary me-2">
                            <i class="MdCategory" style="font-size: 20px;"></i>
                        </router-link>
                    </li>

                    <!-- Dark/Light Mode Toggle -->
                    <li class="nav-item">
                        <button class="btn btn-outline-secondary" @click="toggleColorMode">
                            <i :class="colormode === 'light' ? 'fas fa-moon' : 'fas fa-sun'"
                                style="font-size: 20px;"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            colormode: 'light', // 'light' or 'dark'
        };
    },
    methods: {
        toggleColorMode() {
            this.colormode = this.colormode === 'light' ? 'dark' : 'light';
            // Here you can add logic to toggle the CSS classes for dark/light mode, if needed
            document.body.classList.toggle('bg-dark', this.colormode === 'dark');
            document.body.classList.toggle('bg-light', this.colormode === 'light');
        },
    },
};
</script>

<style scoped>
/* Optional: You can add additional styles for your navbar */
</style>