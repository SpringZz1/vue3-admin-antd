import { createRouter, createWebHistory } from "vue-router";
import { setupRouterGuard } from "./guard";
import { basicRoutes, EMPTY_ROUTE, NOT_FOUND_ROUTE } from "./routes";
import { useUserStore, usePermissionStore } from "@/store";
import { getToken } from "@/utils";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes,
});

export async function setupRouter(app) {
  await addDynamicRoutes();
  setupRouterGuard(router);
  app.use(router);
}

export async function addDynamicRoutes() {
  const token = getToken();
  // 如果没有token
  if (!token) {
    return { path: "/login" };
  }

  // 有token
  try {
    const permissionStore = usePermissionStore();
    const userStore = useUserStore();
    // 如果没有用户角色就去获取
    !userStore.userRole && (await userStore.getUserInfo());
    const accessRoutes = permissionStore.generateRoutes(userStore.userRole);
    accessRoutes.forEach((route) => {
      // 动态添加路由
      !router.hasRoute(route.name) && router.addRoute(route);
      router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name);
      router.addRoute(NOT_FOUND_ROUTE);
    });
  } catch (e) {
    console.log(e);
  }
}
