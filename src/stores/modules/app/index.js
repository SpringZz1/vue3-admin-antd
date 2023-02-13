import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state() {
    return {
      // 控制菜单缩进
      collapsed: false,
    };
  },
  actions: {
    switchCollapsed() {
      this.collapsed = !this.collapsed;
    },
    setCollapsed(collapsed) {
      this.collapsed = collapsed;
    },
  },
});
