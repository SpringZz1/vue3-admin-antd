<script setup>
import { notification } from "ant-design-vue";
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Notification Title",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  });
};
</script>

<template>
  <div>
    <a-card title="按钮 Button" style="width: 100%">
      <a-button @click="() => openNotificationWithIcon('success')"
        >Success</a-button
      >
      <a-button @click="() => openNotificationWithIcon('info')">Info</a-button>
      <a-button @click="() => openNotificationWithIcon('warning')"
        >Warning</a-button
      >
      <a-button @click="() => openNotificationWithIcon('error')"
        >Error</a-button
      >
    </a-card>
  </div>
</template>

<style lang="scss" scoped></style>
