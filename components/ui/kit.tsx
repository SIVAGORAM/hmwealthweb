import Link from "next/link";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type Variant = "primary" | "outline" | "white" | "ghost-white" | "gold";
const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-[0_8px_20px_-8px_rgba(11,122,85,0.6)] hover:bg-brand-dark",
  outline: "border border-line bg-white text-ink hover:border-brand hover:text-brand",
  white: "bg-white text-brand-deep hover:bg-mint",
  "ghost-white": "border border-white/30 text-white hover:bg-white/10",
  gold: "bg-gold text-ink hover:brightness-95",
};

export function Button({ href, children, variant = "primary", className, external }: {
  href: string; children: React.ReactNode; variant?: Variant; className?: string; external?: boolean;
}) {
  const cls = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-[15px] font-bold transition-all duration-200 active:scale-[0.98]",
    variants[variant],
    className,
  );
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
    : <Link href={href} className={cls}>{children}</Link>;
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex w-fit items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-[13px] font-semibold text-brand", className)}>
      {children}
    </span>
  );
}

export function SectionTitle({ badge, title, intro, center, className, light }: {
  badge?: string; title: React.ReactNode; intro?: React.ReactNode; center?: boolean; className?: string; light?: boolean;
}) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-1 sm:gap-1.5", center && "mx-auto items-center text-center", className)}>
      {badge && <Badge className={light ? "bg-white/10 text-white" : undefined}>{badge}</Badge>}
      <h2 className={cn("text-[28px] font-extrabold leading-[1.1] sm:text-[38px]", light ? "text-white" : "text-ink")}>{title}</h2>
      {intro && <p className={cn("text-[14.5px] sm:text-[15.5px] leading-relaxed", light ? "text-white/75" : "text-body")}>{intro}</p>}
    </div>
  );
}

export function Section({ children, className, id, soft }: { children: React.ReactNode; className?: string; id?: string; soft?: boolean }) {
  return (
    <section id={id} className={cn("py-1.5 sm:py-2", soft && "bg-soft", className)}>
      {children}
    </section>
  );
}

const tints = {
  green: "bg-mint text-brand",
  sky: "bg-sky text-sky-ink",
  peach: "bg-peach text-peach-ink",
  lilac: "bg-lilac text-lilac-ink",
  gold: "bg-gold-soft text-[#b07a10]",
} as const;
export type Tint = keyof typeof tints;

export function IconBox({ children, tint = "green", className }: { children: React.ReactNode; tint?: Tint; className?: string }) {
  return <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-2xl", tints[tint], className)}>{children}</div>;
}

export function Card({ children, className, hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={cn("rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card", hover && "transition-all duration-300 hover:-translate-y-1 hover:border-mint-2 hover:shadow-lift", className)}>
      {children}
    </div>
  );
}
