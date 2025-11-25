import type { JSX } from "react";
import {
  Controller,
  type Control,
  type RegisterOptions,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FileUploadProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  accept?: string;
  disabled?: boolean;
  required?: boolean | string;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperText?: string;
  multiple?: boolean;
  maxSizeMB?: number;
}

const FileUpload = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  accept,
  disabled = false,
  required = false,
  className = "",
  wrapperClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperText,
  multiple = false,
}: FileUploadProps<TFieldValues>): JSX.Element => {
  // Base input classes
  const baseInputClasses = `
    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 
    transition-all duration-200 ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-full 
    file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 
    hover:file:bg-blue-100
    ${
      disabled
        ? "bg-gray-50 cursor-not-allowed opacity-60 text-gray-500"
        : "bg-white text-gray-900 cursor-pointer"
    }
  `;

  // State-specific classes
  const errorInputClasses = `
    border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50
  `;

  const normalInputClasses = `
    border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400
  `;

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
        const fileValue = field.value as FileList | null;
        const selectedFile = fileValue?.[0];

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

            {/* File Input Field */}
            <input
              type="file"
              id={name}
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              className={inputClasses}
              aria-invalid={hasError ? "true" : "false"}
              aria-describedby={
                hasError
                  ? `${name}-error`
                  : helperText
                  ? `${name}-helper`
                  : undefined
              }
              aria-required={!!required}
              onChange={(e) => {
                field.onChange(e.target.files);
              }}
              onBlur={field.onBlur}
            />

            {/* Selected File Info */}
            {selectedFile && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm font-medium">
                  Selected file:{" "}
                  <span className="font-semibold">{selectedFile.name}</span>
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB |
                  Type: {selectedFile.type || "Unknown"}
                </p>
              </div>
            )}

            {/* Helper Text */}
            {helperText && !hasError && (
              <p id={`${name}-helper`} className="text-gray-500 text-xs mt-2">
                {helperText}
              </p>
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
                  className="w-4 h-4 mr-1 text-red-500 "
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

export default FileUpload;
