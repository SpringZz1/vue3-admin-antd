import Cookies from "js-cookie";

class CookiesCache {
  constructor(expires) {
    this._expires = expires;
  }
  // 设置cookies
  set(key, value) {
    // 设定cookies的保存时间(s)
    let expires = new Date(new Date() * 1 + this._expires * 1000);
    console.log("设置cookie成功");
    Cookies.set(key, value, { expires: expires });
  }
  // 获取cookies
  get(key) {
    console.log("获取Cookie成功");
    Cookies.get(key);
  }
  // 清除cookies
  remove(key) {
    Cookies.remove(key);
  }
}

// 默认Cookies保存100s
export default new CookiesCache(100000);
