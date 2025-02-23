import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL, // URL cơ sở
  timeout: 5000, // Thời gian chờ tối đa
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token hết hạn, vui lòng đăng nhập lại!");
      Cookies.remove("jwt");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
