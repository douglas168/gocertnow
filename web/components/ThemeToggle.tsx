"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="rounded-lg px-3 py-1.5 text-base border transition-colors"
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        color: "var(--text-primary)",
      }}
    >
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
