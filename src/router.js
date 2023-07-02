import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/", component: () => import("./views/Home") },
  { path: "/login", component: () => import("./views/Login") },
  { path: "/register", component: () => import("./views/Register") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
