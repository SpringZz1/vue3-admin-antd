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
        const res = await api.getUsers();
        const { username, password } = res.data.data;
        this.userInfo = { username, password };
        return Promise.resolve(res.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
