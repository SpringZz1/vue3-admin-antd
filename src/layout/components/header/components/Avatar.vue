<script setup>
import { useUserStore } from "@/stores";
import { ExportOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
// // 退出登录
const logout = () => {
  // TODO: 点击弹出对话框功能, 退出后相关的操作还未实现
  Modal.confirm({
    title: "确定退出登录?",
    centered: true,
    okText: "确定",
    cancelText: "取消",
    onOk() {
      console.log("OK");
      router.replace("/login");
    },
    onCancel() {
      console.log("Cancel");
    },
    class: "test",
  });
};
</script>

<template>
  <div style="display: flex; align-items: center">
    <img
      src="@/assets/images/avatar.png"
      alt="avatar"
      class="avatar"
      @click.prevent
    />
    <a-dropdown>
      <a
        class="ant-dropdown-link"
        @click.prevent
        style="margin: 0 7px 0 7px; font-size: 18px"
      >
        {{ userStore.username }}
      </a>

      <template #overlay>
        <a-menu>
          <a-menu-item key="0" @click="logout">
            <export-outlined style="margin-right: 5px" />
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: 30px;
  border-radius: 50%;
}
</style>
