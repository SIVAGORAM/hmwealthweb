import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Indian currency format, e.g. ₹12,34,567 */
export function inr(value: number) {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

/** Compact Indian format for chart axes, e.g. ₹50.5 L, ₹1.2 Cr */
export function inrShort(value: number) {
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(value >= 1e8 ? 0 : 1)} Cr`;
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(value >= 1e6 ? 0 : 1)} L`;
  if (value >= 1e3) return `₹${Math.round(value / 1e3)}k`;
  return inr(value);
}
