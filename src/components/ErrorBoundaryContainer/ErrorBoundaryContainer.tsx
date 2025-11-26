import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorFallback/ErrorFallback";

/**
 * Error Boundary Container for React application error handling
 *
 * Implements a production-grade error boundary that:
 * 1. Catches JavaScript errors in child components
 * 2. Displays a user-friendly error UI via ErrorFallback component
 * 3. Maintains application stability when child components fail
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Components to protect from crashing the entire app
 *
 * @behavior
 * - **Error Capture**: Catches errors during rendering, lifecycle methods, and constructors
 * - **Fallback UI**: Renders ErrorFallback component when errors occur
 * - **Error Recovery**: Provides retry mechanism through ErrorFallback component
 *
 * @limitations
 * - Does not catch errors in: event handlers, async code, SSR, or itself
 * - Errors in the FallbackComponent will not be caught
 *
 * @see {@link ErrorFallback} Component displayed during error state
 */
const ErrorBoundaryContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        // You can replace this with any notification system you prefer
        console.error("ErrorBoundary caught an error:", error);

        // If you want to use browser notifications instead of react-toastify:
        if (Notification.permission === "granted") {
          new Notification("Application Error", {
            body: "An unexpected error occurred. Please try again.",
            icon: "/favicon.ico",
          });
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryContainer;
