// import { router } from "./index";
import tokenCache from "@/utils/token";
// import { useUserStore, usePermission } from "@/stores";

const whiteList = ["/login", "/404"];
// 设置全局登录拦截, 本地没有token则重定位到login首页

export function createPermissionGuard(router) {
  router.beforeEach(async (to) => {
    window.document.title = to.meta.title + " | Vue Admin AntdV";
    // console.log(to);
    const token = tokenCache.get("token");

    // 没有token情况
    if (!token) {
      if (whiteList.includes(to.path)) return true;
      return { path: "/login" };
    } else {
      if (to.path === "/login") return { path: "/" };
    }
  });
}
// router.beforeEach((to, from, next) => {
//   window.document.title = to.meta.title + " | Vue Admin AntdV";
//   const token = tokenCache.get("token");
//   // 判断用户是否登录
//   if (token) {
//     // 如果已经登录, 并准备进入login页面, 则重定位到主页
//     if (to.path === "/login") {
//       next({ path: "/" });
//     } else {
//       // 获取用户的角色
//       const userStore = useUserStore();
//       const roles = userStore.userRole;
//       // 生成动态路由
//       const permission = usePermission();
//       const accessRoutes = permission.generateRoutes(roles);
//       // 此时动态路由生成, 设置replace: true, 因此导航不会留下历史记录
//       next({ ...to, replace: true });
//     }
//   } else {
//     // 如果没有token
//     if (whiteList.includes(to.path)) {
//       // 如果在免登录的白名单中, 则直接进入
//       next();
//     } else {
//       // 否则重新定位到登录页面
//       next({ path: "/login" });
//     }
//   }
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
