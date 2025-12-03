import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "shadow-right-bottom",
        "focus-visible:shadow-[1px_1px_0_0_oklch(0.568_0.1371_265.8)] focus-visible:border-2 focus-visible:border-secondary",
        "aria-invalid:shadow-[1px_1px_0_0_oklch(0.5906_0.2267_7)] aria-invalid:border-2 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
