import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-11 px-5 text-base",
    }
    const variants = {
      default: "bg-sky-600 text-white hover:bg-sky-700",
      outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
      ghost: "text-slate-900 hover:bg-slate-100",
    }
    return <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props} />
  },
)
Button.displayName = "Button"
