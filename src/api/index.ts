import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }
    }

    return Promise.reject(error);
  },
);
