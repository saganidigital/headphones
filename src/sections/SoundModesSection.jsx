import React, { useState } from "react";
import { Activity, Radio, Sliders, Volume2, ShieldCheck, Zap } from "lucide-react";
import { soundModes } from "../data/headphonesData";

export function SoundModesSection() {
  const [activeModeId, setActiveModeId] = useState("anc");

  const currentMode = soundModes.find((m) => m.id === activeModeId) || soundModes[0];

  // Frequency curve points based on active mode
  const getCurvePath = (modeId) => {
    switch (modeId) {
      case "anc":
        // Sub-bass heavy suppression curve with steep attenuation in lows/mids
        return "M 0 120 C 100 130, 200 170, 350 175 C 500 180, 650 90, 800 60";
      case "transparency":
        // Natural presence peak in human vocal range (1kHz - 4kHz)
        return "M 0 110 C 150 90, 300 40, 450 50 C 600 70, 700 80, 800 90";
      case "audiophile":
      default:
        // Studio Harman reference target line (ultra-flat with slight sub-bass extension)
        return "M 0 95 C 150 95, 300 95, 450 95 C 600 95, 700 96, 800 95";
    }
  };

  return (
    <section id="modes" className="py-28 bg-zinc-950 text-zinc-100 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
            <Radio className="w-3.5 h-3.5 text-zinc-300" />
            Acoustic Signal Processing
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Visual Sound Mode Simulator
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Switch between hardware-tuned digital signal processors. Observe how the quad-mic array and internal DSP sculpt frequency curves in real time.
          </p>
        </div>

        {/* Simulator Cockpit */}
        <div className="bg-zinc-900/40 rounded-3xl border border-zinc-800/80 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-zinc-800">
            {soundModes.map((mode) => {
              const isActive = activeModeId === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveModeId(mode.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-zinc-100 text-zinc-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.15)] font-semibold"
                      : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800/50"
                  }`}
                >
                  {mode.id === "anc" && <ShieldCheck className="w-4 h-4 shrink-0" />}
                  {mode.id === "transparency" && <Volume2 className="w-4 h-4 shrink-0" />}
                  {mode.id === "audiophile" && <Sliders className="w-4 h-4 shrink-0" />}
                  <span>{mode.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${
                      isActive ? "bg-zinc-950 text-zinc-200" : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {mode.highlightDecibel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mode Info & Equalizer Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-block px-2.5 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-zinc-300 uppercase tracking-wider">
                {currentMode.badge}
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {currentMode.tagline}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {currentMode.description}
              </p>
            </div>

            {/* Dynamic Telemetry Stats */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                  DSP Status
                </span>
                <span className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Active 38kHz
                </span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                  Peak Target
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {currentMode.highlightDecibel}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                  Latency Shift
                </span>
                <span className="text-sm font-mono font-bold text-zinc-300">
                  {activeModeId === "transparency" ? "0.74 ms" : "< 1.2 ms"}
                </span>
              </div>
            </div>
          </div>

          {/* Equalizer Frequency Graphic Screen */}
          <div className="relative rounded-2xl bg-zinc-950/90 border border-zinc-800 p-6 overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-6 pb-2 border-b border-zinc-900">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-zinc-400" />
                ACOUSTIC SPECTRUM RESPONSE (HARMAN 2024 TARGET)
              </span>
              <span>20 HZ — 48 KHZ</span>
            </div>

            {/* Visual Equalizer Bars */}
            <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-2 px-2 relative z-10">
              {currentMode.equalizerLevels.map((val, i) => {
                // Modulate height slightly for alive organic look
                const randomOffset = ((i % 3) - 1) * 4;
                const finalHeight = Math.max(10, Math.min(100, val + randomOffset));

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-zinc-800 via-zinc-400 to-zinc-100 transition-all duration-500 ease-out shadow-sm"
                      style={{
                        height: `${finalHeight}%`,
                        opacity: 0.75 + (finalHeight / 100) * 0.25,
                      }}
                    />
                    <span className="text-[9px] font-mono text-zinc-600 hidden sm:inline-block">
                      {i === 0 ? "20" : i === 3 ? "100" : i === 6 ? "1k" : i === 9 ? "10k" : i === 11 ? "40k" : ""}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Simulated Live Response Curve (SVG Overlay) */}
            <svg
              className="absolute inset-x-0 bottom-10 h-32 w-full pointer-events-none opacity-40 overflow-visible"
              viewBox="0 0 800 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={getCurvePath(activeModeId)}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="transition-all duration-700 ease-in-out"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
