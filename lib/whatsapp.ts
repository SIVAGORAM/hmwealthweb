// WhatsApp click-to-chat helpers. No API keys: we open wa.me with a pre-filled message,
// and the visitor taps Send in their own WhatsApp.
import { site } from "@/lib/site";

/** wa.me link to the HM Wealth number with the message pre-filled. */
export function waLink(message: string) {
  return `${site.whatsappHref}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp in a new tab (app on phones, WhatsApp Web on desktop). */
export function openWhatsApp(message: string) {
  const url = waLink(message);
  const win = window.open(url, "_blank");
  if (win) win.opener = null; // safety: the new tab can't control this page
  else window.location.href = url; // popup blocked: open WhatsApp in this tab instead
}

/* ---------- validation ---------- */
export const clean = {
  name: (v: string) => v.replace(/\s+/g, " ").trim(),
  phone: (v: string) => v.replace(/[\s\-()]/g, "").replace(/^\+?91(?=\d{10}$)/, "").replace(/^0(?=\d{10}$)/, ""),
  email: (v: string) => v.trim(),
};

export function validateName(raw: string): string | null {
  const v = clean.name(raw);
  if (!v) return "Please enter your name.";
  if (v.length < 2) return "Name looks too short.";
  if (v.length > 50) return "Please keep the name under 50 characters.";
  if (!/^[A-Za-z][A-Za-z .'-]*$/.test(v)) return "Use letters only (no numbers or symbols).";
  return null;
}

export function validatePhone(raw: string): string | null {
  const v = clean.phone(raw);
  if (!v) return "Please enter your mobile number.";
  if (!/^\d+$/.test(v)) return "Use digits only.";
  if (v.length !== 10) return "Enter a 10-digit mobile number.";
  if (!/^[6-9]/.test(v)) return "Indian mobile numbers start with 6, 7, 8 or 9.";
  if (/^(\d)\1{9}$/.test(v)) return "Please enter a real mobile number.";
  return null;
}

export function validateEmail(raw: string, required = false): string | null {
  const v = clean.email(raw);
  if (!v) return required ? "Please enter your email." : null;
  if (v.length > 80 || !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(v)) return "Please enter a valid email address.";
  return null;
}

/** Formats a lead into a tidy WhatsApp message. */
export function leadMessage(lead: { source: string; name: string; phone: string; email?: string; interest?: string; note?: string }) {
  return [
    `*New enquiry: HM Wealth (${lead.source})*`,
    ``,
    `👤 *Name:* ${clean.name(lead.name)}`,
    `📞 *Mobile:* +91 ${clean.phone(lead.phone)}`,
    lead.email && clean.email(lead.email) ? `✉️ *Email:* ${clean.email(lead.email)}` : null,
    lead.interest ? `🎯 *Interested in:* ${lead.interest}` : null,
    lead.note && lead.note.trim() ? `💬 *Message:* ${lead.note.trim()}` : null,
    ``,
    `_Sent from hmwealth.in_`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
