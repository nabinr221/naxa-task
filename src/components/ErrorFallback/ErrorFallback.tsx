import type { FallbackProps } from "react-error-boundary";
import { RefreshCw, Bug, HelpCircle } from "lucide-react";

/**
 * Error Fallback UI component for react-error-boundary.
 *
 * Displays a user-friendly error recovery interface when JavaScript errors occur within
 * an error boundary. Provides users with clear actions to recover from the error state
 * while maintaining brand consistency and user confidence.
 */
export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="min-h-screen from-slate-50 to-slate-100 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full">
            <Bug className="h-8 w-8 text-red-500" />
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-3xl font-bold text-center  from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
          Unexpected Error
        </h1>

        <p className="text-gray-600 text-center mb-6">
          We've run into a problem. The issue has been logged and our team is on
          it.
        </p>

        {/* Error Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              Error Message
            </span>
          </div>
          <p className="text-sm text-gray-800 font-mono bg-white p-3 rounded border">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={resetErrorBoundary}
            className="flex items-center justify-center gap-2 from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
