"use client";

import { useState } from "react";
import { useUploadStore } from "../../../store/upload-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // use styled Textarea

export function FetchAudioAndTranscribe() {
    const { audioUrl, setAudioUrl, transcription, setTranscription, loading, setLoading } = useUploadStore();
    const [error, setError] = useState<string | null>(null);

    async function simulateFetchAudio() {
        setError(null);
        setLoading(true);
        try {
            // Simulate a dummy API call delay
            await new Promise((res) => setTimeout(res, 1200));
            // Generate a simple sine-wave audio Blob (30s) using WebAudio + OfflineAudioContext
            const url = await generateToneUrl(440, 30);
            setAudioUrl(url);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Failed to fetch demo audio. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-slate-900">Get 30-second demo audio</p>
                        <p className="text-xs text-slate-600">Simulated dummy API call</p>
                    </div>
                    <Button onClick={simulateFetchAudio} disabled={loading} className="bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
                        {loading ? "Fetching..." : "Fetch 30s Audio"}
                    </Button>
                </div>

                <div className="mt-6">
                    {audioUrl ? (
                        <audio controls src={audioUrl} className="w-full" />
                    ) : (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">No audio yet. Click “Fetch 30s Audio” to generate a demo clip.</div>
                    )}
                    {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="transcription2" className="text-sm font-medium text-slate-800">
                    Transcription
                </label>
                <Textarea
                    id="transcription2"
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                    placeholder="Type or paste the transcript for the fetched audio..."
                    className="min-h-[140px]"
                />
                <p className="text-xs text-slate-500">Write the transcript or translation for the fetched audio.</p>
            </div>
        </div>
    );
}

/**
 * Generate a simple sine tone WAV data URL of given seconds.
 * Purely frontend; mimics a dummy API result.
 */
async function generateToneUrl(frequency: number, seconds: number) {
    const sampleRate = 44100;
    const length = sampleRate * seconds;
    const offline = new OfflineAudioContext(1, length, sampleRate);
    const osc = offline.createOscillator();
    const gain = offline.createGain();

    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.value = 0.08; // keep soft

    osc.connect(gain);
    gain.connect(offline.destination);
    osc.start();
    osc.stop(seconds);

    const rendered = await offline.startRendering();
    const channelData = rendered.getChannelData(0);

    // Convert to WAV
    const wavBuffer = pcmToWav(channelData, sampleRate);
    const blob = new Blob([wavBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    return url;
}

function pcmToWav(samples: Float32Array, sampleRate: number) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    writeString(view, 36, "data");
    view.setUint32(40, samples.length * 2, true);
    floatTo16BitPCM(view, 44, samples);
    return buffer;
}

function writeString(view: DataView, offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
    }
}

function floatTo16BitPCM(view: DataView, offset: number, input: Float32Array) {
    let pos = offset;
    for (let i = 0; i < input.length; i++, pos += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        view.setInt16(pos, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
}
