<script setup>
import { useUserStore } from "@/store";
const userStore = useUserStore();
</script>

<template>
  <a-card style="width: 100%" class="card">
    <div style="display: flex; align-items: center">
      <img :src="userStore.userAvatar" alt="头像" class="image" />
      <div style="margin-left: 15px">
        <p style="font-size: 18px; margin-top: 10px">
          Hello, {{ userStore.username }}
        </p>
        <p style="color: gray">今天你学习了吗？</p>
      </div>
    </div>
  </a-card>
</template>

<style lang="scss" scoped>
.card {
  border-radius: 12px;
  margin: 10px 0 15px 0;
}
.btn {
  margin-right: 10px;
}

.image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
