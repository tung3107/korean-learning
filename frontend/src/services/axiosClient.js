import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL, // URL cơ sở
  timeout: 5000, // Thời gian chờ tối đa
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Thêm interceptors (tuỳ chọn)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung
    return Promise.reject(error);
  }
);

export default axiosClient;
