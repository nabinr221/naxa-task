// src/api/httpClient.ts
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { logger } from "../utils/logger";

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      // Explicitly type as AxiosHeaders
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor with proper typing
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add auth token if available
        const token = localStorage.getItem("authToken");
        if (token && config.headers) {
          
          // Use set method for headers to ensure type safety
          config.headers.set("Authorization", `Bearer ${token}`);
        }

        // Log request
        logger.info(
          `🚀 ${config.method?.toUpperCase()} ${config.url}`,
          config.params || ""
        );

        return config;
      },
      (error) => {
        logger.error("❌ Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        logger.info(
          `✅ ${response.status} ${response.config.url}`,
          response.data
        );
        return response;
      },
      (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        logger.error(`❌ Response Error ${status}:`, message);

        // Handle specific error cases
        switch (status) {
          case 401:
            localStorage.removeItem("authToken");
            window.location.href = "/login";
            break;
          case 403:
            logger.warn("Access forbidden");
            break;
          case 404:
            logger.warn("Resource not found");
            break;
          case 500:
            logger.error("Server error occurred");
            break;
          default:
            logger.error("Network error:", message);
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic methods with proper typing
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  // Method to get the raw axios instance if needed
  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Create instance with your API base URL
export const httpClient = new HttpClient(import.meta.env.VITE_API_URL);
