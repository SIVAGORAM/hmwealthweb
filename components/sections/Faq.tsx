"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Editorial accordion: hairline rows, numbered, one open at a time. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div key={it.q} className="relative isolate border-b border-line">
            {/* open wash */}
            <motion.span aria-hidden className="absolute inset-y-1 -left-2 -right-2 sm:-left-4 sm:-right-4 -z-10 rounded-2xl bg-white shadow-[0_18px_40px_-30px_rgba(4,38,28,0.45)]"
              initial={false} animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.98 }} transition={{ duration: 0.3 }} />
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : i)}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-5 text-left sm:gap-6 sm:py-6">
                <span className={cn("text-[13px] font-extrabold tabular-nums transition-colors", isOpen ? "text-brand" : "text-ink/25 group-hover:text-brand/60")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("text-[16.5px] font-bold tracking-[-0.01em] transition-colors sm:text-[18px]", isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink")}>
                  {it.q}
                </span>
                <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen ? "rotate-45 border-brand bg-brand text-white shadow-[0_8px_18px_-8px_rgba(11,122,85,0.8)]" : "border-line bg-white text-ink group-hover:border-brand/40 group-hover:text-brand")}>
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={id} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <p className="max-w-2xl pb-6 pl-[calc(13px*2+1rem)] pr-12 text-[15.5px] leading-relaxed text-body sm:pl-[calc(13px*2+1.5rem)]">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
