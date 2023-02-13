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
  <div style="background-color: #fff; padding: 20px" class="card">
    <a-row :gutter="16">
      <a-col :span="10">
        <a-card class="card">
          <p style="font-size: 18px">按钮 Button</p>
          <a-button type="primary" class="btn">Primary</a-button>
          <a-button class="btn">Default</a-button>
          <a-button type="dashed" class="btn">Dashed</a-button>
          <a-button danger class="btn">Danger</a-button>
          <a-button type="link" class="btn">Link</a-button>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card>
          <p style="font-size: 18px">通知 Notification</p>
          <a-button
            type="primary"
            class="btn"
            @click="() => openNotificationWithIcon('success')"
            >Success</a-button
          >
          <a-button class="btn" @click="() => openNotificationWithIcon('info')"
            >Info</a-button
          >
          <a-button
            class="btn"
            @click="() => openNotificationWithIcon('warning')"
            >Warning</a-button
          >
          <a-button
            danger
            class="btn"
            @click="() => openNotificationWithIcon('error')"
            >Error</a-button
          >
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="scss" scoped></style>
