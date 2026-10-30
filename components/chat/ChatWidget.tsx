"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircleMore, Send, X, RotateCcw, CheckCheck, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { clean, leadMessage, openWhatsApp, validateEmail, validateName, validatePhone } from "@/lib/whatsapp";

type Step = "topic" | "name" | "phone" | "email" | "done";
type Msg = { id: number; from: "bot" | "user"; text: string };

const TOPICS = [
  "Start a SIP",
  "Mutual funds",
  "Life insurance",
  "Health insurance",
  "Retirement",
  "Child education",
  "General inquiry",
];
const SEEN_KEY = "hmw-chat-seen";

/**
 * Compact, modern, luxury fintech assistant for HM Wealth (hmwealth.in).
 * Validates lead inputs and opens pre-filled WhatsApp message.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [step, setStep] = useState<Step>("topic");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lead, setLead] = useState({ interest: "", name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((from: Msg["from"], text: string) => {
    idRef.current += 1;
    setMsgs((m) => [...m, { id: idRef.current, from, text }]);
  }, []);

  /** Bot speaks after a short "typing…" pause, one line at a time. */
  const botSay = useCallback((lines: string[], then?: () => void) => {
    setTyping(true);
    let i = 0;
    const next = () => {
      setTimeout(() => {
        push("bot", lines[i]);
        i += 1;
        if (i < lines.length) next();
        else {
          setTyping(false);
          then?.();
        }
      }, 480);
    };
    next();
  }, [push]);

  const start = useCallback(() => {
    setMsgs([]);
    setLead({ interest: "", name: "", phone: "", email: "" });
    setStep("topic");
    setSent(false);
    setInput("");
    setError(null);
    botSay([
      `Hi there 👋 Welcome to HM Wealth (${site.domain || "hmwealth.in"}).`,
      "How can our distribution desk help your goals today?",
    ]);
  }, [botSay]);

  // First open starts the conversation
  const startedRef = useRef(false);
  useEffect(() => {
    if (open && !startedRef.current) {
      startedRef.current = true;
      start();
    }
  }, [open, start]);

  // Auto popup after 2.5 seconds on visit or page refresh
  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(true);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom on updates
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, step]);

  useEffect(() => {
    if (open && !typing && (step === "name" || step === "phone" || step === "email")) {
      inputRef.current?.focus();
    }
  }, [open, typing, step]);

  // Esc closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const chooseTopic = (t: string) => {
    if (typing || step !== "topic") return;
    push("user", t);
    setLead((l) => ({ ...l, interest: t }));
    setStep("name");
    botSay(["Sure, happy to assist with that.", "May I know your full name?"]);
  };

  const skipEmail = () => {
    if (typing || step !== "email") return;
    push("user", "Skip");
    finish({ ...lead, email: "" });
  };

  const finish = (l: typeof lead) => {
    setLead(l);
    setStep("done");
    botSay([
      `Thank you, ${l.name.split(" ")[0]}! 🙏`,
      "Tap below to send your details directly to our team on WhatsApp.",
    ]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typing) return;
    const v = input;
    if (step === "name") {
      const err = validateName(v);
      if (err) return setError(err);
      const name = clean.name(v);
      push("user", name);
      setLead((l) => ({ ...l, name }));
      setInput(""); setError(null);
      setStep("phone");
      botSay([`Nice to meet you, ${name.split(" ")[0]}!`, "What is your 10-digit mobile number?"]);
    } else if (step === "phone") {
      const err = validatePhone(v);
      if (err) return setError(err);
      const phone = clean.phone(v);
      push("user", phone.replace(/(\d{5})(\d{5})/, "$1 $2"));
      setLead((l) => ({ ...l, phone }));
      setInput(""); setError(null);
      setStep("email");
      botSay(["Got it.", "Your email address? (optional, you can skip)"]);
    } else if (step === "email") {
      const err = validateEmail(v);
      if (err) return setError(err);
      const email = clean.email(v);
      push("user", email || "Skip");
      setInput(""); setError(null);
      finish({ ...lead, email });
    }
  };

  const sendWhatsApp = () => {
    openWhatsApp(
      leadMessage({
        source: `Website Assistance (${site.domain || "hmwealth.in"})`,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        interest: lead.interest,
      })
    );
    if (!sent) {
      setSent(true);
      botSay([
        "WhatsApp is opening with your details filled in. Just tap Send ✅",
        "Our team will get back to you promptly.",
      ]);
    }
  };

  const placeholder =
    step === "name"
      ? "Enter your name…"
      : step === "phone"
      ? "10-digit mobile number"
      : step === "email"
      ? "Email address (optional)"
      : "";
  const showInput = step === "name" || step === "phone" || step === "email";

  return (
    <div className="fixed bottom-3.5 right-3.5 z-[60] flex flex-col items-end gap-2.5 sm:bottom-5 sm:right-5">
      {/* =========================================================================
          MODERN COMPACT CHAT WINDOW
      ========================================================================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`${site.name} Assistance`}
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(410px,calc(100svh-96px))] w-[calc(100vw-1.75rem)] max-w-[316px] origin-bottom-right flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_20px_50px_-12px_rgba(4,38,28,0.32)] ring-1 ring-line/80"
          >
            {/* Modern Light Executive Header */}
            <div className="relative border-b border-line/80 bg-white/98 px-3.5 py-2.5 backdrop-blur-xs">
              {/* Top brand accent hairline */}
              <div
                aria-hidden
                className="absolute left-0 right-0 top-0 h-[2.5px] bg-gradient-to-r from-brand via-brand-bright to-[#e0a92e]"
              />

              <div className="flex items-center gap-2.5">
                {/* Avatar Monogram with crisp white tile & high contrast */}
                <span className="relative flex size-8 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-xs ring-1 ring-brand/25">
                  <ProtectedImage
                    src="/images/brand/hm-wealth-icon-transparent.png"
                    alt="HM Wealth Assistance"
                    width={22}
                    height={18}
                    className="size-full object-contain"
                  />
                  <span
                    className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-1.5 ring-white"
                    aria-hidden
                  />
                </span>

                {/* Title & Domain info */}
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-[13.5px] font-extrabold tracking-tight text-ink">
                    {site.name} Assistance
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-brand">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                    {typing ? "typing…" : `${site.domain || "hmwealth.in"} · Online Desk`}
                  </p>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={start}
                    aria-label="Restart conversation"
                    title="Restart"
                    className="flex size-7 items-center justify-center rounded-lg text-body/70 transition hover:bg-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    <RotateCcw className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="flex size-7 items-center justify-center rounded-lg text-body/70 transition hover:bg-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Message Feed */}
            <div
              ref={bodyRef}
              aria-live="polite"
              className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f8faf9] to-[#f2f6f4] px-3 py-3"
            >
              <div className="flex flex-col gap-2">
                {msgs.map((m) => (
                  <div key={m.id} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                    <p
                      className={cn(
                        "max-w-[85%] whitespace-pre-line px-3 py-2 text-[12.5px] leading-relaxed shadow-2xs",
                        m.from === "user"
                          ? "rounded-2xl rounded-tr-xs bg-brand text-white font-medium"
                          : "rounded-2xl rounded-tl-xs border border-line/80 bg-white text-ink"
                      )}
                    >
                      {m.text}
                      {m.from === "user" && (
                        <CheckCheck className="ml-1 inline size-3 align-[-1px] text-[#7ff0c4]" aria-hidden />
                      )}
                    </p>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {typing && (
                  <div className="flex justify-start" aria-label="typing">
                    <span className="flex gap-1 rounded-2xl rounded-tl-xs border border-line/70 bg-white px-3 py-2 shadow-2xs">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="size-1.5 rounded-full bg-brand/50"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: d * 0.15 }}
                        />
                      ))}
                    </span>
                  </div>
                )}

                {/* Quick Topic Chips */}
                {!typing && step === "topic" && msgs.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => chooseTopic(t)}
                        className="rounded-lg border border-brand/20 bg-white px-2.5 py-1 text-[11px] font-semibold text-brand shadow-2xs transition-all duration-150 hover:bg-brand hover:text-white active:scale-95"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}

                {/* Optional Email Skip */}
                {!typing && step === "email" && (
                  <div className="mt-0.5 flex">
                    <button
                      type="button"
                      onClick={skipEmail}
                      className="rounded-md border border-line bg-white px-2.5 py-0.5 text-[11px] font-semibold text-body transition hover:text-ink hover:bg-soft"
                    >
                      Skip this step
                    </button>
                  </div>
                )}

                {/* Summary & One-Tap WhatsApp Send */}
                {!typing && step === "done" && (
                  <div className="mt-1 rounded-xl border border-line/80 bg-white p-3 shadow-2xs">
                    <dl className="grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1 text-[11.5px]">
                      <dt className="text-body font-medium">Name:</dt>
                      <dd className="truncate font-bold text-ink">{lead.name}</dd>
                      <dt className="text-body font-medium">Mobile:</dt>
                      <dd className="font-bold text-ink">+91 {lead.phone}</dd>
                      {lead.email && (
                        <>
                          <dt className="text-body font-medium">Email:</dt>
                          <dd className="truncate font-semibold text-ink">{lead.email}</dd>
                        </>
                      )}
                      <dt className="text-body font-medium">Inquiry:</dt>
                      <dd className="truncate font-bold text-brand">{lead.interest}</dd>
                    </dl>

                    <button
                      type="button"
                      onClick={sendWhatsApp}
                      className="mt-2.5 flex min-h-9 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25d366] to-[#1ebe5d] text-[13px] font-bold text-white shadow-xs transition hover:brightness-105 active:scale-[0.98]"
                    >
                      <WhatsAppGlyph className="size-4" />
                      {sent ? "Open WhatsApp again" : "Send on WhatsApp"}
                    </button>
                    <p className="mt-1 text-center text-[10px] text-body/75">
                      Direct connection · {site.domain || "hmwealth.in"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Input Bar */}
            {showInput && (
              <form onSubmit={submit} noValidate className="border-t border-line/80 bg-white px-2.5 py-2">
                {error && <p role="alert" className="mb-1 px-1 text-[11px] font-semibold text-rose-600">{error}</p>}
                <div className="flex items-center gap-1.5">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => {
                      let v = e.target.value;
                      if (step === "phone") v = v.replace(/[^\d+\s-]/g, "").slice(0, 15);
                      if (step === "name") v = v.replace(/[^A-Za-z .'-]/g, "").slice(0, 50);
                      if (step === "email") v = v.replace(/\s/g, "").slice(0, 80);
                      setInput(v);
                      if (error) setError(null);
                    }}
                    disabled={typing}
                    type={step === "email" ? "email" : step === "phone" ? "tel" : "text"}
                    inputMode={step === "phone" ? "numeric" : step === "email" ? "email" : "text"}
                    autoComplete={step === "name" ? "name" : step === "phone" ? "tel-national" : "email"}
                    placeholder={placeholder}
                    aria-label={placeholder}
                    aria-invalid={!!error}
                    className={cn(
                      "min-h-9 flex-1 rounded-xl border bg-soft/60 px-3 text-[12.5px] text-ink placeholder:text-body/60 focus:bg-white focus:outline-none",
                      error ? "border-rose-400" : "border-line focus:border-brand"
                    )}
                  />
                  <button
                    type="submit"
                    disabled={typing || !input.trim()}
                    aria-label="Send"
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand text-white transition hover:bg-brand-dark disabled:opacity-40"
                  >
                    <Send className="size-3.5" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          COMPACT GREETING TEASER BUBBLE
      ========================================================================== */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="relative max-w-[220px] rounded-2xl bg-white p-2.5 pr-7 shadow-lift ring-1 ring-line/80 text-left"
          >
            <button
              type="button"
              onClick={() => setTeaser(false)}
              aria-label="Dismiss greeting"
              className="absolute right-2 top-2 text-body/50 hover:text-ink"
            >
              <X className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setTeaser(false);
                setOpen(true);
              }}
              className="text-left"
            >
              <p className="text-[12px] font-extrabold text-ink flex items-center gap-1">
                <Sparkles className="size-3 text-gold" />
                HM Wealth Desk
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-body">
                Need guidance on SIP or cover? Chat with us on <span className="font-bold text-brand">{site.domain || "hmwealth.in"}</span>.
              </p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODERN COMPACT CONCIERGE ASSISTANCE LAUNCHER
      ========================================================================== */}
      <div className="flex items-center gap-2">
        {/* Desktop Interactive Assistance Pill */}
        {!open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              setTeaser(false);
              setOpen(true);
            }}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-line/80 bg-white/98 px-3.5 py-1.5 text-xs font-bold text-ink shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-xs transition hover:border-brand/40 hover:bg-white active:scale-95"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-mint text-brand">
              <MessageCircleMore className="size-3.5" />
            </span>
            <span>Ask HM Wealth</span>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
          </motion.button>
        )}

        {/* Floating Assistance Button */}
        <button
          type="button"
          onClick={() => {
            setTeaser(false);
            setOpen((o) => !o);
          }}
          aria-label={open ? "Close assistance" : `Chat with ${site.name} Assistance`}
          aria-expanded={open}
          className="group relative flex size-12 sm:size-13 items-center justify-center rounded-full bg-gradient-to-br from-brand-deep via-brand to-brand-bright text-white shadow-[0_8px_25px_-4px_rgba(11,122,85,0.45)] ring-2 ring-white/90 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {open ? (
            <X className="size-5 transition-transform duration-200" />
          ) : (
            <span className="relative flex items-center justify-center">
              {/* Premium modern concierge chat icon */}
              <MessageCircleMore className="size-6 text-white transition-transform duration-200 group-hover:scale-110" />

              {/* Small blinking live radar indicator */}
              <span className="absolute -top-1 -right-1 flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-80" />
                <span className="relative inline-flex size-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              </span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47a9.4 9.4 0 0 1 6.7 2.78 9.4 9.4 0 0 1 2.77 6.7c0 5.23-4.25 9.47-9.47 9.47zm8.06-17.53A11.33 11.33 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.7L.55 23.63l6.05-1.59a11.38 11.38 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.34-8.06z" />
    </svg>
  );
}
