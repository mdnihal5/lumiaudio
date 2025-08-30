import { GlassCard } from "@/components/glass-card";
import { AngledImages } from "@/components/angled-images";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <main className="relative min-h-[100svh] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.55))] text-slate-900">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
                <div className="absolute -bottom-24 left-[-10%] h-80 w-80 rounded-full bg-pink-200/50 blur-3xl" />
            </div>

            <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
                <SiteHeader />

                <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
                    <div className="space-y-6">
                        <h1 className="text-pretty text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">Clean, modern uploads for audio and transcriptions</h1>
                        <p className="text-balance text-slate-700">Lightweight, responsive, and easy to use. Upload your audio with text or fetch a 30s demo clip—then add your transcription.</p>
                        <div className="flex items-center gap-3">
                            <Link href="/contribute">
                                <Button className="bg-sky-500 text-white hover:bg-sky-600">Start Contributing</Button>
                            </Link>
                            <a href="#features" className="rounded-full border border-slate-300/70 px-4 py-2 text-sm text-slate-700 hover:bg-white/70">
                                Learn more
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <AngledImages />
                    </div>
                </div>
            </section>
        </main>
    );
}
