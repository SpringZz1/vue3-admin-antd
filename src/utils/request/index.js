import axios from "axios";
import { resReject, resResolve, reqReject, reqResolve } from "./interceptors";
const request = axios.create({
  baseURL: "http://localhost:4000/", // url = 基本地址 + 请求网址
  // baseURL: "http://127.0.0.1:4000",
  timeout: 10000, // 请求超时
});

// request interceptor.request  请求拦截器
request.interceptors.request.use(reqResolve, reqReject);

// request interceptor.response 相应拦截
request.interceptors.response.use(resResolve, resReject);

export default request;
