/**
 * Environment configuration
 * Centralized access to environment variables with type safety
 */

interface EnvironmentConfig {
  apiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  logLevel: "debug" | "info" | "warn" | "error";
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  return {
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    isTest: import.meta.env.VITE_TEST_ENV === "true",
    logLevel: (import.meta.env.VITE_LOG_LEVEL || "info") as
      | "debug"
      | "info"
      | "warn"
      | "error",
  };
};

export const env = getEnvironmentConfig();

// Validate critical environment variables
const validateEnvironment = (): void => {
  if (!env.apiUrl) {
    console.warn("API URL is not configured. Using default.");
  }
};

validateEnvironment();
