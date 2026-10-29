import { cn } from "@/lib/utils";

/** Numbered step cards joined by a dashed line on desktop. */
export function Steps({ steps, dark }: { steps: { title: string; text: string; icon?: React.ReactNode }[]; dark?: boolean }) {
  return (
    <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <span aria-hidden className={cn("absolute left-[12%] right-[12%] top-9 hidden border-t-2 border-dashed lg:block", dark ? "border-white/20" : "border-mint-2")} />
      {steps.map((s, i) => (
        <li key={s.title} className={cn("relative flex flex-col gap-3 rounded-3xl p-6", dark ? "bg-white/[0.06] ring-1 ring-white/10" : "border border-line bg-white shadow-card")}>
          <span className={cn("relative flex size-12 items-center justify-center rounded-2xl text-lg font-extrabold", dark ? "bg-brand-bright text-brand-deep" : "bg-brand text-white")}>
            {s.icon ?? i + 1}
          </span>
          <p className={cn("text-xs font-bold uppercase tracking-wider", dark ? "text-brand-bright" : "text-brand")}>Step {i + 1}</p>
          <h3 className={cn("text-lg font-bold", dark ? "text-white" : "text-ink")}>{s.title}</h3>
          <p className={cn("text-[15px] leading-relaxed", dark ? "text-white/70" : "text-body")}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
