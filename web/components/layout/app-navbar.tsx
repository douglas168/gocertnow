"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { StreakCounter } from "@/components/rpg/streak-counter";
import { XpDisplay } from "@/components/rpg/xp-display";
import { sampleDashboard } from "@/lib/sample-data";

const navLinks = [
  { label: "儀表板", href: "/dashboard" },
  { label: "我的課程", href: "/courses" },
];

export function AppNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-0 font-heading text-xl font-bold cursor-pointer"
        >
          Level<span className="text-cta">Cert</span>
        </Link>

        {/* Desktop nav + RPG stats */}
        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="h-6 w-px bg-border" />

          {/* RPG indicators */}
          <div className="flex items-center gap-3">
            <StreakCounter streak={sampleDashboard.streak} size="sm" />
            <XpDisplay xp={sampleDashboard.xp} size="sm" />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-4">
            {/* RPG stats */}
            <div className="flex items-center gap-4 pb-3 border-b border-border">
              <StreakCounter streak={sampleDashboard.streak} size="sm" />
              <XpDisplay xp={sampleDashboard.xp} size="sm" />
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block cursor-pointer rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground min-h-[44px]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
