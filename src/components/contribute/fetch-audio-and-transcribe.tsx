"use client";

import { useState } from "react";
import { useUploadStore } from "../../../store/upload-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type AudioResponse = {
  _id: string;
  key: string;
  source_url: string;
  transcription: string;
};

export function FetchAudioAndTranscribe() {
  const {
    audioUrl,
    setAudioUrl,
    transcription,
    setTranscription,
    loading,
    setLoading,
  } = useUploadStore();

  const [audioId, setAudioId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const fetchAudio = async () => {
    setError(null);
    setSubmitSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("https://transcription-ej6t.onrender.com/getaudio");
      if (!res.ok) throw new Error("Failed to fetch audio");

      const data: AudioResponse = await res.json();
      const audioUrl = `https://transcription-ej6t.onrender.com/${data.key}`;

      setAudioUrl(audioUrl);
      setAudioId(data._id);
      setTranscription(data.transcription || "");
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("Unknown error while fetching audio.");
    } finally {
      setLoading(false);
    }
  };

  const submitTranscription = async () => {
    if (!audioId || !transcription) {
      setError("Missing audio or transcription.");
      return;
    }

    setError(null);
    setLoading(true);
    setSubmitSuccess(false);

    try {
      const res = await fetch("https://transcription-ej6t.onrender.com/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: audioId, transcription }),
      });

      if (!res.ok) throw new Error("Failed to submit transcription.");
      setSubmitSuccess(true);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("Unknown error during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Audio Fetch Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-900">Get 30-second demo audio</p>
            <p className="text-xs text-slate-600">Simulated API call to fetch audio</p>
          </div>
          <Button
            onClick={fetchAudio}
            disabled={loading}
            className="bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Fetching..." : "Fetch 30s Audio"}
          </Button>
        </div>

        <div className="mt-6">
          {audioUrl ? (
            <audio controls src={audioUrl} className="w-full" />
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No audio yet. Click “Fetch 30s Audio” to generate a demo clip.
            </div>
          )}
          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        </div>
      </div>

      {/* Transcription Textarea */}
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
        <p className="text-xs text-slate-500">
          Write the transcript or translation for the fetched audio.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4">
        <Button
          onClick={submitTranscription}
          disabled={loading || !transcription || !audioId}
          className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Transcription"}
        </Button>
        {submitSuccess && (
          <p className="text-sm text-emerald-600">Transcription submitted successfully!</p>
        )}
      </div>
    </div>
  );
}

