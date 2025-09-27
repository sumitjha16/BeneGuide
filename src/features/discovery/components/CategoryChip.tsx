import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Category } from "../types";

interface CategoryChipProps {
  category: Category;
  isSelected?: boolean;
  confidence?: number;
  className?: string;
}

export function CategoryChip({ category, isSelected, confidence, className }: CategoryChipProps) {
  const displayName = category.replace("_", " ");
  
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200",
      isSelected 
        ? "bg-brand-600/20 border-brand-600 text-brand-300 shadow-md" 
        : "bg-surface border-border text-text-muted hover:bg-elev-1",
      className
    )}>
      <span className="font-medium">{displayName}</span>
      {isSelected && confidence && (
        <Badge variant="secondary" className="text-xs bg-brand-700 text-brand-100 border-brand-600">
          {Math.round(confidence * 100)}%
        </Badge>
      )}
    </div>
  );
}