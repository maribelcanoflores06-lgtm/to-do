import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  className?: string;
  "aria-label"?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-2.5 text-[15px] font-semibold min-h-11 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:text-[#C0C0C0] disabled:hover:bg-[#F5F5F5]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-black text-white hover:bg-[#1A1A1A] active:bg-black",
  secondary: "bg-[#F2F2F2] text-black hover:bg-[#EBEBEB] active:bg-[#F2F2F2]",
};

export function Button({
  variant = "primary",
  disabled,
  type = "button",
  children,
  onClick,
  className = "",
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
