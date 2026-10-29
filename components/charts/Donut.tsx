"use client";

import { motion } from "motion/react";

/** Two-part donut (e.g. invested vs gains). */
export function Donut({ a, b, la, lb, size = 180 }: { a: number; b: number; la: string; lb: string; size?: number }) {
  const total = Math.max(a + b, 1);
  const pa = (a / total) * 100;
  const r = 15.9;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 42 42" style={{ width: size, height: size }} className="-rotate-90 shrink-0" aria-hidden>
        <circle cx="21" cy="21" r={r} fill="none" stroke="#cfeedf" strokeWidth="6" />
        <motion.circle cx="21" cy="21" r={r} fill="none" stroke="#0b7a55" strokeWidth="6" pathLength={100}
          animate={{ strokeDasharray: `${100 - pa} ${pa}`, strokeDashoffset: -pa }} transition={{ duration: 0.45, ease: "easeOut" }} />
      </svg>
      <ul className="flex flex-col gap-3 text-[14px] font-medium text-body">
        <li className="flex items-center gap-2.5"><span className="size-3 rounded-full bg-mint-2" />{la}</li>
        <li className="flex items-center gap-2.5"><span className="size-3 rounded-full bg-brand" />{lb}</li>
      </ul>
    </div>
  );
}
