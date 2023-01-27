import { defineStore } from "pinia";
import api from "./api";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {},
    };
  },
  getters: {
    username() {
      return this.userInfo.username;
    },
    userPassword() {
      return this.userInfo.password;
    },
  },
  actions: {
    async getUserInfo() {
      try {
        // api.getUsers();
        const res = await api.getUsers();
        console.log(res.data.data);
        // TODO: 此处暂时写死，先测试功能，功能已经成功，后续修改为动态内容
        const { id, username, avatar, password, role } = res.data.data.admin;
        this.userInfo = { username, password };
        // console.log(this.userInfo);
        return Promise.resolve(res.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
