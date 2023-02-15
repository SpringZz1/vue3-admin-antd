import { createPermissionGuard } from "./permission-guard";

export function setupRouterGuard(router) {
  createPermissionGuard(router);
}
