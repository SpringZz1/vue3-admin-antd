<script setup>
import { RouterView } from "vue-router";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExportOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons-vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { ref } from "vue";
import LocalCache from "@/utils/storage";
import { useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";
import { useUserStore } from "@/stores";
import AppFooter from "@/components/common/AppFooter.vue";
import SideMenu from "./components/sideMenu/SideMenu.vue";
import { Modal } from "ant-design-vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3873364_4qdcufrvcx2.js",
});

const { isFullscreen, toggle } = useFullscreen();
const collapsed = ref(false);

const router = useRouter();

const loginInfo = ref({
  username: "",
  password: "",
  remember: false,
});

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};

const initValue = () => {
  const localLoginInfo = LocalCache.get("loginInfo");
  if (localLoginInfo) {
    loginInfo.value.username = localLoginInfo.username || "";
    loginInfo.value.password = localLoginInfo.password || "";
    loginInfo.value.remember = localLoginInfo.remember || false;
  }
  // console.log("1111");
  // console.log(menuRoutes);
};

// // 退出登录
const logout = () => {
  // TODO: 点击弹出对话框功能, 退出后相关的操作还未实现
  Modal.confirm({
    title: "确定退出登录?",
    centered: true,
    okText: "确定",
    cancelText: "取消",
    onOk() {
      console.log("OK");
      router.replace("/login");
      // useUserStore.logout();
    },
    onCancel() {
      console.log("Cancel");
    },
    class: "test",
  });
};

initValue();
// 使用pinia获得持久化的用户信息
const userStore = useUserStore();
userStore.getUserInfo();
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      style="
        background-color: #fff;
        border-right: 1px solid #86909c45;
        padding: 2px;
      "
      width="240px"
    >
      <div class="logo">
        <img class="image" src="@/assets/svg/logo.svg" alt="image" />
        <span class="title" v-show="!collapsed">Vue Admin AntdV</span>
      </div>

      <SideMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 1px" class="header">
        <div>
          <a-button
            type="primary"
            style="margin-left: 20px; margin-right: 10px"
            @click="toggleCollapsed"
          >
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
          </a-button>
          <a-breadcrumb style="display: inline-block">
            <a-breadcrumb-item
              style="font-size: 15px"
              v-for="item of $route.matched.filter((item) => item.meta.title)"
              :key="item.path"
            >
              <!-- eslint-disable-next-line prettier/prettier -->
              <icon-font :type="item.meta.type" style="fontSize: 18px" />
              <router-link :to="item.path">{{ item.meta.title }}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <!-- eslint-disable-next-line prettier/prettier -->
        <div>
          <!-- eslint-disable-next-line prettier/prettier -->
          <FullscreenOutlined class="icon" @click="toggle" v-if="!isFullscreen"/>
          <FullscreenExitOutlined
            v-else
            @click="toggle"
            style="fontsize: 18px"
            class="icon"
          ></FullscreenExitOutlined>
          <img
            src="../assets/images/avatar.png"
            alt="avatar"
            class="avatar"
            @click.prevent
          />

          <a-dropdown>
            <a
              class="ant-dropdown-link"
              @click.prevent
              style="margin: 0 7px 0 7px; font-size: 18px"
            >
              <!-- {{ loginInfo.username }} -->
              {{ userStore.username }}
            </a>

            <template #overlay>
              <a-menu>
                <a-menu-item key="0" @click="logout">
                  <!-- <a target="_blank" rel="noopener noreferrer" href=""> -->
                  <export-outlined style="margin-right: 5px" />
                  退出登录
                  <!-- </a> -->
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
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

.logo {
  height: 42px;
  margin: 16px;
}

.image {
  /* display: inline-block; */
  float: left;
  height: 100%;
  margin-right: 5px;
  margin-left: 7px;
  line-height: 42px;
}

.title {
  display: inherit;
  font-size: 18px;
  font-weight: bold;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
  line-height: 42px;
  text-align: center;
}

.site-layout .site-layout-background {
  background: #fff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
}

.icon {
  margin-right: 10px;
  width: 25px;
  height: 25px;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.content {
  width: 100%;
  height: 100vh;
  padding: 10px;
}

.footer {
  display: flex;
  justify-content: center;
}
</style>
