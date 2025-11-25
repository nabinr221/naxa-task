/**
 * Centralized logging utility
 * Provides consistent logging across the application
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  stack?: string;
}

class Logger {
  private isDevelopment: boolean;

  constructor(isDevelopment: boolean = import.meta.env.DEV) {
    this.isDevelopment = isDevelopment;
  }

  private formatLog(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      const entry = this.createLogEntry("debug", message, context);
      console.debug(this.formatLog("debug", message), entry);
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry("info", message, context);
    console.info(this.formatLog("info", message), entry);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry("warn", message, context);
    console.warn(this.formatLog("warn", message), entry);
  }

  error(
    message: string,
    error?: Error | Record<string, unknown>,
    context?: Record<string, unknown>
  ): void {
    const entry = this.createLogEntry("error", message, context);
    if (error instanceof Error) {
      entry.stack = error.stack;
      console.error(this.formatLog("error", message), entry, error);
    } else {
      console.error(this.formatLog("error", message), entry, error);
    }
  }
}

export const logger = new Logger();
