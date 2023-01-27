import { createPinia } from "pinia";

export function setUpStore(app) {
  app.use(createPinia());
}

export * from "./modules";
