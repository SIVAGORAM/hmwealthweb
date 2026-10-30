import { cn } from "@/lib/utils";

/**
 * Official AMFI (Association of Mutual Funds in India) Logo Badge.
 */
export function AmfiBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[60px] w-[90px] sm:h-[68px] sm:w-[104px] items-center justify-center rounded-2xl border border-line/90 bg-white p-2 shadow-2xs transition-transform hover:scale-105",
        className
      )}
      title="AMFI - Association of Mutual Funds in India"
    >
      <svg
        viewBox="0 0 100 80"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AMFI Logo"
      >
        <text
          x="50"
          y="18"
          textAnchor="middle"
          fill="#008060"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
        >
          AMFI
        </text>
        {/* Subtle grid lines */}
        <path d="M22 25 H78 M22 42 H78 M22 59 H78 M22 76 H78" stroke="#a7d7c5" strokeWidth="0.8" />
        <path d="M22 25 V76 M36 25 V76 M50 25 V76 M64 25 V76 M78 25 V76" stroke="#a7d7c5" strokeWidth="0.8" />
        {/* Row 1 (top): 1 triangle */}
        <polygon points="50,26 42,42 58,42" fill="#008060" />
        {/* Row 2 (mid): 2 triangles */}
        <polygon points="42,43 34,59 50,59" fill="#008060" />
        <polygon points="58,43 50,59 66,59" fill="#008060" />
        {/* Row 3 (base): 3 triangles */}
        <polygon points="34,60 26,76 42,76" fill="#008060" />
        <polygon points="50,60 42,76 58,76" fill="#008060" />
        <polygon points="66,60 58,76 74,76" fill="#008060" />
      </svg>
    </div>
  );
}

/**
 * Official "MUTUAL FUNDS Sahi Hai" Industry Campaign Logo Badge.
 */
export function MutualFundsSahiHaiBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[60px] min-w-[130px] sm:h-[68px] sm:min-w-[150px] items-center justify-center rounded-2xl border border-line/90 bg-white px-3.5 py-2 shadow-2xs transition-transform hover:scale-105",
        className
      )}
      title="Mutual Funds Sahi Hai"
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="text-[12.5px] sm:text-[13.5px] font-black tracking-tight text-slate-800">
          MUTUAL<span className="font-medium text-slate-500">FUNDS</span>
        </span>
        <span className="relative text-[13px] sm:text-[14.5px] font-black italic tracking-tight text-[#009e6d]">
          Sahi Hai
          <svg
            className="absolute -bottom-1 left-0 w-full"
            height="3"
            viewBox="0 0 60 3"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 2C15 0.5 45 0.5 59 2"
              stroke="#009e6d"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
