import React from "react";
import { Package, Check, Disc3, Shield, Cable, Award } from "lucide-react";
import { inTheBoxItems } from "../data/headphonesData";

export function InTheBox() {
  const getIcon = (index) => {
    switch (index) {
      case 0:
        return Disc3;
      case 1:
        return Package;
      case 2:
      case 3:
      case 4:
        return Cable;
      default:
        return Award;
    }
  };

  return (
    <section
      id="in-the-box"
      className="relative py-28 px-6 sm:px-10 bg-zinc-950 border-t border-zinc-900"
      aria-label="In The Box Package Contents"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono tracking-widest uppercase text-zinc-400 mb-4">
            <Package className="w-3.5 h-3.5 text-zinc-300" />
            <span>Unboxing Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Every Essential, Curated Without Compromise
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Open the hard-shell vault to find studio-grade oxygen-free cables, airline adapters, and an individual unit acoustic certificate.
          </p>
        </div>

        {/* Box Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {inTheBoxItems.map((item, index) => {
            const Icon = getIcon(index);
            return (
              <div
                key={index}
                className="bg-zinc-900/30 rounded-2xl border border-zinc-800/80 p-6 flex items-start gap-4 hover:border-zinc-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
