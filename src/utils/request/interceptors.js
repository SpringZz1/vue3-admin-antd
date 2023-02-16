import TokenCache from "../token/index";
import { useAppStore } from "@/store/modules/app";

// request成功
export function reqResolve(config) {
  const appStore = useAppStore();
  // 发送请求打开加载动画
  appStore.setLoading(true);
  // 处理不需要token的请求
  if (config.noNeedToken) {
    return config;
  }

  const token = TokenCache.get("token");
  // 如果不存在token, 则需要进行重新登录
  if (!token) {
    return Promise.reject({ code: 401, message: "登录已过期, 请重新登录!" });
  }
  config.headers.Authorization =
    config.headers.Authorization || "Bearer " + token;

  return config;
}

// request失败
export function reqReject(error) {
  return Promise.reject(error);
}

// response成功
export function resResolve(config) {
  const appStore = useAppStore();
  // 请求完成关闭加载动画
  appStore.setLoading(false);
  // console.log("response相应拦截器");
  return Promise.resolve(config);
}

// response失败, 对返回的code进行原因判断
export function resReject(error) {
  let message = "未知错误";
  if (error && error.response) {
    switch (error.response.state) {
      case 302:
        message = "接口重定向了！";
        break;
      case 400:
        message = "参数不正确！";
        break;
      case 401:
        message = "您未登录，或者登录已经超时，请先登录！";
        break;
      case 403:
        message = "您没有权限操作！";
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        message = "请求超时！";
        break;
      case 409:
        message = "系统已存在相同数据！";
        break;
      case 500:
        message = "服务器内部错误！";
        break;
      case 501:
        message = "服务未实现！";
        break;
      case 502:
        message = "网关错误！";
        break;
      case 503:
        message = "服务不可用！";
        break;
      case 504:
        message = "服务暂时无法访问，请稍后再试！";
        break;
      case 505:
        message = "HTTP版本不受支持！";
        break;
      default:
        message = "异常问题，请联系管理员！";
        break;
    }
  }
  if (error.message.includes("timeout")) message = "网络请求超时！";
  if (error.message.includes("Network"))
    message = window.navigator.onLine ? "服务端异常！" : "您断网了！";
  console.log(message);
  return Promise.reject(error);
}
