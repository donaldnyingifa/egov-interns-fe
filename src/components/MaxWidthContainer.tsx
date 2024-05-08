import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

export const MaxWidthContainer = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className }, ref) => {
  return (
    <div
      className={cn("max-w-7xl mx-auto px-4 2xl:px-0 ", className)}
      ref={ref}
    >
      {children}
    </div>
  );
});
