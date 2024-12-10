const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "home", component: () => import("pages/HomePage.vue") },
      { path: "create", component: () => import("pages/CreatePage.vue") },
    ],
  },
];

export default routes;
