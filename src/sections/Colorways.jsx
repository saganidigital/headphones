import React, { useState } from "react";
import { Check, Sparkles, Layers, Shield, Droplets, ShoppingBag } from "lucide-react";
import { colorways, productDetails } from "../data/headphonesData";
import { Button } from "../components/Button";

export function Colorways({ selectedColor, onSelectColor, onOpenPreorder }) {
  const [activeColorId, setActiveColorId] = useState(selectedColor || "obsidian");

  const currentColor = colorways.find((c) => c.id === activeColorId) || colorways[0];

  const handleSelect = (id) => {
    setActiveColorId(id);
    if (onSelectColor) {
      onSelectColor(id);
    }
  };

  const craftsmanshipSpecs = [
    {
      icon: Layers,
      title: "Aerospace Magnesium Alloy",
      desc: "Ultra-tensile headband structure resistant to bending fatigue over 50,000 stress cycles.",
    },
    {
      icon: Droplets,
      title: "Oleophobic PVD Coating",
      desc: "Dual-layer physical vapor deposition repels oils, sweat, and micro-abrasions seamlessly.",
    },
    {
      icon: Shield,
      title: "Viscoelastic Memory Foam",
      desc: "Custom slow-recovery acoustic earcups calibrated for thermal equilibrium and zero ear pinch.",
    },
  ];

  return (
    <section
      id="colorways"
      className="relative py-28 px-6 sm:px-10 bg-zinc-950 border-t border-zinc-900 overflow-hidden"
      aria-label="Product Finishes and Material Craftsmanship"
    >
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono tracking-widest uppercase text-zinc-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Industrial Design & Finishes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Crafted in Three Timeless Studio Finishes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Precision micro-textured finishes designed to endure decades of acoustic exploration.
          </p>
        </div>

        {/* Interactive Finishes Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Product Image Display with Smooth Transitions */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 border border-zinc-800/80 p-8 flex items-center justify-center relative overflow-hidden shadow-2xl">
              {/* Radial gradient backing */}
              <div className="absolute inset-0 bg-radial-gradient from-zinc-800/20 via-transparent to-transparent pointer-events-none" />

              {/* Headphone Frame Preview */}
              <img
                key={currentColor.id}
                src={currentColor.image}
                alt={`${currentColor.name} finish of SOVIO Apex`}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out animate-fadeIn"
              />

              {/* Watermark badge */}
              <div className="absolute bottom-6 left-6 font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                FINISH // {currentColor.name}
              </div>

              {/* Status pill */}
              <div className="absolute top-6 right-6 glass-pill px-3 py-1 rounded-full text-xs font-mono text-zinc-300">
                PVD Matte Anodized
              </div>
            </div>
          </div>

          {/* Right: Swatch Selector & Engineering Specs */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              Select Your Finish
            </span>
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-2">
              {currentColor.name}
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed">
              {currentColor.subtitle}
            </p>

            {/* Color Swatch Selector */}
            <div className="flex items-center gap-4 mb-10">
              {colorways.map((c) => {
                const isSelected = c.id === activeColorId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelect(c.id)}
                    className={`group relative flex items-center gap-3 p-2 pr-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-zinc-900 border-zinc-500 shadow-lg shadow-black/50"
                        : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                    }`}
                    aria-label={`Select ${c.name} finish`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg border border-white/20 flex items-center justify-center transition-transform ${
                        isSelected ? "scale-105" : "group-hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.colorHex }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {c.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Craftsmanship Features */}
            <div className="space-y-4 pt-6 border-t border-zinc-800/80 mb-8">
              {craftsmanshipSpecs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-zinc-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-200 tracking-wide">
                        {spec.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                        {spec.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Pre-order in this finish */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                onClick={() => {
                  handleSelect(activeColorId);
                  if (onOpenPreorder) onOpenPreorder();
                }}
                icon={ShoppingBag}
              >
                Pre-Order in {currentColor.name.split(" ")[0]} — ${productDetails.price}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
