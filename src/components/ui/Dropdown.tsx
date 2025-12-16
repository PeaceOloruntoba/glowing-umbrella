import { useEffect, useRef, useState } from "react";

export type Option = { label: string; value: string };

function classNames(...xs: (string | false | undefined)[]) {
  return xs.filter(Boolean).join(" ");
}

export default function Dropdown({
  value,
  onChange,
  options,
  placeholder,
  className,
  buttonClassName,
  leftIcon,
  rightIcon = <i className="fa fa-chevron-down text-gray-500" />,
  size = "sm",
}: {
  value: string | null;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md";
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selected = options.find((o) => o.value === value);
  const pad = size === "sm" ? "px-3 py-2" : "px-4 py-2.5";

  useEffect(() => {
    if (open) {
      const idx = Math.max(
        0,
        options.findIndex((o) => o.value === value)
      );
      setActiveIndex(idx);
    } else {
      setActiveIndex(-1);
    }
  }, [open, options, value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (
      !open &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = options[activeIndex] || options[0];
      if (pick) onChange(pick.value);
      setOpen(false);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div ref={ref} className={classNames("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        className={classNames(
          "w-full bg-white border border-gray-300 text-left flex items-center justify-between gap-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200",
          pad,
          buttonClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 truncate">
          {leftIcon}
          <span
            className={classNames("truncate", !selected && "text-gray-400")}
          >
            {selected ? selected.label : placeholder || "Select..."}
          </span>
        </span>
        {rightIcon}
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-full max-h-64 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          <ul className="py-1" role="listbox">
            {options.map((o, idx) => (
              <li key={o.value} role="option" aria-selected={value === o.value}>
                <button
                  type="button"
                  className={classNames(
                    "w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between",
                    value === o.value && "bg-blue-50",
                    activeIndex === idx && "ring-1 ring-blue-200"
                  )}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                >
                  <span>{o.label}</span>
                  {value === o.value && (
                    <i className="fa fa-check text-blue-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
