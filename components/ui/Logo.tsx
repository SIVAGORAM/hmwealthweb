import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** AMFI/SEBI: the distributor tagline sits with the brand name, clear and legible. */
export function Logo({ light, className, taglineClassName }: { light?: boolean; className?: string; taglineClassName?: string }) {
  return (
    <Link href="/" aria-label={`${site.name}, home`} className={cn("flex items-center gap-2.5", className)}>
      <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl bg-brand">
        <svg viewBox="0 0 40 40" className="absolute inset-0" aria-hidden>
          <path d="M6 30 L15 21 L21 26 L34 11" fill="none" stroke="#19c38a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
        </svg>
        <span className="relative text-[15px] font-extrabold tracking-tight text-white">HM</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("text-[19px] font-extrabold tracking-tight", light ? "text-white" : "text-ink")}>
          HM <span className={light ? "text-brand-bright" : "text-brand"}>Wealth</span>
        </span>
        <span className={cn("mt-1 text-[10.5px] font-semibold leading-[1.25] max-w-[150px] sm:max-w-none", light ? "text-white/70" : "text-body", taglineClassName)}>{site.tagline}</span>
      </span>
    </Link>
  );
}
