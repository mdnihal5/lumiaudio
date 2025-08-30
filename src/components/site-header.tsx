import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
    return (
        <header className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-6 py-3 shadow-sm backdrop-blur-md">
            <Link href="/" className="text-lg font-bold tracking-tight text-slate-800 transition-colors hover:text-sky-600">
                LumiAudio
            </Link>
            <nav className="flex items-center gap-3">
                <Link href="/contribute">
                    <Button className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-sky-600">Contribute</Button>
                </Link>
            </nav>
        </header>
    );
}
