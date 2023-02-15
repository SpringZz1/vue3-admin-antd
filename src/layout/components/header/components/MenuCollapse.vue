<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { useAppStore } from "@/store";
const appStore = useAppStore();
</script>

<template>
  <a-button
    type="primary"
    style="margin-left: 20px; margin-right: 10px"
    @click="appStore.switchCollapsed"
  >
    <MenuUnfoldOutlined v-if="appStore.collapsed" />
    <MenuFoldOutlined v-else />
  </a-button>
</template>

<style lang="scss" scoped></style>
