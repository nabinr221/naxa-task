/**
 * Axios instance configuration
 * Centralized HTTP client with interceptors for consistent API handling
 */

import { API_CONFIG, HTTP_STATUS, STORAGE_KEYS } from "../constants";
import { ErrorHandler, logger } from "../utils";

// Mock axios for this example - replace with actual axios if needed
interface AxiosResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: unknown;
}

interface AxiosError {
  response?: AxiosResponse;
  message: string;
  code?: string;
}

interface AxiosInstance {
  get: <T>(url: string, config?: unknown) => Promise<AxiosResponse<T>>;
  post: <T>(
    url: string,
    data?: unknown,
    config?: unknown
  ) => Promise<AxiosResponse<T>>;
  put: <T>(
    url: string,
    data?: unknown,
    config?: unknown
  ) => Promise<AxiosResponse<T>>;
  patch: <T>(
    url: string,
    data?: unknown,
    config?: unknown
  ) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string, config?: unknown) => Promise<AxiosResponse<T>>;
  interceptors: {
    request: { use: (fn: (config: unknown) => unknown) => void };
    response: {
      use: (
        success: (res: AxiosResponse) => AxiosResponse,
        error: (err: AxiosError) => Promise<never>
      ) => void;
    };
  };
}

// Create a basic HTTP client instance
export const createHttpClient = (): AxiosInstance => {
  // This is a placeholder implementation
  // In production, you would use actual axios library
  const client: AxiosInstance = {
    get: async (url: string) => {
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`);
      return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        config: { url },
      };
    },
    post: async (url: string, data?: unknown) => {
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        config: { url },
      };
    },
    put: async (url: string, data?: unknown) => {
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        config: { url },
      };
    },
    patch: async (url: string, data?: unknown) => {
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        config: { url },
      };
    },
    delete: async (url: string) => {
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: "DELETE",
      });
      return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        config: { url },
      };
    },
    interceptors: {
      request: {
        use: (fn: (config: unknown) => unknown) => {
          // Add request interceptor logic
          fn({});
        },
      },
      response: {
        use: (
          success: (res: AxiosResponse) => AxiosResponse,
          error: (err: AxiosError) => Promise<never>
        ) => {
          // Add response interceptor logic
          success({} as AxiosResponse);
          error({} as AxiosError);
        },
      },
    },
  };

  // Request interceptor - add auth token
  client.interceptors.request.use((config: unknown) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      const cfg = config as Record<string, unknown>;
      if (!cfg.headers) {
        cfg.headers = {};
      }
      (cfg.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor - handle errors
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      logger.error("API request failed", error as Error);

      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        // Handle token refresh or redirect to login
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        window.location.href = "/login";
      }

      const appError = ErrorHandler.handleApiError(error);
      return Promise.reject(appError);
    }
  );

  return client;
};

export const httpClient = createHttpClient();
