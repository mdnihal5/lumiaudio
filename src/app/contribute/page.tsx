import { BackgroundGlow } from "@/components/background-glow"
import { UploadToggle } from "@/components/contribute/upload-toggle"
import { ModeRenderer } from "@/components/contribute/mode-renderer"
import { SiteHeader } from "@/components/site-header"

export default function ContributePage() {
  return (
    <main className="relative min-h-[100svh] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.55))] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute -bottom-24 left-[-10%] h-80 w-80 rounded-full bg-pink-200/50 blur-3xl" />
      </div>
      <BackgroundGlow />
      <section className="mx-auto w-full max-w-6xl px-4 py-6">
        <SiteHeader />
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        <h1 className="text-pretty text-3xl font-semibold text-slate-900 sm:text-4xl">Contribute</h1>
        <p className="mt-2 text-slate-700">Choose an option to add audio and transcription.</p>

        <div className="mt-8">
          <p className="text-sm font-medium text-slate-500">Upload Audio</p>
          <UploadToggle />
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-slate-500">Choose Mode</p>
          <ModeRenderer />
        </div>
      </section>
    </main>
  )
}
