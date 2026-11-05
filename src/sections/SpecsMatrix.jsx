import React, { useState } from "react";
import { technicalSpecs, competitorComparison, productDetails } from "../data/headphonesData";
import { Sliders, CheckCircle2, XCircle, Trophy, Sparkles } from "lucide-react";

export function SpecsMatrix() {
  const [activeCategory, setActiveCategory] = useState(technicalSpecs[0].category);

  const selectedCategoryData =
    technicalSpecs.find((c) => c.category === activeCategory) || technicalSpecs[0];

  return (
    <section
      id="specs"
      className="relative py-28 px-6 sm:px-10 bg-zinc-950 border-t border-zinc-900"
      aria-label="Technical Specifications and Competitor Comparison"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono tracking-widest uppercase text-zinc-400 mb-4">
            <Sliders className="w-3.5 h-3.5 text-zinc-300" />
            <span>Telemetry & Benchmark Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Engineered Down to the Nanometer
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Compare every acoustic tolerance, driver parameter, and battery benchmark against the world's leading flagships.
          </p>
        </div>

        {/* Part 1: Detailed Category Specifications Grid */}
        <div className="mb-24">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {technicalSpecs.map((cat) => (
              <button
                key={cat.category}
                type="button"
                onClick={() => setActiveCategory(cat.category)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.category
                    ? "bg-zinc-100 text-zinc-950 font-semibold shadow-lg shadow-white/10"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Specs List */}
          <div className="max-w-4xl mx-auto bg-zinc-900/40 rounded-3xl border border-zinc-800/80 p-6 sm:p-10 backdrop-blur-md">
            <div className="divide-y divide-zinc-800/80">
              {selectedCategoryData.items.map((item, idx) => (
                <div
                  key={idx}
                  className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <span className="text-sm font-medium text-zinc-400">
                    {item.label}
                  </span>
                  <span className="text-sm font-mono font-semibold text-zinc-100 text-left sm:text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2: Flagship Competitor Comparison Table */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-medium text-white">
              Flagship Head-to-Head Comparison
            </h3>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60">
                  <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Feature Benchmark
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-wider text-white bg-zinc-800/60 relative">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-200" />
                      <span>SOVIO Apex</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Sony WH-1000XM5
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Apple AirPods Max
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Bose QC Ultra
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm">
                {competitorComparison.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="p-4 sm:p-5 font-medium text-zinc-300">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-white bg-zinc-800/30 font-mono">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.sovio}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400 font-mono">
                      {row.sony}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400 font-mono">
                      {row.airpods}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400 font-mono">
                      {row.bose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
