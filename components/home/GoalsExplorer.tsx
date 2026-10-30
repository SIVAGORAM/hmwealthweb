import Link from "next/link";
import { ArrowUpRight, Home as HomeIcon, GraduationCap, Sunset, LifeBuoy, Landmark, Target, Clock } from "lucide-react";
import { Container } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/Reveal";
import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { photos } from "@/lib/photos";

const GOALS = [
  { icon: GraduationCap, t: "Child’s education", time: "5 to 15 years", photo: photos.family, pos: "45% 30%",
    d: "Start early with equity funds and move to safer funds as admission year nears.", calc: "education", accent: "#6b4fd1", soft: "#f0ecff" },
  { icon: HomeIcon, t: "Dream home", time: "3 to 7 years", photo: photos.home, pos: "60% 40%",
    d: "Build your down-payment with a mix that stays steady as the date comes closer.", calc: "goal", accent: "#2f6fd6", soft: "#e8f1ff" },
  { icon: Sunset, t: "Retirement", time: "15+ years", photo: photos.retirementHero, pos: "64% 40%",
    d: "Grow a corpus with SIPs now, then draw a monthly income with SWP.", calc: "retirement", accent: "#d6662f", soft: "#fff0e8" },
  { icon: LifeBuoy, t: "Emergency fund", time: "Any time", photo: photos.motherDaughter, pos: "50% 25%",
    d: "Keep about 6 months of expenses in funds you can access quickly.", calc: "lumpsum", accent: "#0b7a55", soft: "#e7f6ef" },
  { icon: Landmark, t: "Long-term wealth", time: "7+ years", photo: photos.wealthCouple, pos: "50% 35%",
    d: "Index and flexi-cap funds for steady growth across many years.", calc: "sip", accent: "#0f8a8a", soft: "#e4f6f6" },
];

const WIDE = [0, 3, 4]; // tiles that span two columns

export function GoalsExplorer() {
  return (
    <section className="relative overflow-hidden py-6 sm:py-9 lg:py-11">
      <Container>
        {/* header */}
        <Reveal className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
              <Target className="size-3.5" />Goal-based investing
            </span>
            <h2 className="mt-1.5 sm:mt-2 text-[32px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[44px]">
              What are you <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">saving for?</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-body lg:pb-1">
            Every goal has its own timeline, and the timeline decides the kind of fund that fits.
          </p>
        </Reveal>

        {/* compact photo bento */}
        <div className="mt-2 sm:mt-2.5 grid auto-rows-[190px] grid-cols-2 gap-2.5 xs:auto-rows-[210px] sm:auto-rows-[250px] sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {GOALS.map((g, i) => (
            <Reveal key={g.t} delay={i * 0.05} className={WIDE.includes(i) ? "col-span-2" : ""}>
              <Link href={`/calculators?c=${g.calc}`} className="group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[22px] p-3 text-white sm:rounded-[26px] sm:p-5">
                <ProtectedImage src={g.photo.src} alt={g.photo.alt} fill sizes="(min-width:1024px) 50vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" style={{ objectPosition: g.pos }} />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 to-black/0 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/45" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ background: g.accent }} />

                {/* top row */}
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/20 px-2 py-0.5 text-[10.5px] font-bold backdrop-blur-md sm:bg-white/15 sm:px-2.5 sm:py-1 sm:text-[12px]">
                    <Clock className="size-3 sm:size-3.5" />{g.time}
                  </span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-md transition-transform duration-500 group-hover:rotate-45 sm:size-10">
                    <ArrowUpRight className="size-3.5 sm:size-[18px]" />
                  </span>
                </div>

                {/* bottom */}
                <div>
                  <span className="mb-2 flex size-8 items-center justify-center rounded-lg backdrop-blur-md sm:mb-2.5 sm:size-10 sm:rounded-xl" style={{ background: `${g.accent}cc` }}>
                    <g.icon className="size-[18px] text-white sm:size-5" />
                  </span>
                  <h3 className="text-[15px] font-extrabold leading-tight tracking-[-0.02em] xs:text-[16px] sm:text-[22px]">{g.t}</h3>
                  <p className="grid grid-rows-[0fr] text-[13.5px] leading-relaxed text-white/80 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:pt-1.5">
                    <span className="overflow-hidden">{g.d}</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-4 sm:mt-5 text-center text-[13px] text-body">Tap any goal to open its calculator. Fund types are general examples, not a recommendation.</p>
      </Container>
    </section>
  );
}
