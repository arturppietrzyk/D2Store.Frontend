// api client
import axios from "axios";

const API_BASE_URL = "http://localhost:5112/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    "Content-Type": "application/json"
  }
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const expiresAt = localStorage.getItem("expiresAt");

  if (token && expiresAt) {
    const expiryDate = new Date(expiresAt).getTime();
    const now = new Date().getTime();

    if (now >= expiryDate) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expiresAt");
      window.location.href = "/login?message=session_expired";
      return Promise.reject("Token expired");
    }

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expiresAt");
      window.location.href = "/login?message=unauthorized";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
