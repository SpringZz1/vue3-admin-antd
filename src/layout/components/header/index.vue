<script setup>
import MenuCollapse from "./components/MenuCollapse.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import FullScreen from "./components/FullScreen.vue";
import Avatar from "./components/Avatar.vue";
</script>

<template>
  <div class="header">
    <div>
      <MenuCollapse />
      <Breadcrumb style="margin-left: 10px" />
    </div>
    <div style="display: flex; align-items: center">
      <FullScreen />
      <Avatar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
