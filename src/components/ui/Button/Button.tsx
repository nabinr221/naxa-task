/**
 * Button Component
 * Reusable button component with multiple variants
 */

import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The label text displayed in the button
   */
  label?: string;

  /**
   * Visual variant of the button
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "danger" | "ghost";

  /**
   * Size of the button
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the button is loading
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the button is fully width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Icon to display in the button
   */
  icon?: React.ReactNode;
}

/**
 * Button component
 * Provides different visual variants and states
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      icon,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses =
      "font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2";

    // Variant classes
    const variantClasses: Record<string, string> = {
      primary:
        "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 disabled:bg-gray-400",
      secondary:
        "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 disabled:bg-gray-300",
      danger:
        "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 disabled:bg-red-400",
      ghost:
        "bg-transparent hover:bg-gray-100 text-gray-900 focus:ring-gray-500 disabled:bg-gray-100",
    };

    // Size classes
    const sizeClasses: Record<string, string> = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const combinedClassName = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${fullWidth ? "w-full" : ""}
      ${isLoading ? "opacity-75 cursor-not-allowed" : ""}
      ${className}
    `.replace(/\s+/g, " ");

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && !isLoading && icon}
        {label || children}
      </button>
    );
  }
);

Button.displayName = "Button";
