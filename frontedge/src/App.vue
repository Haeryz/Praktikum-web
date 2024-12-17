<template>
  <div id="app">
    <Navbar />
    <router-view></router-view> <!-- This renders the current route's component -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>
