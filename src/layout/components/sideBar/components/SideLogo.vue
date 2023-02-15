<script setup>
import { useAppStore } from "@/store";
const appStore = useAppStore();
</script>

<template>
  <div class="logo">
    <img class="image" src="@/assets/svg/logo.svg" alt="image" />
    <span class="title" v-show="!appStore.collapsed">Vue Admin AntdV</span>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
