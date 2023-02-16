const Layout = () => import("@/layout/index.vue");

export const basicRoutes = [
  // 登录页面, 如果没有token强制重定位到登录页面
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    isHidden: true,
    meta: {
      title: "登录",
      type: "icon-caidan",
    },
  },
  // 工作台
  {
    path: "/",
    name: "Dashboard",
    component: Layout,
    redirect: "/workbench",
    children: [
      {
        path: "/workbench",
        name: "workbench",
        component: () => import("@/views/workbench/index.vue"),
        meta: {
          type: "icon-zhuye",
          title: "工作台",
        },
      },
    ],
  },
  // 外部链接
  {
    path: "/externalLink",
    name: "externalLink",
    component: Layout,
    meta: {
      type: "icon-lianjie",
      title: "外部链接",
    },
    children: [
      {
        path: "https://github.com/SpringZz1/vue3-admin-antd",
        name: "github",
        meta: {
          title: "源码",
          type: "icon-github",
        },
      },
      {
        path: "https://github.com/SpringZz1",
        name: "blog",
        meta: {
          title: "github主页",
          type: "icon-gerenzhongxin-wode-02",
        },
      },
    ],
  },
  // 404页面
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error-page/index.vue"),
    isHidden: true,
  },
];

// 动态路由, 需要用户具有一定的身份才可以访问到
export const asyncRoutes = [
  // 菜单内显示的404页面
  {
    path: "/error-page",
    name: "ErrorPage",
    component: Layout,
    redirect: "/error-page/404",
    meta: {
      type: "icon-gantanhaozhong",
      title: "错误页",
      roles: ["admin", "guest"],
    },
    children: [
      {
        name: "ERROR-404",
        path: "/error-page/404",
        component: () => import("@/views/error-page/index.vue"),
        meta: {
          type: "icon-icon-test",
          title: "404",
        },
      },
    ],
  },
  // 多级菜单
  {
    path: "/multimenu",
    name: "multimenu",
    component: Layout,
    meta: {
      type: "icon-caidan",
      title: "多级菜单",
      roles: ["admin"],
    },
    children: [
      {
        path: "/multimenu/a-1",
        name: "a-1",
        component: () => import("@/views/multimenu/a-1/index.vue"),
        meta: {
          type: "icon-caidan",
          title: "a-1",
        },
        children: [
          {
            path: "/multimenu/a-1-1",
            name: "a-1-1",
            component: () => import("@/views/multimenu/a-1/a-1-1/index.vue"),
            meta: {
              type: "icon-caidan",
              title: "a-1-1",
            },
          },
          {
            path: "/multimenu/a-1-2",
            name: "a-1-2",
            component: () => import("@/views/multimenu/a-1/a-1-2/index.vue"),
            meta: {
              type: "icon-caidan",
              title: "a-1-2",
            },
          },
        ],
      },
      {
        path: "/multimenu/a-2",
        name: "a-2",
        component: () => import("@/views/multimenu/a-2/index.vue"),
        meta: {
          type: "icon-caidan",
          title: "a-2 (单个子菜单)",
        },
      },
    ],
  },
];

export const NOT_FOUND_ROUTE = {
  name: "NotFound",
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  isHidden: true,
};

export const EMPTY_ROUTE = {
  name: "Empty",
  path: "/:pathMatch(.*)*",
  component: null,
};

// export const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: basicRoutes,
// });

// 设置全局登录拦截, 本地没有token则重定位到login首页
// router.beforeEach((to, from, next) => {
//   window.document.title = to.meta.title + " | Vue Admin AntdV";
//   const token = tokenCache.get("token");
//   // 如果token不存在
//   if (!token) {
//     if (to.name === "login") {
//       next();
//     } else {
//       console.log("没有token信息, 重定向至login页面");
//       next({ name: "login" });
//     }
//   } else {
//     next();
//   }
// });
