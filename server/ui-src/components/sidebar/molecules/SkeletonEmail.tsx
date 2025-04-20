import React from "react";
import { Skeleton } from "../../loading/atoms/Skeleton";

export function SkeletonEmail() {
  return (
    <div>
      <Skeleton className="h-5 w-32" />

      <div className="pt-2" />

      <Skeleton className="h-5 w-56" />

      <div className="pt-2" />

      <Skeleton className="h-3 w-48" />

      <div className="pt-1" />

      <Skeleton className="h-3 w-32" />
    </div>
  );
}
