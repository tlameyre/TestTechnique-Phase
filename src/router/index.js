import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Experience from "../views/Experience.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: '/experience',
      name: 'Experience',
      component: Experience
    }
  ],
});

export default router;
