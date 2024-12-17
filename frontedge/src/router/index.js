import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Recipe from "../views/Recipe.vue";
import Categories from "../views/Categories.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recipe",
    name: "Recipe",
    component: Recipe,
  },
  {
    path: "/category",
    name: "Category",
    component: Categories,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
