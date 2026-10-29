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
  step = 1,
  unit = "currency",
  quickChips,
  onChange,
  helperText,
  className,
}: DualControlProps) {
  // Local string state to allow typing without cursor jumps or premature clamping
  const [localStr, setLocalStr] = useState<string>(String(value));
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [validationWarning, setValidationWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
   * - Strips all symbols (!@#$%^&* etc.)
   * - Keeps only 0-9 and optionally at most one single decimal point (.)
   */
  const sanitizeString = (raw: string): string => {
    // Remove negative signs immediately
    let clean = raw.replace(/-/g, "");

    if (allowsDecimal) {
      // Keep only digits and decimal points
      clean = clean.replace(/[^0-9.]/g, "");
      // Ensure only the first decimal point is kept
      const parts = clean.split(".");
      if (parts.length > 2) {
        clean = parts[0] + "." + parts.slice(1).join("");
      }
    } else {
      // Strictly only integer digits
      clean = clean.replace(/[^0-9]/g, "");
    }

    return clean;
  };

  /**
   * Block invalid keystrokes before they reach the input:
   * - Blocks negative signs (-)
   * - Blocks letters (a-z, A-Z)
   * - Blocks unnecessary symbols
   * - Blocks '.' if decimal is not allowed or if already present
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation, deletion, and tab keys
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

    // Allow keyboard shortcuts (Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Cmd+A, etc.)
    if (
      (e.ctrlKey || e.metaKey) &&
      ["a", "c", "v", "x"].includes(e.key.toLowerCase())
    ) {
      return;
    }

    // Allow ArrowUp / ArrowDown to increment / decrement
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(max, value + step);
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

    // Block any non-digit character (alphabets, symbols, spaces)
    if (!/^[0-9]$/.test(e.key)) {
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
        if (parsed > max) {
          setValidationWarning(`Maximum allowed is ${max.toLocaleString("en-IN")}`);
        } else if (parsed < min) {
          setValidationWarning(`Minimum allowed is ${min.toLocaleString("en-IN")}`);
        } else {
          setValidationWarning(null);
          onChange(parsed);
        }
      }
    }
  };

  /**
   * Handle changes with sanitization and live bounds feedback
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean = sanitizeString(raw);
    setLocalStr(clean);

    if (clean === "") {
      setValidationWarning(`Please enter a value (min: ${min.toLocaleString("en-IN")})`);
      return;
    }

    const parsed = parseFloat(clean);
    if (!isNaN(parsed) && parsed >= 0) {
      if (parsed > max) {
        setValidationWarning(`Maximum allowed is ${max.toLocaleString("en-IN")}`);
        // Allow typing while informing user, don't crash parent
        onChange(max);
      } else if (parsed < min) {
        setValidationWarning(`Minimum is ${min.toLocaleString("en-IN")}`);
        // While user is actively typing, don't prematurely force parent to 0
        onChange(min);
      } else {
        setValidationWarning(null);
        onChange(parsed);
      }
    }
  };

  /**
   * On blur, strictly clamp to valid [min, max] range and format cleanly
   */
  const handleBlur = () => {
    setIsFocused(false);
    setValidationWarning(null);

    const clean = sanitizeString(localStr);
    const parsed = parseFloat(clean);

    if (isNaN(parsed) || clean === "" || parsed < min) {
      onChange(min);
      setLocalStr(String(min));
    } else if (parsed > max) {
      onChange(max);
      setLocalStr(String(max));
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
    const next = Math.min(max, Math.max(min, value + addVal));
    onChange(next);
    setLocalStr(String(next));
    setValidationWarning(null);
  };

  const fillPercent = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100)
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
                className="inline-flex items-center gap-0.5 rounded-full border border-line bg-soft px-2 py-0.5 text-[11px] font-semibold text-body transition-colors hover:border-brand hover:bg-mint hover:text-brand active:scale-95"
              >
                <Plus className="size-2.5" />
                {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Synchronized Slider */}
        <div className="relative flex-1">
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleRangeChange}
            className="range w-full cursor-pointer"
            style={{ ["--fill" as string]: `${fillPercent}%` }}
            aria-label={`${label} slider`}
          />
        </div>

        {/* Manual Input with Unit Adornment & Strict Input Validation */}
        <div
          className={cn(
            "relative flex w-28 xs:w-32 sm:w-36 shrink-0 items-center rounded-xl border bg-white shadow-xs transition-all",
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
            type="text"
            inputMode={allowsDecimal ? "decimal" : "numeric"}
            pattern={allowsDecimal ? "[0-9.]*" : "[0-9]*"}
            autoComplete="off"
            spellCheck="false"
            value={localStr}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onChange={handleInputChange}
            onFocus={() => {
              setIsFocused(true);
              setValidationWarning(null);
            }}
            onBlur={handleBlur}
            className={cn(
              "w-full bg-transparent py-1.5 pr-2 text-right text-[14px] font-extrabold text-ink outline-none tnum",
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

      {/* Validation Warning or Helper Limits */}
      <div className="flex items-center justify-between text-[11px] font-medium tnum">
        {hasWarning ? (
          <span className="flex items-center gap-1 font-semibold text-amber-700 animate-fadeIn">
            <AlertCircle className="size-3 shrink-0" />
            {validationWarning}
          </span>
        ) : (
          <span className="text-body/75">
            {prefix}
            {min.toLocaleString("en-IN")}
            {suffix ? ` ${suffix}` : ""}
          </span>
        )}

        {helperText && !hasWarning && (
          <span className="text-body/60">{helperText}</span>
        )}

        <span className="text-body/75">
          {prefix}
          {max.toLocaleString("en-IN")}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
    </div>
  );
}
