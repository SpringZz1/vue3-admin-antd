import { defineStore } from "pinia";
import api from "./api";

// const router = useRouter();

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
    userAvatar() {
      return this.userInfo.avatar;
    },
    userRole() {
      return this.userInfo.role;
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await api.getUsers();
        const { username, avatar, password, role } = res.data.data;
        this.userInfo = { username, avatar, password, role };
        return Promise.resolve(res.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // async logout() {
    //   TokenCache.remove("token");
    //   router.replace("/login");
    // },
  },
});
