<script setup>
import { ref } from "vue";
import SubMenu from "./SubMenu.vue";
import { useRouter } from "vue-router";
import { menuRoutes } from "@/router/index";
import { createFromIconfontCN } from "@ant-design/icons-vue";

const openKeys = ref([]);

const router = useRouter();

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3873364_4qdcufrvcx2.js",
});

const onOpenChange = (keys) => {
  // 当菜单被展开时触发, 点击已经展开的数组时传入的是空数组, 点击为展开的菜单时传入的是[当前菜单的key, 点击的菜单key]
  const latestOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1);
  openKeys.value = latestOpenKey ? [latestOpenKey] : [];
  // console.log(openKeys.value);
};

// 实现vue内部路由跳转
const menuClick = (path) => {
  // console.log("跳转" + path);
  // 实现点击跳转至外部链接
  if (path.includes("https")) {
    // 如果包含https, 则点击跳转至外部链接
    window.open(path);
  } else {
    // 否则单页跳转
    router.push(path);
  }
};

// console.log(menuRoutes.children);
</script>

<template>
  <!-- 多级嵌套路由 -->
  <a-menu
    theme="light"
    mode="inline"
    :selectedKeys="[$route.path]"
    :openKeys="openKeys"
    @openChange="onOpenChange"
  >
    <template v-for="route of menuRoutes.children" :key="route.path">
      <template v-if="!route.children">
        <a-menu-item :key="route.path" @click="menuClick(route.path)">
          <icon-font :type="route.meta.type" style="fontsize: 18px" />
          <span>{{ route.meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :route="route" :key="route.path" />
      </template>
      <!-- <SubMenu :route="route" /> -->
    </template>
  </a-menu>
</template>

<style lang="scss" scoped></style>
