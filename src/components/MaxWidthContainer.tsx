import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

export const MaxWidthContainer = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...otherProps }, ref) => {
  return (
    <div
      className={cn("max-w-7xl mx-auto px-4 2xl:px-0 ", className)}
      ref={ref}
      {...otherProps}
    />
  );
});

MaxWidthContainer.displayName = "MaxWidthContainer";
