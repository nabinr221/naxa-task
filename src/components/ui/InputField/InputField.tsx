import type { JSX } from "react";
import {
  Controller,
  type Control,
  type RegisterOptions,
  type FieldValues,
  type Path,
} from "react-hook-form";

// Generic props interface
interface InputFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "date"
    | "textarea";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean | string;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  rows?: number;
}

const InputField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  disabled = false,
  required = false,
  className = "",
  wrapperClassName = "",
  labelClassName = "",
  errorClassName = "",
  rows = 4,
}: InputFieldProps<TFieldValues>): JSX.Element => {
  // Base input classes
  const baseInputClasses = `
    w-full px-4 py-3 border rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-offset-1 
    transition-all duration-200 ease-in-out
    placeholder-gray-400
    ${
      disabled
        ? "bg-gray-50 cursor-not-allowed opacity-60 text-gray-500"
        : "bg-white text-gray-900"
    }
  `;

  // State-specific classes
  const errorInputClasses = `
    border-red-500 focus:border-red-500 focus:ring-red-200
    bg-red-50
  `;

  const normalInputClasses = `
    border-gray-300 focus:border-blue-500 focus:ring-blue-200
    hover:border-gray-400
  `;

  const isTextArea = type === "textarea";

  // Get required message
  const getRequiredMessage = (): string | undefined => {
    if (typeof required === "string") return required;
    if (required) return `${label || name} is required`;
    return undefined;
  };

  // Combined validation rules
  const validationRules: RegisterOptions<TFieldValues, Path<TFieldValues>> = {
    required: getRequiredMessage(),
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;
        const inputClasses = `
          ${baseInputClasses}
          ${hasError ? errorInputClasses : normalInputClasses}
          ${className}
        `;

        return (
          <div className={`mb-6 ${wrapperClassName}`}>
            {/* Label */}
            {label && (
              <label
                htmlFor={name}
                className={`
                  block text-sm font-semibold mb-2 
                  ${hasError ? "text-red-700" : "text-gray-700"}
                  ${labelClassName}
                `}
              >
                {label}
                {required && (
                  <span className="text-red-500 ml-1" aria-hidden="true">
                    *
                  </span>
                )}
              </label>
            )}

            {/* Input Field */}
            {isTextArea ? (
              <textarea
                {...field}
                id={name}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClasses}
                aria-invalid={hasError ? "true" : "false"}
                aria-describedby={hasError ? `${name}-error` : undefined}
                aria-required={!!required}
              />
            ) : (
              <input
                {...field}
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClasses}
                aria-invalid={hasError ? "true" : "false"}
                aria-describedby={hasError ? `${name}-error` : undefined}
                aria-required={!!required}
                value={field.value || ""}
              />
            )}

            {/* Error Message */}
            {hasError && (
              <div
                id={`${name}-error`}
                className={`flex items-center mt-2 text-sm ${errorClassName}`}
                role="alert"
                aria-live="polite"
              >
                <svg
                  className="w-4 h-4 mr-1 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-600 font-medium">
                  {error.message}
                </span>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default InputField;
