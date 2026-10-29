import "@fontsource-variable/outfit/wght.css";

const WORD = "HM Wealth".split("");

/** Giant brand wordmark: a soft light travels letter by letter, on a loop. */
export function FooterWordmark() {
  let n = 0;
  return (
    <div aria-hidden className="relative mt-10 select-none overflow-hidden px-4 pb-8 sm:pb-10">
      <p className="flex justify-center whitespace-nowrap text-[17vw] font-semibold leading-[0.9] tracking-[-0.045em] [font-family:'Outfit_Variable',sans-serif] min-[1600px]:text-[272px]">
        {WORD.map((ch, i) =>
          ch === " " ? (
            <span key={i} className="w-[0.2em]" />
          ) : (
            <span key={i} className="wm-letter inline-block" style={{ ["--i" as string]: n++ }}>
              {ch}
            </span>
          ),
        )}
      </p>
    </div>
  );
}
