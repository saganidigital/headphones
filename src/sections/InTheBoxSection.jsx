import React from "react";
import { Package, Headphones, Shield, Cable, Plug, Award } from "lucide-react";
import { inTheBoxItems } from "../data/headphonesData";

export function InTheBoxSection() {
  const getIcon = (idx) => {
    switch (idx) {
      case 0:
        return Headphones;
      case 1:
        return Shield;
      case 2:
      case 3:
        return Cable;
      case 4:
        return Plug;
      case 5:
      default:
        return Award;
    }
  };

  return (
    <section className="py-28 bg-zinc-950 text-zinc-100 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
            <Package className="w-3.5 h-3.5 text-zinc-300" />
            Unboxing Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            What's in the Box
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Every unit is packaged in 100% recycled structural fiber with custom molded protective foam and serialized testing paperwork.
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inTheBoxItems.map((item, idx) => {
            const Icon = getIcon(idx);
            return (
              <div
                key={item.name}
                className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-200">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base mb-1">{item.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
