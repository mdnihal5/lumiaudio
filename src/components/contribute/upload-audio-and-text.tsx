"use client";

import type React from "react";
import { useRef } from "react";
import { useUploadStore } from "../../../store/upload-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea"; // use styled Textarea for clarity on white

export function UploadAudioAndText() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { audioFile, transcription, setAudioFile, setTranscription, reset } = useUploadStore();

    function onPick() {
        inputRef.current?.click();
    }

    function onFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (f) setAudioFile(f);
    }

    return (
        <div className="space-y-6">
            <div className={cn("rounded-2xl border border-slate-200 bg-white p-6", "transition hover:border-slate-300")}>
                <input ref={inputRef} type="file" accept="audio/*" onChange={onFile} className="sr-only" />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="text-sm text-slate-600">{audioFile ? `Selected: ${audioFile.name}` : "Drop an audio file here or use the button"}</div>
                    <div
                        onClick={onPick}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const f = e.dataTransfer.files?.[0];
                            if (f) setAudioFile(f);
                        }}
                        className="w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-800 transition hover:bg-white"
                        role="button"
                        aria-label="Upload audio"
                    >
                        <div className="text-balance">Click to choose a file or drag it here</div>
                    </div>
                    <Button variant="default" onClick={onPick} className="bg-sky-600 text-white hover:bg-sky-700">
                        Choose Audio
                    </Button>
                    {audioFile && (
                        <button onClick={reset} className="text-xs text-slate-600 underline underline-offset-4 hover:text-slate-800">
                            Clear selection
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="transcription" className="text-sm font-medium text-slate-800">
                    Transcription
                </label>
                <Textarea id="transcription" value={transcription} onChange={(e) => setTranscription(e.target.value)} placeholder="Paste or type the transcript here..." className="min-h-[140px]" />
                <p className="text-xs text-slate-500">Provide the text transcription for the uploaded audio.</p>
            </div>
        </div>
    );
}
