import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-300",
        variant === "primary" && "bg-brand-900 text-white hover:bg-black",
        variant === "secondary" && "bg-brand-100 text-brand-900 hover:bg-brand-200",
        variant === "ghost" && "bg-transparent hover:bg-brand-100",
        className
      )}
      {...props}
    />
  );
}
