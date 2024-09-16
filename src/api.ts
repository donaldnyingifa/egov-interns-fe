import axios from "axios";
import { useRouter } from "next/router";

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

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const router = useRouter();
//     if (error.response && error.response.status === 401) {
//       router.replace("/login");
//     }
//
//     return Promise.reject(error);
//   },
// );
