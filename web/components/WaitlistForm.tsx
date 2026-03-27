"use client";

import { useState } from "react";

interface Props {
  lang: "en" | "zh";
  copy: {
    placeholder: string;
    cta: string;
    note: string;
    success: string;
    error: string;
    duplicate: string;
  };
}

export default function WaitlistForm({ lang, copy }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, lang }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else if (data.code === "duplicate") {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="w-full max-w-md rounded-xl px-6 py-4 text-center text-sm font-medium"
        style={{ background: "var(--badge-bg)", color: "var(--success)", border: "1px solid var(--border)" }}
      >
        {copy.success}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div
          className="flex gap-2 rounded-xl p-1.5 pl-4 transition-all"
          style={{
            background: "var(--surface)",
            border: "1.5px solid var(--border)",
            boxShadow: "0 4px 16px rgba(81,162,255,0.08)",
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.placeholder}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--text-primary)" }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all disabled:opacity-60"
            style={{ background: "var(--accent)" }}
          >
            {status === "loading" ? "..." : copy.cta}
          </button>
        </div>
      </form>
      {(status === "error" || status === "duplicate") && (
        <p className="mt-2 text-xs text-center" style={{ color: "var(--text-secondary)" }}>
          {status === "duplicate" ? copy.duplicate : copy.error}
        </p>
      )}
      <p className="mt-3 text-xs text-center" style={{ color: "var(--text-secondary)" }}>
        🎁 {copy.note}
      </p>
    </div>
  );
}
