import axios from "axios";

// const BASE_URL = "http://4.248.184.193/api";
const BASE_URL = "http://attenqr.canadacentral.cloudapp.azure.com/api";
// const BASE_URL = "http://127.0.0.1:8000/api";
// const BASE_URL = "http://192.168.18.188:8000/api";
const adminApi = axios.create({
  baseURL: BASE_URL,
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(`${BASE_URL}/admin/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem("accessToken", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return adminApi(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("adminUser");
        window.location.href = "/admin-login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default adminApi;
