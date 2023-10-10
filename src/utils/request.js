import axios from "axios";
// import { getToken } from "./auth";
import { getToken } from '@/utils/utils.js';
import { showToast } from "vant";

const service = axios.create({
  baseURL: "/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// request 拦截器
service.interceptors.request.use(
  (config) => {
    if (!config.data) {
      config["data"] = {};
    }
    if (getToken()) config.headers.common['Authorization'] = 'Bearer ' + getToken();
    const tk = decodeURIComponent(window.location.hash)
      .replace(/\s/g, " ")
      .split("tk=");
    const sq = window.location.hash.split("sq=");
    if (tk.length > 1) {
      config.headers.Authorization = tk[1];
    }
    if (sq.length > 1) {
      config.headers["community-id"] = sq[1].split("&tk=")[0];
    } else {
      config.headers["community-id"] = "1";
    }

    // if (getToken()) {
    //   // 增加token
    //   config.headers["authorization"] = `${getToken()}`; // app需要，写死
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 501) {
      return Promise.reject(response.data);
    } else if (response.status === 200 && response.data.code === 0) {
      return response.data;
    } else {
      showToast(response.data.message || "未知错误");
      return Promise.reject(response.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
