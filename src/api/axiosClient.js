import axios from "axios";

const DEBUG = process.env.NODE_ENV === "development";
// const url = 'http://127.0.0.1:8000/api';
const url = 'https://api.cryptopay-fx.com/api';

export const axiosClient = () => {
  let axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_BASE_URL,
    baseURL: url,
    headers: {
      Accept: "application/json",
    },
  });
  
  axiosInstance.interceptors.request.use(
    (config) => {
      let token = window.localStorage.getItem("cryptopay-token");

      if (token !== null && typeof token !== 'string' && token !== 'undefined' && token !== undefined) {
        token = JSON.parse(token);
      }

      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      if (DEBUG) {
        console.error("✉️ ", error);
      }
      if(error?.response?.status == 401){
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        alert("You are not authorized");
      }
      return response;
    },
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
  );

  return axiosInstance;
};
