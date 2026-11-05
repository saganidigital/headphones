import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Sparkles, ShoppingBag, Cpu } from "lucide-react";
import { heroScrollPhases, productDetails } from "../data/headphonesData";
import { Button } from "../components/Button";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ images, isLoaded, onOpenPreorder }) {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const canvasRef = useRef(null);
  const frameNumberRef = useRef(null);
  const scrollPercentRef = useRef(null);
  const progressBarRef = useRef(null);

  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // Performance tracking refs to prevent redundant drawing & state thrashing
  const lastRenderedIndexRef = useRef(-1);
  const lastPhaseIndexRef = useRef(0);
  const rafIdRef = useRef(null);

  // High-performance canvas drawing with GPU-accelerated smoothing
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;

    // Cover math preserving aspect ratio
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = w;
      drawHeight = w / imgRatio;
      offsetX = 0;
      offsetY = (h - drawHeight) / 2;
    } else {
      drawWidth = h * imgRatio;
      drawHeight = h;
      offsetX = (w - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium";
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  // Request Animation Frame throttled render
  const scheduleRender = useCallback((frameIndex) => {
    if (lastRenderedIndexRef.current === frameIndex) return;
    lastRenderedIndexRef.current = frameIndex;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(frameIndex);
    });
  }, [drawFrame]);

  // Responsive canvas dimension sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Cap at 4K resolution (3840x2160) for maximum efficiency
      const targetWidth = Math.min(window.innerWidth * dpr, 3840);
      const targetHeight = Math.min(window.innerHeight * dpr, 2160);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const currentIdx = Math.max(0, lastRenderedIndexRef.current);
        drawFrame(currentIdx);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Initial draw once frames load
  useEffect(() => {
    if (isLoaded && images && images.length > 0) {
      drawFrame(0);
    }
  }, [isLoaded, images, drawFrame]);

  // GSAP ScrollTrigger scrubbing tied directly to Lenis smooth scroll
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !pinnedRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Map progress to frame index (0..239)
        const frameIndex = Math.min(239, Math.max(0, Math.floor(progress * 240)));
        scheduleRender(frameIndex);

        // Fast direct DOM updates without React re-render thrashing
        const pct = Math.round(progress * 100);
        if (frameNumberRef.current) {
          frameNumberRef.current.textContent = String(frameIndex + 1).padStart(3, "0");
        }
        if (scrollPercentRef.current) {
          scrollPercentRef.current.textContent = `${pct}%`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress})`;
        }

        // Only trigger React state change when editorial phase boundaries cross
        let foundIndex = 0;
        for (let i = 0; i < heroScrollPhases.length; i++) {
          const phase = heroScrollPhases[i];
          if (progress >= phase.range[0] && progress <= phase.range[1]) {
            foundIndex = i;
            break;
          } else if (progress > phase.range[1]) {
            foundIndex = i;
          }
        }

        if (foundIndex !== lastPhaseIndexRef.current) {
          lastPhaseIndexRef.current = foundIndex;
          setActivePhaseIndex(foundIndex);
        }
      },
    });

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      trigger.kill();
    };
  }, [isLoaded, scheduleRender]);

  const activePhase = heroScrollPhases[activePhaseIndex] || heroScrollPhases[0];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-zinc-950"
      aria-label="SOVIO Apex Interactive Scroll Presentation"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={pinnedRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Hardware Accelerated Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        />

        {/* Cinematic Vignette & Ambient Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/70 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none z-10" />

        {/* HUD Top Bar */}
        <div className="relative z-20 pt-24 px-6 sm:px-10 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
          {/* Telemetry pill */}
          <div className="flex items-center gap-3">
            <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
                Acoustic Core Online
              </span>
            </div>
            <div className="hidden sm:flex glass-pill px-3 py-1.5 rounded-full items-center gap-2 text-[11px] font-mono text-zinc-400">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>BERYLLIUM 40MM</span>
            </div>
          </div>

          {/* Frame Counter & Scrub Index (Direct DOM updated) */}
          <div className="glass-pill px-4 py-1.5 rounded-full flex items-center gap-3 font-mono text-xs text-zinc-300">
            <span className="text-zinc-500 font-light">FRAME</span>
            <span ref={frameNumberRef} className="text-zinc-100 font-bold tracking-wider">
              001
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500">240</span>
            <span className="hidden md:inline text-zinc-600">|</span>
            <span ref={scrollPercentRef} className="hidden md:inline text-zinc-400">
              0%
            </span>
          </div>
        </div>

        {/* Center / Bottom Editorial Minimalist Typography */}
        <div className="relative z-20 px-6 sm:px-12 max-w-7xl mx-auto w-full pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pointer-events-auto">
          {/* Main Phase Storytelling block */}
          <div className="max-w-2xl transition-all duration-500 ease-out">
            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900/80 border border-zinc-700/60 mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-zinc-200 uppercase">
                {activePhase.badge}
              </span>
            </div>

            {/* Editorial Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.08] mb-4">
              {activePhase.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl">
              {activePhase.description}
            </p>

            {/* Stat Row */}
            <div className="flex items-center gap-8 mt-6 pt-6 border-t border-zinc-800/60">
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
                  {activePhase.statValue}
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-500 mt-0.5">
                  {activePhase.statLabel}
                </div>
              </div>

              <div className="h-10 w-px bg-zinc-800" />

              <div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-zinc-300">
                  {activePhase.secondaryStat}
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-500 mt-0.5">
                  Calibrated Baseline
                </div>
              </div>
            </div>
          </div>

          {/* Right Action & Progression Panel */}
          <div className="flex flex-col items-start md:items-end gap-5">
            {/* Phase Stepper Pills */}
            <div className="flex items-center gap-2 bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 p-1.5 rounded-full">
              {heroScrollPhases.map((phase, idx) => (
                <div
                  key={phase.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activePhaseIndex
                      ? "w-8 bg-zinc-100"
                      : idx < activePhaseIndex
                      ? "w-3 bg-zinc-600"
                      : "w-3 bg-zinc-800"
                  }`}
                  title={phase.badge}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={onOpenPreorder}
                icon={ShoppingBag}
              >
                Pre-Order ${productDetails.price}
              </Button>
              <a
                href="#colorways"
                className="px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 backdrop-blur-md font-medium"
              >
                Finishes
              </a>
            </div>

            {/* Scroll Scrub hint */}
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span>Scroll to deconstruct</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-zinc-400" />
            </div>
          </div>
        </div>

        {/* Global Bottom Progress Line (GPU accelerated transform) */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900 z-30">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-gradient-to-r from-zinc-500 to-white origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
