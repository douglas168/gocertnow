import type { Metadata } from "next";
import { Poppins, Open_Sans, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-cjk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LevelCert — 考取證照，開啟未來",
  description:
    "專為幫你通過考試而生的證照備考平台。AI 模擬考試、結構化學習路徑，以及通過保證。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${poppins.variable} ${openSans.variable} ${notoSansTC.variable} bg-background text-foreground font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
