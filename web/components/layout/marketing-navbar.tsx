"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "首頁", href: "/" },
  { label: "課程總覽", href: "/courses" },
  { label: "學習中心", href: "/dashboard" },
  { label: "模擬考試", href: "/exam/ipas-ai-beginner" },
];

export function MarketingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-0 font-heading text-xl font-bold cursor-pointer"
        >
          Level<span className="text-cta">Cert</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
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

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/courses">
            <Button className="cursor-pointer bg-cta text-white hover:bg-cta/80 min-h-[44px] px-4">
              開始學習
            </Button>
          </Link>
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
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
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
            <div className="pt-2">
              <Link href="/courses" onClick={() => setMobileOpen(false)}>
                <Button className="cursor-pointer w-full bg-cta text-white hover:bg-cta/80 min-h-[44px]">
                  開始學習
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
