import React, { ComponentPropsWithRef } from "react";
import { cn } from "../../utils";

interface Props extends ComponentPropsWithRef<"div"> {}

export function Skeleton({ className, ...props }: Props) {
  return (
    <div
      className={cn("w-full bg-gray-200 rounded-sm animate-pulse", className)}
      {...props}
    />
  );
}
