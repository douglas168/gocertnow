import Link from "next/link";

const footerLinks = [
  { label: "關於我們", href: "#" },
  { label: "隱私權政策", href: "#" },
  { label: "使用條款", href: "#" },
  { label: "聯絡我們", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-heading text-xl font-bold cursor-pointer"
            >
              Level<span className="text-cta">Cert</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              專為幫你通過考試而生的證照備考平台。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold mb-4">
              相關連結
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="cursor-pointer text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading text-sm font-semibold mb-4">
              社群媒體
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="cursor-pointer text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 LevelCert.com &mdash; 版權所有
          </p>
        </div>
      </div>
    </footer>
  );
}
