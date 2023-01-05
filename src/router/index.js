import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "../layout/index.vue";
import WorkBench from "../views/workbench/index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/login",
      children: [
        {
          path: "/workbench",
          name: "workbench",
          // component: () => import("../views/workbench/index.vue"),
          component: WorkBench,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    // {
    //   path: "/workbench",
    //   name: "workbench",
    //   children: [],
    //   component: () => import("../views/workbench/index.vue"),
    // },
  ],
});

export default router;
