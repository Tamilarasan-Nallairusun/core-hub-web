import axios, { AxiosResponse ,AxiosRequestConfig} from "axios";
import { loadFromCookies } from "./cryptoUtils";
import { LoginResponseModel } from "@/model/login.response.model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const API_KEY_NAME = process.env.NEXT_PUBLIC_API_KEY_NAME;
const API_KEY_VALUE = process.env.NEXT_PUBLIC_API_KEY_VALUE;

// Create Axios Instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    try {
      const data = await loadFromCookies() as LoginResponseModel;
      if (data && config.headers) {
        config.headers.Authorization = `Bearer ${data.token}`;
        config.headers['x-tenant-id'] = data.tenantId;
      }

      if (API_KEY_NAME && API_KEY_VALUE && config.headers) {
        config.headers[API_KEY_NAME] = API_KEY_VALUE;
      }
    } catch (error) {
      console.error("❌ Error in request interceptor:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Returns Only `data`)
axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => response.data, // ✅ Only return `data`
  (error) => Promise.reject(error.response?.data || error.message)
);

// API Service with Explicit `Promise<T>` Fix
const http = {
  get: <T>(url: string, params?: object): Promise<T> =>
    axiosInstance.get<T>(url, { params }).then((response) => response as T) as Promise<T>,

  post: <T>(url: string, data?: object): Promise<T> =>
    axiosInstance.post<T>(url, data).then((response) => response as T) as Promise<T>,

  put: <T>(url: string, data?: object): Promise<T> =>
    axiosInstance.put<T>(url, data).then((response) => response as T) as Promise<T>,

  delete: <T>(url: string, params?: object): Promise<T> =>
    axiosInstance.delete<T>(url, { params }).then((response) => response as T) as Promise<T>,
};

export default http;
