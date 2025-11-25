/**
 * Centralized error handling utility
 * Standardizes error handling across the application
 */

import { ApplicationError } from "../types";
import type { ApiError } from "../types";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";
import { logger } from "./logger";

export class ErrorHandler {
  static handle(error: unknown): ApplicationError {
    logger.error("Error caught by ErrorHandler", error as Error);

    if (error instanceof ApplicationError) {
      return error;
    }

    if (error instanceof TypeError) {
      return new ApplicationError(
        "TYPE_ERROR",
        "An unexpected type error occurred",
        HTTP_STATUS.INTERNAL_ERROR
      );
    }

    if (error instanceof SyntaxError) {
      return new ApplicationError(
        "SYNTAX_ERROR",
        "An unexpected syntax error occurred",
        HTTP_STATUS.INTERNAL_ERROR
      );
    }

    if (error instanceof Error) {
      return new ApplicationError(
        "UNKNOWN_ERROR",
        error.message || ERROR_MESSAGES.SERVER_ERROR,
        HTTP_STATUS.INTERNAL_ERROR
      );
    }

    return new ApplicationError(
      "UNKNOWN_ERROR",
      ERROR_MESSAGES.SERVER_ERROR,
      HTTP_STATUS.INTERNAL_ERROR
    );
  }

  static handleApiError(error: unknown): ApplicationError {
    logger.error("API error occurred", error as Error);

    const appError = this.handle(error);

    if (typeof error === "object" && error !== null) {
      const apiError = error as Partial<ApiError>;
      if (apiError.statusCode) {
        return new ApplicationError(
          apiError.code || appError.code,
          appError.message,
          apiError.statusCode,
          apiError.details
        );
      }
    }

    return appError;
  }

  static isNetworkError(error: unknown): boolean {
    if (error instanceof TypeError) {
      return (
        error.message.includes("fetch") || error.message.includes("network")
      );
    }
    return false;
  }

  static isAuthError(statusCode: number): boolean {
    return (
      statusCode === HTTP_STATUS.UNAUTHORIZED ||
      statusCode === HTTP_STATUS.FORBIDDEN
    );
  }
}
