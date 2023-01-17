import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:4000/", // url = 基本地址 + 请求网址
  timeout: 10000, // 请求超时
});

// request interceptor.request  请求拦截器

// request interceptor.response 相应拦截

request.interceptors.response.use(
  (config) => {
    console.log("相应拦截器");
    // console.log(config);
    return Promise.resolve(config);
  },
  (error) => handleNetworkError(error)
);

const handleNetworkError = (error) => {
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
};

export default request;