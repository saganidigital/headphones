import React, { useState } from "react";
import { Cpu, Check, Layers, BarChart3, HelpCircle } from "lucide-react";
import { technicalSpecs, competitorComparison, productDetails } from "../data/headphonesData";

export function SpecsSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="specs" className="py-28 bg-zinc-950 text-zinc-100 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
            <Cpu className="w-3.5 h-3.5 text-zinc-300" />
            Engineering Data
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Full Technical Specifications
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Every component is vetted against lab-grade acoustic benchmarks. Designed from scratch for uncompromising audiophiles.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {technicalSpecs.map((spec, idx) => (
            <button
              key={spec.category}
              type="button"
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === idx
                  ? "bg-zinc-100 text-zinc-950 font-semibold shadow-md"
                  : "bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              {spec.category}
            </button>
          ))}
        </div>

        {/* Spec Sheet Table */}
        <div className="bg-zinc-900/40 rounded-3xl border border-zinc-800/80 p-6 sm:p-8 mb-20 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-400" />
            {technicalSpecs[activeCategory].category}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalSpecs[activeCategory].items.map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex flex-col justify-between"
              >
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  {item.label}
                </span>
                <span className="text-sm sm:text-base font-semibold text-zinc-100">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Head-to-Head Comparison Sheet */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                <BarChart3 className="w-3.5 h-3.5" /> Competitive Benchmark
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                How SOVIO Apex Compares
              </h3>
            </div>
            <p className="text-xs text-zinc-500 font-mono">
              Independent laboratory measurement averages (2024–2026)
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-zinc-800/80 bg-zinc-900/30">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/90 text-xs font-mono text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-4 px-6">Metric</th>
                  <th className="py-4 px-6 text-zinc-100 font-bold bg-zinc-800/40">
                    SOVIO Apex
                  </th>
                  <th className="py-4 px-6">Sony WH-1000XM5</th>
                  <th className="py-4 px-6">AirPods Max</th>
                  <th className="py-4 px-6">Bose QC Ultra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-medium">
                {competitorComparison.map((row) => (
                  <tr key={row.feature} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-4 px-6 text-zinc-300 font-semibold">{row.feature}</td>
                    <td className="py-4 px-6 text-white font-bold bg-zinc-800/20">
                      <span className="inline-flex items-center gap-1.5 text-zinc-100">
                        <Check className="w-4 h-4 text-emerald-400" />
                        {row.sovio}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">{row.sony}</td>
                    <td className="py-4 px-6 text-zinc-400">{row.airpods}</td>
                    <td className="py-4 px-6 text-zinc-400">{row.bose}</td>
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
