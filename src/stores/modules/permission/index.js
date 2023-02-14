import { defineStore } from "pinia";
import { basicRoutes, asyncRoutes } from "../../../router";

/**
 * 判断用户是否有权限拜访单个路由
 * roles: 用户角色
 * route: 访问的路由
 */
const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    // 如果路由的roles包含了用户的角色，包含就返回true
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role);
      } else {
        return false;
      }
    });
  } else {
    return true;
  }
};

/**
 * 筛选可访问的动态路由
 * roles: 用户角色
 * route: 访问的动态列表
 */
const filterAsyncRoutes = (roles, routes) => {
  const res = [];
  routes.forEach((route) => {
    const r = { ...route };
    if (hasPermission(roles, r)) {
      // 如果有children, 递归
      if (r.children) {
        r.children = filterAsyncRoutes(roles, r.children);
      }
      res.push(r);
    }
  });
  return res;
};

export const usePermission = defineStore("permissoin", {
  state() {
    return {
      accessRoutes: [],
    };
  },
  getters: {
    routes() {
      return basicRoutes.concat(this.accessRoutes);
    },
    menuRoutes() {
      // return this.routes.find((route) => route.name === "index");
      return this.routes.filter((route) => route.name && !route.isHidden);
    },
  },
  actions: {
    generateRoutes(role = []) {
      const accessRoutes = filterAsyncRoutes(role, asyncRoutes);
      this.accessRoutes = accessRoutes;
      return accessRoutes;
    },
  },
});
