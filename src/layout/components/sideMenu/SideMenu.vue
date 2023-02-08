<script setup>
import { computed } from "vue";
// import SubMenu from "./subMenu.vue";
import { sideMenu } from "@/api/config.js";
import { useRouter } from "vue-router";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import SubMenu from "./SubMenu.vue";

const router = useRouter();
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3873364_4qdcufrvcx2.js",
});
// const IconFont = createFromIconfontCN({
//   scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
// });

const hasChildren = computed(() => {
  return sideMenu.filter((item) => item.children);
});

const noChildren = computed(() => {
  return sideMenu.filter((item) => !item.children);
});

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
</script>

<template>
  <div>
    <a-menu theme="light" mode="inline" :selectedKeys="[$route.path]">
      <!-- 不存在子路由 -->
      <template v-for="item in noChildren" :key="item.path">
        <a-menu-item @click="menuClick(item.path)">
          <!-- eslint-disable-next-line prettier/prettier -->
            <icon-font :type="item.type" style="fontSize: 18px" />

          <span>{{ item.title }}</span>
        </a-menu-item>
      </template>
      <!-- 存在子路由, 递归 -->
      <!-- <SubMenu :children="hasChildren" /> -->
      <!-- <template v-for="item in hasChildren" :key="item.path">
        <a-sub-menu @click="menuClick(item.path)">
          <template #title>
            eslint-disable-next-line prettier/prettier
              <icon-font :type="item.type" style="fontSize: 18px"/>
            <span>{{ item.title }}</span></template
          >
          <a-menu-item
            v-for="sub of item.children"
            @click="menuClick(sub.path)"
            :key="sub.path"
          >
            eslint-disable-next-line prettier/prettier
              <icon-font :type="sub.type" style="fontSize: 18px"/>
            {{ sub.title }}
          </a-menu-item>
        </a-sub-menu>
      </template> -->
    </a-menu>
  </div>
</template>

<style lang="scss" scoped></style>
