"use client";

import { useUploadStore } from "../../../store/upload-store";
import { UploadAudioAndText } from "@/components/contribute/upload-audio-and-text";
import { FetchAudioAndTranscribe } from "@/components/contribute/fetch-audio-and-transcribe";

export function ModeRenderer() {
    const mode = useUploadStore((s) => s.mode);
    return mode === "upload" ? <UploadAudioAndText /> : <FetchAudioAndTranscribe />;
}
