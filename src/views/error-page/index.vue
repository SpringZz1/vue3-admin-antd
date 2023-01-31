<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const backToMenu = () => {
  router.push("/workbench");
};
</script>

<template>
  <div class="container">
    <img src="../../assets/images/404.webp" alt="empty" />
    <span>抱歉, 你访问的页面不存在。</span>
    <a-button class="btn" @click="backToMenu">Default Button</a-button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btn {
  margin-top: 15px;
  background: transparent;
}

.btn:hover {
  color: black;
  border-color: gray;
}
</style>
