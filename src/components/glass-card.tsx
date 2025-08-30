import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur",
        "transition-colors",
        className,
      )}
    >
      {children}
    </div>
  )
}
