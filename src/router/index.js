import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "../layout/index.vue";
import WorkBench from "../views/workbench/index.vue";

import localCache from "@/utils/storage";
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
  ],
});

// 设置全局登录拦截, 本地没有loginInfo则重定位到login首页
router.beforeEach((to, from, next) => {
  // 判断有没有登录
  if (!localCache.get("loginInfo")) {
    if (to.name === "login") {
      next();
    } else {
      console.log("没有localstore信息, 重定向至login页面");
      router.push("login");
    }
  } else {
    next();
  }
});

export default router;
