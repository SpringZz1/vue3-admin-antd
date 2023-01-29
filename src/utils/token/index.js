// import LocalCache from "../storage/index";

class TokenCache {
  // 设置token
  set(key, value) {
    console.log("设置token成功");
    window.sessionStorage.setItem(key, value);
  }
  // 获取token
  get(key) {
    if (window.sessionStorage.getItem(key)) {
      console.log("获取Cookie成功");
      return window.sessionStorage.getItem(key);
    }
    return false;
  }
  // 清除token
  remove(key) {
    window.sessionStorage.removeItem(key);
  }
}

// 默认Token保存100s
export default new TokenCache(100000);
