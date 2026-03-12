import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = "",
  id,
  required,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
  const hasError = !!error;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-zinc-900"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-600" aria-label="필수">
              *
            </span>
          )}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full rounded-lg border px-4 py-2.5 text-base
          transition-colors
          placeholder:text-zinc-400
          focus:outline-none focus:ring-2 focus:ring-offset-1
          disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500
          ${
            hasError
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
              : "border-zinc-300 bg-white focus:border-primary-500 focus:ring-primary-500"
          }
          ${className}
        `}
        aria-invalid={hasError}
        aria-describedby={
          hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        required={required}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 flex items-start gap-1.5 text-sm text-red-700"
          role="alert"
        >
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-zinc-600">
          {helperText}
        </p>
      )}
    </div>
  );
}
