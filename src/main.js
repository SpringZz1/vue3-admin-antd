// import { createApp } from "vue";
// import { setUpStore } from "./store";

// import App from "./App.vue";
// import { router } from "./router";
// import { setUpRouter } from "./router";
import { createApp } from "vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
// import "./assets/main.css";
// 重设样式
import "@/styles/global.css";
import "@/styles/reset.css";

async function setUpApp() {
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);

  // app.use(createPinia());

  app.mount("#app");
}

setUpApp();
// const app = createApp(App);

// app.use(createPinia());
// app.use(router);

// app.mount("#app");
