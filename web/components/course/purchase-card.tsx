import { Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PurchaseCardProps {
  price: number;
  className?: string;
}

const features = [
  "3 個月完整存取權限",
  "通過保證 — 未通過免費延長 3 個月",
  "AI 智慧解析每一道錯題",
  "模擬考試無限次挑戰",
  "進度追蹤與能力雷達圖",
];

export function PurchaseCard({ price, className }: PurchaseCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card p-6 ring-1 ring-indigo-500/20 shadow-lg",
        className
      )}
    >
      {/* Price */}
      <div className="mb-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">課程價格</p>
        <p className="font-heading text-3xl font-bold">
          NT${price.toLocaleString()}
        </p>
      </div>

      {/* CTA */}
      <Button className="w-full cursor-pointer bg-cta text-white hover:bg-cta/80 min-h-[44px] text-base font-semibold mb-6">
        開始學習
      </Button>

      {/* Feature checklist */}
      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Pass guarantee */}
      <div className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 border border-emerald-500/20">
        <Shield className="size-5 shrink-0 text-emerald-400" />
        <p className="text-xs text-emerald-400 font-medium">
          通過保證 — 未通過免費延長 3 個月
        </p>
      </div>
    </div>
  );
}
