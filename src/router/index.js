import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

export default createRouter({
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
