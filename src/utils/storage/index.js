class localCache {
  constructor(expires) {
    // 设置过期时间
    this._expires = expires;
  }
  set(key, obj) {
    obj.startTime = Date.now();
    window.localStorage.setItem(key, JSON.stringify(obj));
    console.log("set");
  }
  get(key) {
    const obj = JSON.parse(window.localStorage.getItem(key));
    // 如果判断obj不为null的情况
    if (obj !== null) {
      let now = Date.now();
      // 如果当前时间减去生成时间超过设定保存时间则清除localstore
      if (now - obj.startTime > this._expires) {
        console.log("localstore保存超时已被消除");
        // console.log(window.localStorage.getItem("key"));
        window.localStorage.removeItem("key");
        return obj;
      } else {
        // console.log(obj._value);
        return obj._value;
      }
    }
    // obj为空直接返回null
    return null;
  }
  remove(key) {
    window.localStorage.removeItem(key);
  }
  clear() {
    window.localStorage.clear();
  }
}
// 设置过期时间为10s, 测试使用
export default new localCache(10000);
