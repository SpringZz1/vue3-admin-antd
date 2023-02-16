<script setup>
import { ref, h } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import LocalCache from "@/utils/storage";
import { setToken } from "@/utils";
import api from "./api";
import { addDynamicRoutes } from "@/router";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { useAppStore } from "@/store/modules/app";
import AppFooter from "@/components/common/AppFooter.vue";

const router = useRouter();

const appStore = useAppStore();

const loginInfo = ref({
  username: "",
  password: "",
  remember: false,
});

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "18px",
  },
  spin: true,
});
async function initLoginInfo() {
  const localLoginInfo = LocalCache.get("loginInfo");
  if (localLoginInfo) {
    loginInfo.value.username = localLoginInfo.username || "";
    loginInfo.value.password = localLoginInfo.password || "";
    loginInfo.value.remember = localLoginInfo.remember || false;
  }
}

// 生命周期时登录信息初始化
initLoginInfo();

async function loginHandle() {
  // 解构信息
  const { username, password, remember } = loginInfo.value;
  if (!username || !password) {
    message.error("请输入账号和密码!");
    return;
  }
  try {
    const res = await api.login({ username, password: password.toString() });
    // 如果验证成功
    if (res.data.code === 0) {
      message.success("登录成功");
      // 获得token
      const token = res.data.data;
      setToken(token);
      // 如果按下"记住我", 则保存信息到本地
      if (remember) {
        LocalCache.set("loginInfo", loginInfo);
      } else {
        LocalCache.remove("loginInfo");
      }
      await addDynamicRoutes();
      router.replace("/");
    } else {
      message.error("账号或密码错误");
    }
  } catch (e) {
    console.log(e);
  }
}
</script>

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
          <a-button type="primary" class="button" @click="loginHandle">
            <a-spin
              :indicator="indicator"
              v-if="appStore.loading"
            />登录</a-button
          >
        </div>
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

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
