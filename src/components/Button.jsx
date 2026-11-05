import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon: Icon,
  iconPosition = "left",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-zinc-100 text-zinc-950 hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] border border-white/20",
    secondary:
      "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 hover:text-white shadow-sm",
    glass:
      "bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 hover:text-white border border-white/10 backdrop-blur-md",
    ghost:
      "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
