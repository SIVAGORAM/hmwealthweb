"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipDef {
  label: string;
  addValue: number;
}

interface DualControlProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  maxInput?: number;
  step?: number;
  unit?: "currency" | "percent" | "years" | "age";
  quickChips?: ChipDef[];
  onChange: (val: number) => void;
  helperText?: string;
  className?: string;
}

export function DualControl({
  id,
  label,
  value,
  min,
  max,
  maxInput,
  step = 1,
  unit = "currency",
  quickChips,
  onChange,
  helperText,
  className,
}: DualControlProps) {
  // Local string state to allow fluid typing without cursor jumps or premature clamping
  const [localStr, setLocalStr] = useState<string>(String(value));
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [validationWarning, setValidationWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generous ceiling for manual typing: users can type any custom value without being artificially locked
  const effectiveMax =
    maxInput ??
    (unit === "currency"
      ? 1000000000 // ₹100 Crores
      : unit === "percent"
      ? 100 // 100%
      : 100); // 100 Years

  // Sync from props when not focused
  useEffect(() => {
    if (!isFocused) {
      setLocalStr(String(value));
      setValidationWarning(null);
    }
  }, [value, isFocused]);

  const allowsDecimal = unit === "percent" || step < 1;

  /**
   * Strictly sanitize any raw input string:
   * - Strips negative signs (-)
   * - Strips all alphabets (a-z, A-Z)
   * - Keeps only 0-9 and optionally at most one single decimal point (.)
   */
  const sanitizeString = (raw: string): string => {
    let clean = raw.replace(/-/g, "");

    if (allowsDecimal) {
      clean = clean.replace(/[^0-9.]/g, "");
      const parts = clean.split(".");
      if (parts.length > 2) {
        clean = parts[0] + "." + parts.slice(1).join("");
      }
    } else {
      clean = clean.replace(/[^0-9]/g, "");
    }

    return clean;
  };

  /**
   * Keyboard handler:
   * CRITICAL FIX FOR MOBILE: Never block key events on Android / mobile soft keyboards!
   * Mobile virtual keyboards send e.key = "Unidentified" or keyCode = 229.
   * Blocking them with preventDefault() breaks typing on mobile devices.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If mobile soft keyboard (Android/iOS IME), always let the event pass to onChange!
    if (!e.key || e.key === "Unidentified" || e.keyCode === 229) {
      return;
    }

    // Allow navigation, deletion, copy/paste, enter, tab
    const allowedNavigationKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    if (allowedNavigationKeys.includes(e.key)) {
      return;
    }

    if (
      (e.ctrlKey || e.metaKey) &&
      ["a", "c", "v", "x"].includes(e.key.toLowerCase())
    ) {
      return;
    }

    // Arrow keys increment / decrement
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(effectiveMax, value + step);
      onChange(next);
      setLocalStr(String(next));
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(min, value - step);
      onChange(prev);
      setLocalStr(String(prev));
      return;
    }

    // Explicitly block negative sign (-)
    if (e.key === "-" || e.key === "Subtract") {
      e.preventDefault();
      setValidationWarning("Negative numbers are not allowed");
      return;
    }

    // Handle decimal point (.)
    if (e.key === "." || e.key === "Decimal") {
      if (!allowsDecimal) {
        e.preventDefault();
        setValidationWarning("Only whole numbers allowed");
        return;
      }
      if (localStr.includes(".")) {
        e.preventDefault();
        setValidationWarning("Only one decimal point allowed");
        return;
      }
      return;
    }

    // Only block explicitly known non-numeric keys on physical desktop keyboards
    if (e.key.length === 1 && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      setValidationWarning("Only numbers are allowed");
    }
  };

  /**
   * Sanitize clipboard paste data before inserting
   */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const sanitized = sanitizeString(pasteData);

    if (!sanitized) {
      setValidationWarning("Pasted text contained no valid numbers");
      return;
    }

    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart ?? localStr.length;
      const end = input.selectionEnd ?? localStr.length;
      const updated = localStr.slice(0, start) + sanitized + localStr.slice(end);
      const cleanUpdated = sanitizeString(updated);
      setLocalStr(cleanUpdated);

      const parsed = parseFloat(cleanUpdated);
      if (!isNaN(parsed) && parsed >= 0) {
        if (parsed > effectiveMax) {
          setValidationWarning(`Maximum allowed is ${effectiveMax.toLocaleString("en-IN")}`);
          onChange(effectiveMax);
        } else {
          setValidationWarning(null);
          onChange(parsed);
        }
      }
    }
  };

  /**
   * Handle typing in manual input box with live calculation updates
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean = sanitizeString(raw);
    setLocalStr(clean);

    if (clean === "") {
      return;
    }

    const parsed = parseFloat(clean);
    if (!isNaN(parsed) && parsed >= 0) {
      if (parsed > effectiveMax) {
        setValidationWarning(`Maximum value is ${effectiveMax.toLocaleString("en-IN")}`);
        onChange(effectiveMax);
      } else {
        setValidationWarning(null);
        // Allow the user to enter any amount; calculations update live!
        onChange(parsed);
      }
    }
  };

  /**
   * On blur, enforce minimum and ceiling bounds
   */
  const handleBlur = () => {
    setIsFocused(false);
    setValidationWarning(null);

    const clean = sanitizeString(localStr);
    const parsed = parseFloat(clean);

    if (isNaN(parsed) || clean === "" || parsed < min) {
      onChange(min);
      setLocalStr(String(min));
    } else if (parsed > effectiveMax) {
      onChange(effectiveMax);
      setLocalStr(String(effectiveMax));
    } else {
      onChange(parsed);
      setLocalStr(String(parsed));
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(val);
    setLocalStr(String(val));
    setValidationWarning(null);
  };

  const handleAddChip = (addVal: number) => {
    const next = Math.min(effectiveMax, Math.max(min, value + addVal));
    onChange(next);
    setLocalStr(String(next));
    setValidationWarning(null);
  };

  // Slider track fill percent safely clamped to [0, 100]
  const sliderMax = Math.max(max, min + 1);
  const fillPercent = Math.min(
    100,
    Math.max(0, ((Math.min(value, sliderMax) - min) / (sliderMax - min)) * 100)
  );

  const prefix = unit === "currency" ? "₹" : undefined;
  const suffix =
    unit === "percent"
      ? "%"
      : unit === "years"
      ? value === 1
        ? "Yr"
        : "Yrs"
      : unit === "age"
      ? "Yrs"
      : undefined;

  const hasWarning = validationWarning !== null && isFocused;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={id} className="text-[14px] font-semibold text-ink">
          {label}
        </label>

        {/* Quick Add Chip Pills */}
        {quickChips && quickChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddChip(chip.addValue)}
                className="inline-flex items-center gap-0.5 rounded-full border border-line bg-soft px-2.5 py-0.5 text-[11px] font-semibold text-body transition-colors hover:border-brand hover:bg-mint hover:text-brand active:scale-95"
              >
                {/* % chips set an exact rate; others add to the current value */}
                {!chip.label.endsWith("%") && <Plus className="size-2.5" />}
                {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Synchronized Slider: smoothly tracks up to max, stays at 100% if custom value exceeds max */}
        <div className="relative flex-1">
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={Math.min(value, max)}
            onChange={handleRangeChange}
            className="range w-full cursor-pointer"
            style={{ ["--fill" as string]: `${fillPercent}%` }}
            aria-label={`${label} slider`}
          />
        </div>

        {/* Manual Input with Unit Adornment & Fluid Touch/Typing */}
        <div
          className={cn(
            "relative flex min-w-[110px] xs:min-w-[130px] sm:min-w-[150px] shrink-0 items-center rounded-xl border bg-white shadow-xs transition-all",
            hasWarning
              ? "border-amber-400 ring-2 ring-amber-400/20"
              : "border-line focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15"
          )}
        >
          {prefix && (
            <span className="pl-3 text-[13px] font-bold text-body select-none">
              {prefix}
            </span>
          )}
          <input
            ref={inputRef}
            id={`${id}-input`}
            type="text"
            inputMode={allowsDecimal ? "decimal" : "numeric"}
            pattern={allowsDecimal ? "[0-9.]*" : "[0-9]*"}
            autoComplete="off"
            spellCheck="false"
            value={localStr}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onChange={handleInputChange}
            onFocus={(e) => {
              setIsFocused(true);
              setValidationWarning(null);
              // Select all on focus for effortless single-tap editing
              e.currentTarget.select();
            }}
            onBlur={handleBlur}
            className={cn(
              "w-full bg-transparent py-1.5 pr-2.5 text-right text-[14px] font-extrabold text-ink outline-none tnum",
              !prefix && "pl-3"
            )}
            aria-label={label}
            aria-invalid={hasWarning}
          />
          {suffix && (
            <span className="pr-3 text-[12px] font-bold text-body select-none">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {/* Helper Limits or Active Warning */}
      <div className="flex items-center justify-between text-[11px] font-semibold tnum">
        {hasWarning ? (
          <span className="flex items-center gap-1 font-semibold text-amber-700 animate-fadeIn">
            <AlertCircle className="size-3 shrink-0" />
            {validationWarning}
          </span>
        ) : (
          <span className="text-slate-700">
            {prefix}
            {min.toLocaleString("en-IN")}
            {suffix ? ` ${suffix}` : ""}
          </span>
        )}

        {helperText && !hasWarning && (
          <span className="text-slate-700 font-medium">{helperText}</span>
        )}

        <span className="text-slate-700">
          {prefix}
          {max.toLocaleString("en-IN")}
          {suffix ? ` ${suffix}` : ""}
          {value > max && (
            <span className="ml-1 text-[10px] text-brand font-bold">
              (Custom: {prefix}{value.toLocaleString("en-IN")}{suffix ? ` ${suffix}` : ""})
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
