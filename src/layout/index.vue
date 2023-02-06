<script setup>
import { RouterView } from "vue-router";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExportOutlined,
  FullscreenOutlined,
} from "@ant-design/icons-vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { computed, ref } from "vue";
import LocalCache from "@/utils/storage";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores";
import AppFooter from "@/components/common/AppFooter.vue";
import { sideMenu } from "@/api/config.js";
import { Modal } from "ant-design-vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3873364_4qdcufrvcx2.js",
});
const collapsed = ref(false);

const router = useRouter();

const hasChildren = computed(() => {
  return sideMenu.filter((item) => item.children);
});

const noChildren = computed(() => {
  return sideMenu.filter((item) => !item.children);
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
  // console.log(route.matched);
  // 实现点击跳转至外部链接
  if (path.includes("https")) {
    // 如果包含https, 则点击跳转至外部链接
    window.open(path);
  } else {
    // 否则单页跳转
    router.push(path);
  }
};

const showConfirm = () => {
  Modal.confirm({
    title: "Do you Want to delete these items?",
    // icon: createVNode(ExclamationCircleOutlined),
    // content: createVNode('div', {
    //   style: 'color:red;',
    // }, 'Some descriptions'),
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
    class: "test",
  });
};

// 退出登录
const logout = () => {
  // TODO: 点击弹出对话框功能, 退出后相关的操作还未实现
  Modal.confirm({
    title: "确定退出登录?",
    // icon: createVNode(ExclamationCircleOutlined),
    // content: createVNode('div', {
    //   style: 'color:red;',
    // }, 'Some descriptions'),
    centered: true,
    onOk() {
      console.log("OK");
      router.push("/login");
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
// console.log(userStore.username);
// console.log("$route.matched");
// const route = useRoute();
// console.log(route.matched);
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      style="background-color: #fff"
      width="240px"
    >
      <div class="logo">
        <img class="image" src="@/assets/svg/logo.svg" alt="image" />
        <span class="title" v-show="!collapsed">Vue Admin AntdV</span>
      </div>
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
              @click="menuClick(sub.path)"
              :key="sub.path"
            >
              <!-- eslint-disable-next-line prettier/prettier -->
              <icon-font :type="sub.type" style="fontSize: 18px"/>
              {{ sub.title }}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
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
          <!-- TODO:这里暂时写死，后期需要换成router的面包屑 -->
          <a-breadcrumb style="display: inline-block">
            <!-- <a-breadcrumb-item>{{ routes }}</a-breadcrumb-item>
            <a-breadcrumb-item
              ><a href="">Application Center</a></a-breadcrumb-item
            >
            <a-breadcrumb-item
              ><a href="">Application List</a></a-breadcrumb-item
            >
            <a-breadcrumb-item>An Application</a-breadcrumb-item> -->
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
