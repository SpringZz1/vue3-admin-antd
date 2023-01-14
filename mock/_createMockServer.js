import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import modules from "./modules";

export function setupProdMockServer() {
  createProdMockServer(modules);
}
