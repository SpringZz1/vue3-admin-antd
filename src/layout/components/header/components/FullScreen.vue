<script setup>
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons-vue";
import { useFullscreen } from "@vueuse/core";
const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <div style="display: flex; align-items: center">
    <FullscreenOutlined class="icon" @click="toggle" v-if="!isFullscreen" />
    <FullscreenExitOutlined
      v-else
      @click="toggle"
      style="fontsize: 18px"
      class="icon"
    ></FullscreenExitOutlined>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  margin-right: 10px;
  /* width: 25px; */
  /* height: 25px; */
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
