"use client";

import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-05-25T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

function getTimeLeft(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000) / 60000),
    secs:  Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown({ labels }: { labels: string[] }) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.days,  label: labels[0] },
    { value: time.hours, label: labels[1] },
    { value: time.mins,  label: labels[2] },
    { value: time.secs,  label: labels[3] },
  ];

  return (
    <div className="flex gap-3 flex-wrap justify-center mb-12">
      {units.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center rounded-2xl px-6 py-4 min-w-[84px]"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 16px rgba(81,162,255,0.08)",
          }}
        >
          <span
            className="text-4xl font-extrabold leading-none mb-1 tabular-nums"
            style={{ color: "var(--accent)", letterSpacing: "-0.04em" }}
          >
            {pad(value)}
          </span>
          <span
            className="text-[0.68rem] font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-secondary)" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
