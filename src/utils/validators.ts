/**
 * Validation utilities
 * Centralized validation logic for common patterns
 */

import { VALIDATION } from "../constants";

export class Validators {
  static isValidEmail(email: string): boolean {
    return VALIDATION.EMAIL_REGEX.test(email);
  }

  static isValidPassword(password: string): boolean {
    return password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
  }

  static isValidUsername(username: string): boolean {
    return (
      username.length >= VALIDATION.USERNAME_MIN_LENGTH &&
      username.length <= VALIDATION.USERNAME_MAX_LENGTH
    );
  }

  static isNullOrEmpty(value: string | null | undefined): boolean {
    return !value || value.trim().length === 0;
  }

  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static isValidDateString(date: string): boolean {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }

  static isValidNumber(value: unknown): boolean {
    return typeof value === "number" && !isNaN(value);
  }

  static isValidArray<T>(value: unknown): value is T[] {
    return Array.isArray(value);
  }

  static isValidObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}
