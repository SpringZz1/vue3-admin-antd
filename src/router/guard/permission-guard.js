import { getToken } from "@/utils";

const whiteList = ["/login", "/404"];
// 设置全局登录拦截, 本地没有token则重定位到login首页

export function createPermissionGuard(router) {
  router.beforeEach(async (to) => {
    window.document.title = to.meta.title + " | Vue Admin AntdV";
    const token = getToken();

    // 没有token情况
    if (!token) {
      if (whiteList.includes(to.path)) return true;
      return { path: "/login" };
    } else {
      if (to.path === "/login") return { path: "/" };
    }
  });
}

