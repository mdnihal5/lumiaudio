import Image from "next/image";

export function AngledImages() {
    return (
        <div className="relative mx-auto grid w-full max-w-3xl grid-cols-3 items-center gap-4 sm:gap-6">
            <Image
                src="/image.png"
                alt="Product preview"
                width={320}
                height={220}
                className="col-span-2 rotate-[-3deg] rounded-xl border border-white/30 bg-white/5 p-2 shadow-lg backdrop-blur sm:col-span-2"
            />
            <Image src="/image.png" alt="Dashboard card" width={180} height={220} className="rotate-6 rounded-xl border border-white/30 bg-white/5 p-2 shadow-lg backdrop-blur" />
            <Image src="/image.png" alt="Audio waveform" width={180} height={200} className="-mt-8 rotate-[-6deg] rounded-xl border border-white/30 bg-white/5 p-2 shadow-lg backdrop-blur sm:-mt-10" />
            <Image
                src="/image.png"
                alt="Transcription screen"
                width={240}
                height={200}
                className="col-span-2 -mt-2 rotate-3 rounded-xl border border-white/30 bg-white/5 p-2 shadow-lg backdrop-blur"
            />
        </div>
    );
}
