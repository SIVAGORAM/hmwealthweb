import Link from "next/link";
import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * HM Wealth Official Client Logo Component.
 * Uses the exact brand asset provided by the client (geometric HM mark,
 * teal divider, HM WEALTH, and sub-tagline "HELPS YOU MANAGE & MULTIPLY").
 */
export function Logo({
  light,
  className,
  priority = true,
}: {
  light?: boolean;
  className?: string;
  taglineClassName?: string;
  showMotto?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className={cn("group inline-flex shrink-0 items-center transition-opacity hover:opacity-95", className)}
    >
      <div className={cn("relative h-9 sm:h-10 lg:h-11 w-auto aspect-[980/191]", light && "brightness-0 invert")}>
        <ProtectedImage
          src="/images/brand/hm-wealth-logo.png"
          alt="HM Wealth - Helps You Manage & Multiply"
          fill
          sizes="(min-width: 640px) 240px, 190px"
          className="size-full object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
          priority={priority}
        />
      </div>
    </Link>
  );
}

/** Full horizontal banner logo with divider and motto */
export function FullBrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-10 sm:h-11 w-auto aspect-[980/191]", className)}>
      <ProtectedImage
        src="/images/brand/hm-wealth-logo.png"
        alt="HM Wealth - Helps You Manage & Multiply"
        fill
        sizes="240px"
        className="size-full object-contain object-left"
        priority
      />
    </div>
  );
}
