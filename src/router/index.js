import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "../layout/index.vue";
import WorkBench from "../views/workbench/index.vue";
import tokenCache from "../utils/token";

export const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/login",
    meta: {
      type: "icon-caidan",
      // title: "layout",
    },
    children: [
      // 工作台
      {
        path: "/workbench",
        name: "workbench",
        // component: () => import("../views/workbench/index.vue"),
        component: WorkBench,
        meta: {
          type: "icon-zhuye",
          title: "工作台",
        },
      },
      // 外部链接, 拥有子菜单, 展示项目源码和github主页
      {
        path: "/externalLink",
        name: "externalLink",
        meta: {
          type: "icon-lianjie",
          title: "外部链接",
        },
        children: [
          {
            path: "https://github.com/SpringZz1/vue3-admin-antd",
            name: "github",
            title: "源码",
            type: "icon-github",
          },
          {
            path: "https://github.com/SpringZz1",
            name: "blog",
            title: "github主页",
            type: "icon-gerenzhongxin-wode-02",
          },
        ],
      },
      // 404页面
      {
        path: "/404",
        name: "404",
        component: () => import("../views/error-page/index.vue"),
        meta: {
          type: "icon-icon-test",
          title: "404",
        },
      },
      // 多级菜单
      {
        path: "multimenu",
        name: "multimenu",
        component: () => import("../views/multimenu/index.vue"),
        title: "多级菜单",
        meta: {
          type: "icon-caidan",
          title: "多级菜单",
        },
      },
    ],
  },
  // 登录页面, 如果没有输入信息强制重定位到登录页面
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "login",
      type: "icon-caidan",
    },
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

// 设置全局登录拦截, 本地没有loginInfo则重定位到login首页
router.beforeEach((to, from, next) => {
  const token = tokenCache.get("token");
  // 如果token不存在
  if (!token) {
    if (to.name === "login") {
      next();
    } else {
      console.log("没有token信息, 重定向至login页面");
      router.push("login");
    }
  } else {
    next();
  }
});
