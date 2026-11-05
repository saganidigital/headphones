import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Sparkles, ShoppingBag, Volume2, Cpu, ShieldAlert, Layers } from "lucide-react";
import { Button } from "../components/Button";
import { heroScrollPhases, productDetails } from "../data/headphonesData";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection({ images, isLoaded, onOpenPreorder }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // Responsive Canvas Drawing Helper
  const drawFrame = useCallback(
    (frameIndex) => {
      const canvas = canvasRef.current;
      if (!canvas || !images || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[frameIndex - 1];
      if (!img || !img.complete) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Maintain aspect ratio cover / contain
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;

      // Fit with generous breathing room
      if (canvasRatio > imgRatio) {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    },
    [images]
  );

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    // Draw initial frame
    drawFrame(1);

    const totalFrames = 240;
    let lastRenderedFrame = 1;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        setCurrentProgress(progress);

        // Map progress to 1..240 frame
        const targetFrame = Math.min(
          totalFrames,
          Math.max(1, Math.round(progress * (totalFrames - 1)) + 1)
        );

        if (targetFrame !== lastRenderedFrame) {
          lastRenderedFrame = targetFrame;
          requestAnimationFrame(() => drawFrame(targetFrame));
        }

        // Active phase calculation
        if (progress < 0.24) {
          setActivePhaseIndex(0);
        } else if (progress < 0.50) {
          setActivePhaseIndex(1);
        } else if (progress < 0.75) {
          setActivePhaseIndex(2);
        } else {
          setActivePhaseIndex(3);
        }
      },
    });

    const handleResize = () => {
      drawFrame(lastRenderedFrame);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, drawFrame]);

  const activePhase = heroScrollPhases[activePhaseIndex] || heroScrollPhases[0];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[480vh] bg-zinc-950 text-zinc-100"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Backdrop Glow */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-zinc-800/15 blur-[140px]" />
          <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vh] rounded-full bg-zinc-700/10 blur-[100px]" />
        </div>

        {/* 240 Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Floating Subtle Stage Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60 pointer-events-none z-10" />

        {/* UI Overlay Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 h-full flex flex-col justify-between pt-24 pb-10 pointer-events-none">
          {/* Top Stage Bar: Current Phase & Mode Indicator */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-200 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Phase 0{activePhaseIndex + 1} / 04
              </span>
            </div>

            {/* Quick telemetry tags */}
            <div className="hidden sm:flex items-center gap-6 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-zinc-300" /> 40MM BERYLLIUM
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-zinc-300" /> -42DB HYBRID ANC
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-zinc-300" /> 24-BIT HI-RES DAC
              </span>
            </div>
          </div>

          {/* Central Editorial Narrative & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end my-auto pointer-events-none">
            {/* Left Column: Bold Editorial Typography */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
                  {activePhase.badge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl leading-[1.08] drop-shadow-md">
                {activePhase.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
                {activePhase.description}
              </p>
            </div>

            {/* Right Column: Editorial Numeral & Stats */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-end gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl pointer-events-auto min-w-[220px] shadow-2xl">
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1">
                  Telemetry Readout
                </div>
                <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white mb-1">
                  {activePhase.statValue}
                </div>
                <div className="text-xs text-zinc-400 font-medium">
                  {activePhase.statLabel}
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Architecture</span>
                  <span className="text-zinc-200">{activePhase.secondaryStat}</span>
                </div>
              </div>

              {/* Quick Action Button for Phase 4 or late scroll */}
              {activePhaseIndex >= 2 && (
                <div className="pointer-events-auto">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={onOpenPreorder}
                    icon={ShoppingBag}
                    className="w-full sm:w-auto shadow-lg"
                  >
                    Reserve Launch Batch (${productDetails.price})
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls / Progress Timeline Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-zinc-800/50 pointer-events-auto">
            {/* 4 Phase Dots */}
            <div className="flex items-center gap-3">
              {heroScrollPhases.map((phase, idx) => {
                const isActive = activePhaseIndex === idx;
                return (
                  <div key={phase.id} className="flex items-center gap-2">
                    <div
                      className={`h-1.5 transition-all duration-300 rounded-full ${
                        isActive
                          ? "w-8 bg-zinc-100"
                          : "w-2 bg-zinc-700 hover:bg-zinc-600"
                      }`}
                    />
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider hidden md:inline-block ${
                        isActive ? "text-zinc-200" : "text-zinc-600"
                      }`}
                    >
                      {phase.badge.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono tracking-widest uppercase">
              <span>Scroll To Deconstruct</span>
              <ArrowDown className="w-3.5 h-3.5 text-zinc-400 animate-bounce" />
            </div>

            {/* Percentage Bar */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span>{Math.round(currentProgress * 100)}%</span>
              <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-200 transition-all duration-75"
                  style={{ width: `${currentProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
