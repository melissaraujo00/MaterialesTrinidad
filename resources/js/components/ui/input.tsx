import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(

        "flex h-9 w-full min-w-0 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm transition-colors",
        "text-slate-900 dark:text-slate-50", 
        "placeholder:text-slate-500 dark:placeholder:text-slate-400",
        "bg-white dark:bg-slate-950",
        "border-slate-200 dark:border-slate-800",

        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50",

        "outline-none focus-visible:border-slate-900 focus-visible:ring-0 dark:focus-visible:border-slate-300",
        "aria-invalid:border-red-500 aria-invalid:ring-0 dark:aria-invalid:border-red-500",

        className
      )}
      {...props}
    />
  )
}

export { Input }
