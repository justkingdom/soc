import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class HttpRequest {
  getInsideConfig() {
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
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDA1OTkzMTgiLCJsYW5ndWFnZSI6InpoX2NuIiwiZXhwIjoxNzA0NTk2MTYxLCJpYXQiOjE3MDQzMzY5NjF9.aUKwiWSLy8SXxGkgWcj39O7lpyGJz5e9JswpK54-Wwg",
        Recaptchaaction: 'ANSWER',
        Recaptchatoken:
          "03AFcWeA7258fTHiK79OPx3awwBOoMa7Aae_XFyJJUIHnLXTVdEEgVSGRAxEiSqebAyfNGE4eG9E99W6k20ekKyhjmkN3Ol7KPV7gAhmXsZ4Mi-4oVad6dMGZUthH0r-Jl-tWeBquRN0T00bSjCBISQV4AaE-3_00UT-SBuxnJ4b8WvhjXiEZO32m8jxWh4688UuLIVhPeLVfhWvxUyQJ6p_WvnlDrys5jGcbl7mF62tQZ4LEFUoOay7thlaIi8hGnYlI0ZRNt54WJ0S3IvylRp12GIv36vbcfB76VvcZSxPAXldQZ67wH22HLyVPT0K1Hyplw_gsVlYCHdDmgaZIuie8Q8UlXGi0MaOoP0VYhy6WH_BpxTo8gzwiNt9MjteX1wppXF-j6PCZjD_KV-Cjy_qB4dLd5yAsm0p1QEVG9klKeWbwopeVwVi3T778Xa1Xbq2OVNvp3t_Kvdz-_3eFD_H5MyOs1fl5_D2YIxNGip9u0m0ZtRumT23_yQQVCX7zaPDA-Zfm-A895Wv0kJKDlzuVuaq74Q77aT1ZXqNbT1rvDHBAFHqMjIqexntxljbI0T7xyUzq2BXDReMmFlagrllGWM4aLd4uam-Ba3gNmUVJ5W3Qyxmm41ERLVOZ0nIfEsQt5rBjbCwLfy7hPvBeqqn7qcVBWTNTX8lzrAKrtct8gYrFiiyG2awRHd6r6qcv9SGJJRZOGhL0B6DfaQyfnILw9E0zTgd_yKSEXd_SL8nBuwAB2FKLr1gM9YHL0yzI76-yEBjwPzmDZeX4smodutTW8HtSKSyExGm8A87ibHzIcjV-TZiDZdf5i0ZGYv5w7GVmjMDkO9aH888QuqWvWfwts3sI7xaolBBLLnSRwmyY595oWEPdsXgmKbJ2h4zMrWqhjrukhEWfA3SQd_wnpnGJoTPgRxvNbi9Yk6BZNiUmz8yEMHIweMlEvTOWg9PUXoP8fFfnQOv9R2suMOctQXfas5Q2DiLfiLigJrR2iqaN3lKYWoo_fnz6oKAuxsVb70B0t0Cy--B5THj-F1kMoyh3DHkrH5nQPiUbOpna9n3IfxcaZkYKEUu8bpQgB253qQ401V9O6A7rp_qT9IvD-jMowixhYVkrvUAPKCB68F5NQoUosPugLzs-PlvMfNuf-J0iQ3dG7lO3VQjpkhmHR3vwTCfNE5vZxyKVPrwKJdEH8-Muq3ckqs6nmA7pgb3eBxLwwc1WVsZLqSjGYFscLu6PrtUDqH3zOhuZmLs0UbmdOdWHAkonTbZPBNYrR7l7cGZo36nEUexpjKHYgQdh1qnp3Lm3ZxEq2Obbt2cGugXZXRHWZOajjTKAnLw4Q3ynsvzatj7avpblmirTPH9Yf7LE5VZ6OYl-ph686gydA_YlRYIF99gMv0N0zXmrpjiZ-iZmjJlGIGUCzk1CY1ZtcfkLjG61GdIdxr7BlCe3UlXhT8aqlf5T-i4mLWy_ETTJC7hLq-yzJfutv-KYItAEzexrS5F8UeC3sWBLedUbD0iwl3F6OJY1ByNx5KqqNOA8fhspJ0oawBT2A_Gh1JsaD0p16R5O3youIENdWdGZVCpPc4VsAAWe_de267uRLN_mkhN4GxuEst9-_cx8oLAL3qY4j64vchlTW3x7fDEI_XdbnafDEEhYtGLJnM-SthMjy6TCqtGGlcFwopIc6h3GKJQEO6lq5WCEfNr68BusXqqNJB8MWdFt--FPH4HzT3E3GOsXilTtrvssdHec39m7aCj1j_cLEKshqmOMSz226ibHxvO-cTRhz6C1PctHvPRVOzIKv_fZ39DKyvWI_j2RK1ZbCKjMAL_URQZiTj3RTU4HtH0mOPXlbOOE",
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
