"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  collapsed?: boolean;
  className?: string;
}

export default function ThemeToggle({ collapsed, className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder with the same dimensions to prevent layout shift
    return (
      <div className={`h-10 w-full animate-pulse bg-white/5 rounded-lg ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        group relative flex items-center cursor-pointer
        ${collapsed ? "justify-center px-0" : "justify-between px-3"}
        w-full py-2.5 rounded-xl
        bg-black/5 dark:bg-white/5
        hover:bg-purple-500/10 dark:hover:bg-purple-500/10
        border border-transparent hover:border-purple-500/20
        transition-all duration-300
        ${className}
      `}
      aria-label="Toggle theme"
    >
      {/* Icon Section */}
      <div className={`relative flex items-center justify-center ${collapsed ? "w-full" : ""}`}>
        <Sun
          size={18}
          className={`
            absolute transition-all duration-300
            ${isDark ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0 text-orange-500"}
          `}
        />
        <Moon
          size={18}
          className={`
            transition-all duration-300
            ${isDark ? "scale-100 opacity-100 rotate-0 text-purple-400" : "scale-0 opacity-0 -rotate-90"}
          `}
        />
      </div>

      {/* Label Section (only if not collapsed) */}
      {!collapsed && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      )}
    </button>
  );
}
