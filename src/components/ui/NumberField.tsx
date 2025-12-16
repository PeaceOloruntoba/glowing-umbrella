import React, { useEffect, useRef, useState } from "react";

export default function NumberField({
  value,
  onChange,
  prefixIcon,
  placeholder = "0",
  onDelete,
}: {
  value: number | "";
  onChange: (v: number) => void;
  prefixIcon?: React.ReactNode;
  placeholder?: string;
  onDelete?: () => void;
}) {
  const [mode, setMode] = useState<"value" | "metric">("value");
  const [metricText, setMetricText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="w-full bg-white border border-gray-300 flex items-center gap-2 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200 h-full relative">
      {mode === "value" ? (
        <>
          {prefixIcon}
          <input
            type="number"
            min={0}
            step="any"
            value={value}
            onChange={(e) =>
              onChange(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder={placeholder}
            className="w-full outline-none border-none text-sm"
          />
        </>
      ) : (
        <input
          type="text"
          value={metricText}
          onChange={(e) => setMetricText(e.target.value)}
          placeholder="yesterday"
          className="w-full outline-none border-none text-sm"
        />
      )}
      <span className="flex gap-3 text-gray-500 items-center">
        <button
          type="button"
          className="p-1 hover:text-gray-700 cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <i className="fa fa-gear" />
        </button>
        <button
          type="button"
          className="p-1 hover:text-red-600 cursor-pointer"
          onClick={onDelete}
          title="Delete condition"
        >
          <i className="fa fa-trash" />
        </button>
      </span>
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
        >
          <ul className="py-1 text-sm">
            <li>
              <button
                type="button"
                className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                  mode === "value" ? "text-blue-600" : ""
                }`}
                onClick={() => {
                  setMode("value");
                  setOpen(false);
                }}
              >
                Value input
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                  mode === "metric" ? "text-blue-600" : ""
                }`}
                onClick={() => {
                  setMode("metric");
                  setOpen(false);
                }}
              >
                Metric input
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}