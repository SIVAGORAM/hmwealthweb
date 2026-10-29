"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Send,
  Lock,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  User,
  Mail,
  HelpCircle,
} from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const INTEREST_OPTIONS = [
  { value: "sip", label: "📈 Starting a Monthly SIP / Mutual Funds" },
  { value: "insurance", label: "🛡️ Term Life or Health Insurance Cover" },
  { value: "retirement", label: "🏖️ Retirement Goal Investing" },
  { value: "education", label: "🎓 Child Education Goal Investing" },
  { value: "nri", label: "🌐 NRI Investment Solutions" },
  { value: "audit", label: "📋 Existing Portfolio Review / Folio Check" },
  { value: "corporate", label: "🏢 Corporate & Group Employee Insurance" },
  { value: "other", label: "💬 General Inquiry / Other" },
];

type Errors = Partial<Record<"name" | "phone" | "email" | "interest", string>>;

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(INTEREST_OPTIONS[0].label);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/[\s-+]/g, "");
    const cleanEmail = email.trim();

    if (!cleanName) {
      next.name = "Please enter your full name.";
    }

    if (!cleanPhone) {
      next.phone = "Please enter your mobile number.";
    } else if (!/^(\+?91)?[6-9]\d{9}$/.test(cleanPhone)) {
      next.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      next.email = "Please enter a valid email address.";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Compose formatted WhatsApp payload
    const payload = [
      `*New Consultation Request — HM Wealth*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${cleanName}`,
      `📞 *Mobile:* +91 ${cleanPhone.slice(-10)}`,
      cleanEmail ? `✉️ *Email:* ${cleanEmail}` : null,
      `🎯 *Interested In:* ${interest}`,
      message.trim() ? `💬 *Goal/Question:* ${message.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Sent from hmwealth.in contact desk_`,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `${site.whatsappHref}?text=${encodeURIComponent(payload)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const inputStyle =
    "min-h-12 w-full rounded-xl border bg-soft/70 px-4 py-3 text-[15px] font-medium text-ink placeholder:text-body/60 transition focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-mint";

  if (sent) {
    return (
      <div
        role="status"
        className="relative overflow-hidden rounded-[28px] border border-brand/20 bg-gradient-to-br from-mint/40 via-white to-mint/20 p-8 text-center shadow-card sm:p-12"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_12px_24px_-8px_rgba(11,122,85,0.7)]">
          <CheckCircle2 className="size-8" />
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand shadow-xs">
          <Clock className="size-3.5" />
          Response Within 2 Business Hours
        </span>
        <h3 className="mt-4 text-2xl font-extrabold text-ink sm:text-[28px]">
          Message Sent Successfully!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-body">
          Thank you, <span className="font-bold text-ink">{name}</span>. Your request has been forwarded to our distribution support desk. Our licensed specialist will connect with you via Call or WhatsApp shortly.
        </p>

        <div className="mx-auto mt-6 flex max-w-md flex-col gap-2 rounded-2xl border border-line bg-white/90 p-4 text-left text-xs text-body shadow-xs">
          <div className="flex justify-between">
            <span className="font-semibold text-body">Requested For:</span>
            <span className="font-bold text-ink">{interest}</span>
          </div>
          <div className="flex justify-between border-t border-line/60 pt-2">
            <span className="font-semibold text-body">Contact Number:</span>
            <span className="font-bold text-ink">{phone}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-brand-dark"
          >
            <MessageCircle className="size-4" />
            Open WhatsApp Again
          </a>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-soft"
          >
            Edit Details / Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-6 rounded-[28px] border border-line bg-white p-6 shadow-card sm:p-10"
    >
      {/* Form Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-xs font-bold text-brand">
            <Sparkles className="size-3 text-brand" />
            Free Consultation
          </span>
          <span className="text-xs font-semibold text-body">
            ⚡ Response within 2 business hours
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-[28px]">
          Send Us a Message
        </h2>
        <p className="mt-1 text-[15px] leading-relaxed text-body">
          Fill in the details below, and a mutual fund specialist will get back to you within 2 business hours.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-name" className="text-[13.5px] font-bold text-ink">
            Full Name <span className="text-brand">*</span>
          </label>
          <div className="relative">
            <input
              id="c-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="e.g., Rajesh Sharma"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              aria-invalid={!!errors.name}
              className={cn(inputStyle, errors.name ? "border-red-400 bg-red-50/20" : "border-line")}
            />
          </div>
          {errors.name && (
            <p className="text-xs font-semibold text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-phone" className="text-[13.5px] font-bold text-ink">
            Mobile Number <span className="text-brand">*</span>
          </label>
          <div className="relative">
            <input
              id="c-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="e.g., 98765 43210"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              aria-invalid={!!errors.phone}
              className={cn(inputStyle, errors.phone ? "border-red-400 bg-red-50/20" : "border-line")}
            />
          </div>
          {errors.phone ? (
            <p className="text-xs font-semibold text-red-600">{errors.phone}</p>
          ) : (
            <p className="text-[11.5px] font-medium text-body/75">
              We will connect with you via Call or WhatsApp.
            </p>
          )}
        </div>
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-email" className="text-[13.5px] font-bold text-ink">
          Email Address <span className="text-body font-normal">(Optional)</span>
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-invalid={!!errors.email}
          className={cn(inputStyle, errors.email ? "border-red-400 bg-red-50/20" : "border-line")}
        />
        {errors.email && (
          <p className="text-xs font-semibold text-red-600">{errors.email}</p>
        )}
      </div>

      {/* I Am Interested In */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-interest" className="text-[13.5px] font-bold text-ink">
          I Am Interested In <span className="text-brand">*</span>
        </label>
        <div className="relative">
          <select
            id="c-interest"
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={cn(
              inputStyle,
              "border-line appearance-none cursor-pointer pr-10 text-[14.5px] font-medium"
            )}
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-body" />
        </div>
      </div>

      {/* How Can We Help You? (Optional Textarea) */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-message" className="text-[13.5px] font-bold text-ink">
          How Can We Help You? <span className="text-body font-normal">(Optional)</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={3}
          placeholder="Tell us a little about your goal, preferred timeline, or any specific questions you have..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(inputStyle, "border-line resize-y py-3 min-h-[96px]")}
        />
      </div>

      {/* Privacy Reassurance */}
      <div className="flex items-center gap-2 rounded-xl bg-soft/60 px-3.5 py-2.5 text-xs text-body border border-line/60">
        <Lock className="size-3.5 shrink-0 text-brand" />
        <span>
          🔒 Your data is 100% safe. We never share your details or send spam.
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-brand px-8 text-[15.5px] font-extrabold text-white shadow-[0_12px_24px_-8px_rgba(11,122,85,0.7)] transition-all duration-200 hover:bg-brand-dark hover:shadow-lg active:scale-[0.99] sm:w-fit"
      >
        <span>Request a Callback</span>
        <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
