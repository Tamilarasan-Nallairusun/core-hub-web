"use client";

import clsx from "clsx";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "primary-outline" | "secondary" | "secondary-outline";
  size?: "small" | "medium" | "large"; // Added size prop
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  type = "button",
  variant = "primary",
  size = "medium", // Default size
  disabled = false,
  loading = false,
  block = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    flex items-center justify-center rounded-lg transition-colors duration-200 font-medium 
    focus:outline-none focus:ring-2 focus:ring-opacity-50 
    hover:brightness-110 active:brightness-90 
    cursor-pointer
  `;

  const variantStyles = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-opacity-90 focus:ring-[var(--color-primary)]",
    "primary-outline": "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)]",
    secondary: "bg-[var(--color-secondary)] text-white hover:bg-opacity-90 focus:ring-[var(--color-secondary)]",
    "secondary-outline": "border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white focus:ring-[var(--color-secondary)]",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size], // Apply size styles
        block && "w-full",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="w-5 h-5 animate-spin text-white"
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
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
