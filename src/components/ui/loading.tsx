import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        className
      )}
      aria-label="Loading"
    />
  );
}

interface LinearProgressProps {
  className?: string;
}

export function LinearProgress({ className }: LinearProgressProps) {
  return (
    <div className={cn("w-full bg-surface overflow-hidden rounded-full", className)}>
      <div className="h-1 bg-brand-600 animate-pulse w-2/3 rounded-full" />
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton rounded-md",
        className
      )}
    />
  );
}

// Card skeleton for benefits loading
export function BenefitCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

// Classification loading with category chips
export function ClassificationSkeleton() {
  const categories = ["Dental", "Vision", "Mental Health", "OPD"];
  
  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category, index) => (
          <div
            key={category}
            className={cn(
              "px-4 py-2 rounded-full border transition-all duration-200",
              index === 0 
                ? "bg-brand-600/20 border-brand-600 text-brand-300 animate-pulse" 
                : "bg-surface border-border text-text-muted"
            )}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

// Action plan steps skeleton
export function ActionPlanSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-5 w-32 mx-auto" />
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex gap-4 p-4 bg-surface rounded-lg border border-border">
            <div className="flex-shrink-0 w-8 h-8 bg-brand-600/20 rounded-full flex items-center justify-center text-brand-300 font-semibold">
              {step}
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}