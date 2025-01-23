import axios from "axios";
import { clearData, getStoredData } from "../core/utils";
// import Cookies from 'js-cookie';

export const axiosInstance = () => {
  const instance = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: "http://localhost:9000/api/v1/",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Request interceptors
  instance.interceptors.request.use(
    (config) => {
      console.log("axios token");
      console.log(config.headers.Authorization);
      const isPublic = config.url?.includes("/p/");
      // const token = Cookies.get('user');
      // const token = getStoredData();
      // console.log("axios");
      // console.log(token);
      // // clearData();

      // if (!isPublic && token) {
      //   config.headers["Authorization"] = `Bearer ${token}`;
      // }
      // if (!isPublic && token) {
      //   config.headers['Authorization'] = `Bearer ${token}`;
      //   Cookies.set('user', token, { expires: new Date(new Date().getTime() + 30 * 60 * 1000) });
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptors
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        // Cookies.remove('user');
        // window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
