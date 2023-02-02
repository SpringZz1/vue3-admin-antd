<script setup>
import { RouterView } from "vue-router";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExportOutlined,
  GithubOutlined,
  FullscreenOutlined,
} from "@ant-design/icons-vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { computed, ref } from "vue";
import LocalCache from "@/utils/storage";
import { useRouter } from "vue-router";
// import axios from "axios";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3873364_4qdcufrvcx2.js",
});
const collapsed = ref(false);
// eslint-disable-next-line no-unused-vars
const selectedKey = ref(["1"]);

const router = useRouter();
// const route = useRoute();
const menu = ref([
  {
    key: 1,
    title: "工作台",
    path: "/workbench",
    type: "icon-zhuye",
  },
  {
    key: 2,
    title: "外部链接",
    path: "/externalLink",
    type: "icon-lianjie",
    children: [
      {
        path: "https://github.com/SpringZz1/vue3-admin-antd",
        name: "github",
        title: "源码",
        type: "icon-github",
      },
      {
        path: "https://github.com/SpringZz1",
        name: "blog",
        title: "github主页",
        type: "icon-gerenzhongxin-wode-02",
      },
    ],
  },
  {
    key: 3,
    title: "多级菜单",
    path: "/multimenu",
    type: "icon-caidan",
    children: [
      {
        title: "多级菜单",
        path: "/multimenu",
        type: "icon-caidan",
        children: {
          title: "多级菜单",
          path: "/multimenu",
          type: "icon-caidan",
        },
      },
    ],
  },
  {
    key: 4,
    title: "404",
    path: "/404",
    type: "icon-icon-test",
  },
]);

const hasChildren = computed(() => {
  return menu.value.filter((item) => item.children);
});

const noChildren = computed(() => {
  return menu.value.filter((item) => !item.children);
});

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

// 实现vue内部路由跳转
const menuClick = (path) => {
  console.log("跳转" + path);
  router.push(path);
};
// 实现点击跳转至外部链接
const routeToExt = (url) => {
  window.open(url);
};

initValue();
// getMenuItem($route);
// console.log(route.meta);
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
      <a-menu theme="light" mode="inline" :selectedKeys="[$route.path]">
        <template v-for="item in noChildren" :key="item.path">
          <a-menu-item @click="menuClick(item.path)">
            <!-- eslint-disable-next-line prettier/prettier -->
            <icon-font :type="item.type" style="fontSize: 18px" />
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
        <!-- 一级菜单 -->
        <template v-for="item in hasChildren" :key="item.path">
          <a-sub-menu @click="menuClick(item.path)">
            <template #title>
              <!-- eslint-disable-next-line prettier/prettier -->
              <icon-font :type="item.type" style="fontSize: 18px"/>
              <span>{{ item.title }}</span></template
            >
            <a-menu-item
              v-for="sub of item.children"
              @click="routeToExt(sub.path)"
              :key="sub.path"
            >
              <!-- eslint-disable-next-line prettier/prettier -->
              <icon-font :type="sub.type" style="fontSize: 18px"/>
              {{ sub.title }}
            </a-menu-item>
          </a-sub-menu>
        </template>
        <!-- <a-sub-menu key="sub4">
          <template #title>Navigation Three</template>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu> -->
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
              {{ loginInfo.username }}
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
      <div class="content">
        <RouterView />
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
  height: 32px;
  margin: 16px;
  background: rgba(200, 12, 12, 0.3);
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

.content {
  width: 100%;
  height: 100vh;
  padding: 10px;
}
</style>
