<template>
  <div class="container">
    <div class="login-container">
      <div class="svg-container">
        <img class="image" src="@/assets/images/login_banner.webp" alt="" />
      </div>
      <div class="input-container">
        <h5>
          <img src="@/assets/svg/logo.svg" alt="logo" />
          <span>Vue Naive Admin</span>
        </h5>
        <div>
          <a-input
            v-model:value="loginInfo.username"
            autofocus
            placeholder="admin"
            :maxlength="20"
            class="input-box"
          >
          </a-input>
        </div>
        <div>
          <a-input-password
            v-model:value="loginInfo.password"
            placeholder="123456"
            :maxlength="20"
            show-password-on="mousedown"
            type="password"
            class="input-box"
          >
          </a-input-password>
        </div>
        <div>
          <a-checkbox v-model:checked="loginInfo.remember">记住我</a-checkbox>
        </div>
        <div>
          <a-button type="primary" class="button" @click="loginHandle"
            >登录</a-button
          >
        </div>
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import LocalCache from "@/utils/storage";
import LoginCheck from "@/utils/loginCheck";
import CookiesCache from "@/utils/cookies";
import TokenCache from "@/utils/token";
import api from "./api";
import Mock from "mockjs";
import { useUserStore } from "@/stores";
import AppFooter from "@/components/common/AppFooter.vue";

const router = useRouter();

const loginInfo = ref({
  username: "",
  password: "",
  remember: false,
});

const initLoginInfo = () => {
  const localLoginInfo = LocalCache.get("loginInfo");
  if (localLoginInfo) {
    loginInfo.value.username = localLoginInfo.username || "";
    loginInfo.value.password = localLoginInfo.password || "";
    loginInfo.value.remember = localLoginInfo.remember || false;
  }
  // TODO: 测试pinia, 后续需要删除
  const userStore = useUserStore();
  userStore.getUserInfo();
};

// 生命周期时登录信息初始化
initLoginInfo();

const loginHandle = () => {
  // TODO: 这里暂时只提供跳转功能，后续添加身份验证功能
  // 解构信息
  const { username, password, remember } = loginInfo.value;
  // console.log();
  api.login({ username, password: password.toString() }).then((res) => {
    // console.log(res);
    // 如果没输入身份信息
    if (!LoginCheck.check(username, password)) {
      message.error("请输入账号和密码!");
    } else {
      // 如果身份信息输入正确
      if (res.data.code === 0) {
        message.success("登录成功");
        // mock模拟token数据并保存在cookie中
        const token = res.data.data;
        // CookiesCache.set("token", token);
        TokenCache.set("token", token);
        // 如果"记住我"按下, 保存信息到本地
        if (remember) {
          LocalCache.set("loginInfo", loginInfo);
        } else {
          LocalCache.remove("loginInfo");
        }
        router.push("/workbench");
      } else {
        message.error("账号或密码错误");
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/login_bg.webp") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login-container {
  display: flex;
  width: 700px;
  height: 425px;
  background: rgba($color: #ffffff, $alpha: 0.6);
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(50, 48, 48, 0.2);
  padding: 15px;

  .svg-container {
    width: 380px;
    padding: 35px 20px;

    .image {
      width: 100%;
    }
  }
  .input-container {
    width: 320px;
    padding: 35px 20px;

    h5 {
      font-size: 23px;
      color: #6a6a6a;
      font-weight: 500;
      padding: 6px;
      margin-bottom: 10px;

      img {
        width: 43px;
        vertical-align: middle;
        margin-right: 17px;
      }
    }

    .input-box {
      margin: 15px 0;
      padding: 8px;
      font-size: 16;
    }

    .button {
      background-color: #316c72;
      width: 100%;
      height: 50%;
      padding: 10px;
      margin-top: 20px;
      border-radius: 5px;
      font-size: 16px;
    }
  }
}
</style>
