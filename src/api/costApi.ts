import axios from "axios";
import NProgress from "nprogress";

const costsApi = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

costsApi.interceptors.request.use((config) => {
  NProgress.start();
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
costsApi.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default costsApi;
