import React, { useState, useEffect } from "react";
import { soundModes } from "../data/headphonesData";
import { Radio, ShieldAlert, Waves, Sparkles, Activity } from "lucide-react";

export function SoundModes() {
  const [activeModeId, setActiveModeId] = useState("anc");
  const [barJitter, setBarJitter] = useState([]);

  const currentMode = soundModes.find((m) => m.id === activeModeId) || soundModes[0];

  // Dynamic subtle jitter animation for equalizer bars
  useEffect(() => {
    const interval = setInterval(() => {
      setBarJitter(
        currentMode.equalizerLevels.map((lvl) => {
          const jitter = (Math.random() - 0.5) * 12;
          return Math.max(8, Math.min(98, lvl + jitter));
        })
      );
    }, 180);

    return () => clearInterval(interval);
  }, [currentMode]);

  // Frequency bands for equalizer labeling
  const freqBands = ["20Hz", "40Hz", "80Hz", "160Hz", "320Hz", "640Hz", "1.2kHz", "2.5kHz", "5kHz", "10kHz", "16kHz", "20kHz"];

  return (
    <section
      id="modes"
      className="relative py-28 px-6 sm:px-10 bg-zinc-950 border-t border-zinc-900"
      aria-label="Sound Mode Simulation and DSP Calibration"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono tracking-widest uppercase text-zinc-400 mb-4">
            <Waves className="w-3.5 h-3.5 text-zinc-300" />
            <span>Digital Signal Processing (DSP)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Three Sound Engines. One Master Driver.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Switch in real time between acoustic isolation, lifelike natural transparency, and raw uncolored studio reference playback.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          {soundModes.map((mode) => {
            const isSelected = mode.id === activeModeId;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveModeId(mode.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-zinc-900/90 border-zinc-600 shadow-xl shadow-black/60 scale-[1.02]"
                    : "bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                }`}
                aria-pressed={isSelected}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-400 to-white" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                    {mode.badge}
                  </span>
                  <div className="glass-pill px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-300">
                    {mode.highlightDecibel}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">
                  {mode.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {mode.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Central Equalizer & DSP Frequency Curve Screen */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Header readout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-zinc-800/80 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  DSP Telemetry Monitor
                </span>
              </div>
              <h4 className="text-xl font-medium text-white mt-1">
                {currentMode.name} Active Profile
              </h4>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs">
              <div>
                <span className="text-zinc-500 block uppercase">Sampling</span>
                <span className="text-zinc-200 font-semibold">24-Bit / 96kHz</span>
              </div>
              <div className="h-6 w-px bg-zinc-800" />
              <div>
                <span className="text-zinc-500 block uppercase">Latency</span>
                <span className="text-zinc-200 font-semibold">{currentMode.id === "transparency" ? "0.68 ms" : "1.2 ms"}</span>
              </div>
              <div className="h-6 w-px bg-zinc-800" />
              <div>
                <span className="text-zinc-500 block uppercase">Dynamic Target</span>
                <span className="text-zinc-200 font-semibold">{currentMode.highlightDecibel}</span>
              </div>
            </div>
          </div>

          {/* Equalizer Visualizer Bars */}
          <div className="mb-8">
            <div className="h-48 flex items-end justify-between gap-1.5 sm:gap-3 px-2 sm:px-6 bg-zinc-950/80 rounded-2xl border border-zinc-800/60 p-4 relative">
              {/* Background decibel grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
                <div className="w-full border-b border-dashed border-zinc-600" />
                <div className="w-full border-b border-dashed border-zinc-600" />
                <div className="w-full border-b border-dashed border-zinc-600" />
                <div className="w-full border-b border-dashed border-zinc-600" />
              </div>

              {/* Bars */}
              {(barJitter.length > 0 ? barJitter : currentMode.equalizerLevels).map((level, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full z-10"
                >
                  <div
                    className="w-full rounded-t-sm transition-all duration-150 ease-out bg-gradient-to-t from-zinc-700 via-zinc-400 to-white"
                    style={{
                      height: `${level}%`,
                      boxShadow: level > 75 ? "0 0 12px rgba(255, 255, 255, 0.3)" : "none",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Freq labels */}
            <div className="flex justify-between px-2 sm:px-6 mt-3 font-mono text-[10px] sm:text-xs text-zinc-500">
              {freqBands.map((f, i) => (
                <span key={i} className="hidden sm:inline-block">
                  {f}
                </span>
              ))}
              <span className="sm:hidden text-center w-full">20 Hz ──────── Harman Curve ──────── 20 kHz</span>
            </div>
          </div>

          {/* Explanation Text */}
          <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/60 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0 mt-0.5">
              <Activity className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                Acoustic Target Calibration
              </h5>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {currentMode.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
