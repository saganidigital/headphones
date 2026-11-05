import React from "react";
import { Check, Sparkles, ShoppingBag } from "lucide-react";
import { colorways, productDetails } from "../data/headphonesData";
import { Button } from "../components/Button";

export function ColorwaysSection({ selectedColor, onSelectColor, onOpenPreorder }) {
  const activeColorway = colorways.find((c) => c.id === selectedColor) || colorways[0];

  return (
    <section id="colorways" className="py-28 bg-zinc-950 text-zinc-100 border-t border-zinc-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-zinc-800/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            Finishes & Materials
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Precision Anodized. Three Timeless Hues.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Coated with aerospace-grade vapor deposition that resists micro-scratches, sweat, and fingerprint oils while preserving an ultra-smooth tactile touch.
          </p>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Visual Display */}
          <div className="lg:col-span-7 bg-zinc-900/40 rounded-3xl border border-zinc-800/80 p-8 sm:p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] group">
            {/* Ambient Radial Spotlight */}
            <div
              className="absolute inset-0 opacity-30 transition-all duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${activeColorway.colorHex} 0%, transparent 70%)`,
              }}
            />

            {/* Headphone Render */}
            <img
              src={activeColorway.image}
              alt={activeColorway.name}
              className="relative z-10 w-full max-w-md h-auto object-contain transition-all duration-700 ease-out drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] group-hover:scale-105"
            />

            {/* Badges on the image */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800">
              <span
                className="w-3 h-3 rounded-full border border-white/30"
                style={{ backgroundColor: activeColorway.colorHex }}
              />
              <span className="text-xs font-mono text-zinc-200">{activeColorway.name}</span>
            </div>

            <div className="absolute top-6 right-6 z-20 text-[11px] font-mono text-zinc-500 uppercase tracking-wider bg-zinc-950/60 px-3 py-1 rounded-full border border-zinc-800">
              Anodized Aluminum Frame
            </div>
          </div>

          {/* Color Switcher & Specs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400">
                Select Your Finish
              </h3>
              <div className="space-y-3">
                {colorways.map((color) => {
                  const isSelected = selectedColor === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => onSelectColor(color.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-zinc-900 border-zinc-400 shadow-xl shadow-black/50"
                          : "bg-zinc-900/30 border-zinc-800/80 hover:bg-zinc-900/70 hover:border-zinc-700 text-zinc-400"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            isSelected ? "border-white scale-110 shadow-lg" : "border-zinc-700"
                          }`}
                          style={{ backgroundColor: color.colorHex }}
                        />
                        <div>
                          <div className={`text-base font-semibold ${isSelected ? "text-white" : "text-zinc-200"}`}>
                            {color.name}
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5">{color.subtitle}</div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Value Props */}
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase">Selected Unit</span>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {productDetails.name} — {activeColorway.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">${productDetails.price}</div>
                  <div className="text-xs text-zinc-500 line-through">${productDetails.originalPrice}</div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={onOpenPreorder}
                icon={ShoppingBag}
              >
                Pre-Order In {activeColorway.name.split(" ")[0]}
              </Button>

              <p className="text-[11px] text-center text-zinc-500">
                Ships with complimentary magnetic travel case in matching tone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
