<script setup>
import { createFromIconfontCN } from "@ant-design/icons-vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3873364_4qdcufrvcx2.js",
});
</script>

<template>
  <a-breadcrumb style="display: inline-block">
    <a-breadcrumb-item
      style="font-size: 15px"
      v-for="item of $route.matched.filter((item) => item.meta.title)"
      :key="item.path"
    >
      <icon-font :type="item.meta.type" style="fontsize: 18px" />
      <router-link :to="item.path">{{ item.meta.title }}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style lang="scss" scoped></style>
