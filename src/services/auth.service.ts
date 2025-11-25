/**
 * Authentication Service
 * Handles all authentication-related business logic
 * Separates concerns from API and UI layers
 */

import { httpClient } from "../api";
import { STORAGE_KEYS } from "../constants";
import { logger } from "../utils";
import type { User, LoginCredentials, AuthToken, ApiResponse } from "../types";

export class AuthService {
  private static readonly AUTH_ENDPOINT = "/auth";

  /**
   * Login user with email and password
   */
  static async login(credentials: LoginCredentials): Promise<{
    user: User;
    token: AuthToken;
  }> {
    logger.info("User login attempt", { email: credentials.email });

    try {
      const response = await httpClient.post<ApiResponse<AuthToken>>(
        `${this.AUTH_ENDPOINT}/login`,
        credentials
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Login failed");
      }

      const token = response.data.data;
      this.storeTokens(token);

      // Fetch user data after successful login
      const user = await this.getCurrentUser();

      logger.info("User login successful", { userId: user.id });
      return { user, token };
    } catch (error) {
      logger.error("Login failed", error as Error);
      throw error;
    }
  }

  /**
   * Logout user and clear tokens
   */
  static logout(): void {
    logger.info("User logout");
    this.clearTokens();
  }

  /**
   * Register new user
   */
  static async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<User> {
    logger.info("User registration attempt", { email: data.email });

    try {
      const response = await httpClient.post<ApiResponse<User>>(
        `${this.AUTH_ENDPOINT}/register`,
        data
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Registration failed");
      }

      logger.info("User registration successful", {
        userId: response.data.data.id,
      });
      return response.data.data;
    } catch (error) {
      logger.error("Registration failed", error as Error);
      throw error;
    }
  }

  /**
   * Get current authenticated user
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await httpClient.get<ApiResponse<User>>(
        `${this.AUTH_ENDPOINT}/me`
      );

      if (!response.data.success) {
        throw new Error("Failed to fetch user");
      }

      return response.data.data;
    } catch (error) {
      logger.error("Failed to get current user", error as Error);
      throw error;
    }
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(): Promise<AuthToken> {
    logger.info("Refreshing authentication token");

    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await httpClient.post<ApiResponse<AuthToken>>(
        `${this.AUTH_ENDPOINT}/refresh`,
        { refreshToken }
      );

      if (!response.data.success) {
        throw new Error("Token refresh failed");
      }

      const token = response.data.data;
      this.storeTokens(token);

      logger.info("Token refreshed successfully");
      return token;
    } catch (error) {
      logger.error("Token refresh failed", error as Error);
      this.clearTokens();
      throw error;
    }
  }

  /**
   * Store tokens in local storage
   */
  private static storeTokens(token: AuthToken): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token.refreshToken);
  }

  /**
   * Clear stored tokens
   */
  private static clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Get stored authentication token
   */
  static getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}
