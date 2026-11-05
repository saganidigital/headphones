import React from "react";
import { Star, ShieldCheck, MessageSquareQuote } from "lucide-react";
import { reviews, productDetails } from "../data/headphonesData";

export function Reviews() {
  return (
    <section
      id="reviews"
      className="relative py-28 px-6 sm:px-10 bg-zinc-950 border-t border-zinc-900"
      aria-label="Audiophile Reviews and Customer Feedback"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono tracking-widest uppercase text-zinc-400 mb-4">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Audiophile Critical Reception</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Acclaimed by Sound Engineers & Mastering Pros
          </h2>
          
          {/* Aggregate Rating Score */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-mono text-xl font-bold text-white">
              {productDetails.rating}
            </span>
            <span className="text-zinc-500 text-sm">
              ({productDetails.reviewsCount.toLocaleString()} Verified Critical Audits)
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-900/30 rounded-3xl border border-zinc-800/80 p-8 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{rev.date}</span>
                </div>

                <h3 className="text-base font-semibold text-zinc-100 mb-3 leading-snug">
                  "{rev.title}"
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-zinc-500">{rev.role}</p>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
