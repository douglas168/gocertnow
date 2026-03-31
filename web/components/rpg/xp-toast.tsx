"use client";

import { cn } from "@/lib/utils";

interface XpToastProps {
  amount: number;
  visible?: boolean;
  className?: string;
}

export function XpToast({ amount, visible = true, className }: XpToastProps) {
  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-xl bg-surface px-5 py-3 shadow-xl border border-xp/30 transition-opacity duration-300",
        "motion-safe:animate-[fadeInUp_0.3s_ease-out]",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <span className="font-heading text-lg font-bold text-xp">
        +{amount} XP
      </span>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
