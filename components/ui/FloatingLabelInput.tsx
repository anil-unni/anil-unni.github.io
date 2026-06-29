"use client";

import { forwardRef, useState } from "react";

interface FloatingLabelInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}

const FloatingLabelInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FloatingLabelInputProps
>(({ label, name, type = "text", value, onChange, error, multiline = false, rows = 4, required }, ref) => {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;
  const hasError = !!error;

  const borderClass = hasError
    ? "border-error"
    : focused
    ? "border-accent"
    : "border-border";

  const sharedProps = {
    id: name,
    name,
    value,
    onChange,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: `
      peer w-full bg-surface px-4 pt-6 pb-2 rounded-lg border ${borderClass}
      text-foreground text-sm outline-none transition-colors duration-200
      placeholder-transparent resize-none
    `,
  };

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          {...sharedProps}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          rows={rows}
          placeholder={label}
        />
      ) : (
        <input
          {...sharedProps}
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          placeholder={label}
        />
      )}
      <label
        htmlFor={name}
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${isFloated
            ? "top-2 text-[10px] tracking-wider uppercase font-medium text-accent"
            : "top-4 text-sm text-muted"
          }
        `}
      >
        {label}
        {required && <span className="ml-0.5 text-error">*</span>}
      </label>
      {hasError && (
        <p className="mt-1.5 text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

FloatingLabelInput.displayName = "FloatingLabelInput";

export default FloatingLabelInput;
