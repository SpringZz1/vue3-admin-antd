import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state() {
    return {
      // 控制菜单缩进
      collapsed: false,
      // 控制加载动画
      loading: false,
    };
  },
  actions: {
    switchCollapsed() {
      this.collapsed = !this.collapsed;
    },
    setCollapsed(collapsed) {
      this.collapsed = collapsed;
    },
    setLoading(state = false) {
      this.loading = state;
    },
  },
});
