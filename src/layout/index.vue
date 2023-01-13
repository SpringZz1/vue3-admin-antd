<script setup>
import { RouterView } from "vue-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExportOutlined,
  GithubOutlined,
  FullscreenOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import LocalCache from "@/utils/storage";
// import axios from "axios";

const collapsed = ref(false);
// eslint-disable-next-line no-unused-vars
const selectedKey = ref(["1"]);

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
};

initValue();
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      style="background-color: #fff"
    >
      <div class="logo" />
      <a-menu theme="light" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 1px" class="header">
        <a-button
          type="primary"
          style="margin-left: 20px"
          @click="toggleCollapsed"
        >
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
        <!-- TODO:这里暂时写死，后期需要换成router的面包屑 -->
        <!-- <a-breadcrumb style="display: inline-block">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item
            ><a href="">Application Center</a></a-breadcrumb-item
          >
          <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
          <a-breadcrumb-item>An Application</a-breadcrumb-item>
        </a-breadcrumb> -->
        <!-- eslint-disable-next-line prettier/prettier -->
        <div>
          <github-outlined style="fontsize: 18px" class="icon" />
          <!-- eslint-disable-next-line prettier/prettier -->
        <FullscreenOutlined style="fontSize: 18px" class="icon" />
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
              style="margin-right: 10px"
            >
              {{ loginInfo.username }} (admin)
            </a>

            <template #overlay>
              <a-menu>
                <a-menu-item key="0">
                  <a target="_blank" rel="noopener noreferrer" href="">
                    <!-- <logout-outlined style="margin-right: 5px" /> -->
                    <export-outlined style="margin-right: 5px" />
                    退出登录
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
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

.test {
  display: inline-block;
}

.icon {
  margin-right: 15px;
  width: 25px;
  height: 25px;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
