<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import LocalCache from "@/utils/storage";
import { useUserStore, useAppStore } from "@/store";
import AppFooter from "@/components/common/AppFooter.vue";
import SideBar from "./components/sideBar/index.vue";
import Header from "./components/header/index.vue";

// const collapsed = ref(false);

const loginInfo = ref({
  username: "",
  password: "",
  remember: false,
});

const initValue = () => {
  const localLoginInfo = LocalCache.get("loginInfo");
  if (localLoginInfo) {
    loginInfo.value.username = localLoginInfo.username || "";
    loginInfo.value.password = localLoginInfo.password || "";
    loginInfo.value.remember = localLoginInfo.remember || false;
  }
};

initValue();
// 使用pinia获得持久化的用户信息
const userStore = useUserStore();
userStore.getUserInfo();

const appStore = useAppStore();
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="appStore.collapsed"
      :trigger="null"
      collapsible
      style="
        background-color: #fff;
        border-right: 1px solid #86909c45;
        padding: 2px;
      "
      width="240px"
    >
      <SideBar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 1px">
        <div>
          <Header />
        </div>
      </a-layout-header>
      <div class="content">
        <RouterView />
        <footer class="footer">
          <AppFooter v-if="$route.meta.title !== '404'" />
        </footer>
      </div>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
#components-layout-demo-side {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

.footer {
  display: flex;
  justify-content: center;
}
</style>
