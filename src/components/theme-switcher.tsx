"use client";

import { IconButton } from "@/components/icon-button";
import { MoonIcon } from "@/icons/moon-icon";
import { SunIcon } from "@/icons/sun-icon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 w-8" aria-hidden="true">
        {/* Placeholder to prevent layout shift */}
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <IconButton
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="transition-colors"
    >
      {isDark ? (
        <SunIcon className="stroke-gray-950 dark:stroke-white" />
      ) : (
        <MoonIcon className="stroke-gray-950 dark:stroke-white" />
      )}
    </IconButton>
  );
}
