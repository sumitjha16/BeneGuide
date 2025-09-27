import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-10 w-[84px] items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-background z-[60]",
        isDark ? "bg-brand-700" : "bg-brand-200",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Track */}
  <div className="relative flex h-full w-full items-center rounded-full">
        {/* Sun Icon */}
        <div className={cn(
          "absolute left-2 flex h-6 w-6 items-center justify-center transition-opacity duration-300 z-[2]",
          !isDark ? "opacity-100" : "opacity-0"
        )}>
          <Sun className="h-4 w-4 text-brand-700" />
        </div>
        
        {/* Moon Icon */}
        <div className={cn(
          "absolute right-1 flex h-6 w-6 items-center justify-center transition-opacity duration-300 z-[2]",
          isDark ? "opacity-100" : "opacity-0"
        )}>
          <Moon className="h-4 w-4 text-brand-700" />
        </div>
        
        {/* Toggle Circle */}
        <div
          className={cn(
            "absolute h-8 w-8 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-[1]",
            isDark ? "translate-x-[52px]" : "translate-x-1"
          )}
        />
      </div>
    </button>
  );
}