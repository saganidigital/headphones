import React from "react";
import { ShieldCheck, RotateCcw, Truck, Award } from "lucide-react";
import { trustBadges } from "../data/headphonesData";

export function TrustBadges() {
  const getBadgeIcon = (index) => {
    switch (index) {
      case 0:
        return RotateCcw;
      case 1:
        return ShieldCheck;
      case 2:
        return Truck;
      default:
        return Award;
    }
  };

  return (
    <section
      className="py-16 px-6 sm:px-10 bg-zinc-950/80 border-t border-zinc-900"
      aria-label="Customer Guarantees and Trust Badges"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustBadges.map((badge, idx) => {
            const Icon = getBadgeIcon(idx);
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-zinc-200" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-100">
                    {badge.label}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {badge.subtext}
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
