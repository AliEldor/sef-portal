import { createRouter, createWebHistory } from "vue-router";
import { authService } from "../services/axios";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
    return;
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    next("/home");
    return;
  }

  next();
});

export default router;
