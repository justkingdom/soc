import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store2 from 'store2';
import { STORAGE_KEY_LOGIN_INFO } from "../constants";

class HttpRequest {
  getInsideConfig() {
    const userInfo = store2.get(STORAGE_KEY_LOGIN_INFO);
    const config = {
      baseURL: import.meta.env.VITE_API_BASE_URL, // 所有的请求地址前缀部分(没有后端请求不用写)
      timeout: 800000, // 请求超时时间(毫秒)
      withCredentials: true, // 异步请求携带cookie
      // headers: {
      // 设置后端需要的传参类型
      // 'Content-Type': 'application/json',
      // 'token': x-auth-token',//一开始就要token
      // 'X-Requested-With': 'XMLHttpRequest',
      // },
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo ? userInfo.token : undefined,
      },
    };
    return config;
  }

  // 请求拦截
  interceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => {
        // 添加全局的loading..
        // 请求头携带token
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    //响应拦截
    instance.interceptors.response.use(
      (res) => {
        //返回数据
        const { data } = res;
        // console.log("返回数据处理", res);
        return data;
      },
      (error: any) => {
        console.log("error==>", error);
        return Promise.reject(error);
      }
    );
  }

  request<T>(options: AxiosRequestConfig): Promise<T> {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(options);
  }
}

const http = new HttpRequest();
export default http;
