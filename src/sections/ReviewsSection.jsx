import React from "react";
import { Star, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";
import { reviews, productDetails } from "../data/headphonesData";

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-28 bg-zinc-950 text-zinc-100 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-zinc-300" />
              Verified Impressions
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Endorsed by Audiophiles & Sound Engineers
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Tested on mastering consoles, flight testbeds, and studio environments around the world.
            </p>
          </div>

          {/* Aggregate Rating Pill */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md flex items-center gap-4 shrink-0">
            <div className="text-4xl font-bold font-mono text-white">
              {productDetails.rating}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                Based on {productDetails.reviewsCount} verified reviews
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">{review.date}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-zinc-200 transition-colors">
                  "{review.title}"
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  {review.content}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-200">{review.author}</div>
                  <div className="text-xs text-zinc-500">{review.role}</div>
                </div>

                {review.verified && (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
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
