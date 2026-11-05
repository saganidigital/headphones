import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Disc3 } from "lucide-react";

export function Preloader({ progress, isLoaded, onComplete }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      tl.to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: "power3.inOut",
      }).to(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.98,
          duration: 0.7,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
    }
  }, [isLoaded, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-zinc-100"
      style={{ pointerEvents: isLoaded ? "none" : "auto" }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-zinc-800/20 blur-[120px] pointer-events-none" />

      <div ref={contentRef} className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Brand Monogram */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg shadow-black/40">
            <Disc3 className="w-5 h-5 text-zinc-300 animate-spin" style={{ animationDuration: "6s" }} />
          </div>
          <span className="font-semibold tracking-[0.25em] text-sm text-zinc-200 uppercase">
            SOVIO APEX
          </span>
        </div>

        {/* Big Counter */}
        <div className="font-mono text-7xl font-bold tracking-tighter text-zinc-100 mb-4 select-none">
          {progress.toString().padStart(2, "0")}
          <span className="text-2xl text-zinc-500 font-light ml-1">%</span>
        </div>

        {/* Progress Track */}
        <div className="w-64 h-[2px] bg-zinc-900 rounded-full overflow-hidden mb-6 relative">
          <div
            className="h-full bg-gradient-to-r from-zinc-500 via-zinc-200 to-white transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
          {progress < 100 ? "Decoding 240 Studio 4K Frames..." : "Acoustic Stage Calibrated"}
        </p>

        <div className="mt-8 text-[11px] text-zinc-600 tracking-wide font-mono">
          40MM BERYLLIUM • DUAL N52 • HYBRID ANC
        </div>
      </div>
    </div>
  );
}
