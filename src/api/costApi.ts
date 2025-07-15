import axios from "axios";

const costsApi = axios.create({
  baseURL: import.meta.env.VITE_costsApi_URL,
});

costsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default costsApi;
