<script setup>
import { useRouter } from "vue-router";
import { createFromIconfontCN } from "@ant-design/icons-vue";
const router = useRouter();

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3873364_4qdcufrvcx2.js",
});

// 解构父组件传来的menuRoutes
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
});

// console.log(props.route.children);

// 实现vue内部路由跳转
const menuClick = (path) => {
  console.log("跳转" + path);
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
  <a-sub-menu :key="route.path">
    <template #title>
      <icon-font :type="route.meta.type" style="fontsize: 18px" />
      <span>{{ route.meta.title }}</span></template
    >
    <template v-for="item in route.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path" @click="menuClick(item.path)">
          <icon-font :type="item.meta.type" style="fontsize: 18px" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :route="item" :key="item.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<style lang="scss" scoped></style>
