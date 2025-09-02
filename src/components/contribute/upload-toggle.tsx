"use client";

import { useUploadStore, type UploadMode } from "../../../store/upload-store";
import { cn } from "@/lib/utils";

const items: { key: UploadMode; label: string }[] = [
    { key: "upload", label: "Upload Audio + Text" },
    // { key: "fetch", label: "Fetch 30s Audio + Text" },
];

export function UploadToggle() {
    const mode = useUploadStore((s) => s.mode);
    const setMode = useUploadStore((s) => s.setMode);

    return (
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1">
            {items.map((it) => (
                <button
                    key={it.key}
                    onClick={() => setMode(it.key)}
                    className={cn(
                        "relative rounded-md px-4 py-2 text-sm transition",
                        "focus:outline-none focus:ring-2 focus:ring-sky-400/50",
                        mode === it.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:bg-white/60"
                    )}
                    aria-pressed={mode === it.key}
                >
                    {it.label}
                </button>
            ))}
        </div>
    );
}
