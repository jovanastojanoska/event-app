import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../store';
import HomeView from "@/views/HomeView.vue";


const router =  createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/login",
      name: "LoginView",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/events",
      name: "EventsList",
      component: () => import("@/views/EventsList.vue"),
    },
    {
      path: "/add-event",
      component: () => import("@/views/AddEvent.vue"),
    },
    {
      path: "/edit-event/:id",
      name: "AddEvent",
      component: () => import("@/views/AddEvent.vue"),
    },
  ],
  
});

router.beforeEach((to, from, next) => {
  
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
  
    next('/login');
  } else {
    next();
  }
});

export default router;