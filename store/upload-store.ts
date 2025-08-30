"use client"

import { create } from "zustand"

export type UploadMode = "upload" | "fetch"

type State = {
  mode: UploadMode
  audioFile?: File
  audioUrl?: string
  transcription: string
  loading: boolean
  setMode: (m: UploadMode) => void
  setAudioFile: (f?: File) => void
  setAudioUrl: (u?: string) => void
  setTranscription: (t: string) => void
  setLoading: (v: boolean) => void
  reset: () => void
}

export const useUploadStore = create<State>((set) => ({
  mode: "upload",
  audioFile: undefined,
  audioUrl: undefined,
  transcription: "",
  loading: false,
  setMode: (m) => set({ mode: m, audioFile: undefined, audioUrl: undefined, transcription: "" }),
  setAudioFile: (f) => set({ audioFile: f }),
  setAudioUrl: (u) => set({ audioUrl: u }),
  setTranscription: (t) => set({ transcription: t }),
  setLoading: (v) => set({ loading: v }),
  reset: () => set({ mode: "upload", audioFile: undefined, audioUrl: undefined, transcription: "", loading: false }),
}))
