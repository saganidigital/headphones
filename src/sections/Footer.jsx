import React, { useState } from "react";
import { Disc3, ArrowRight, Check, Sparkles } from "lucide-react";
import { productDetails } from "../data/headphonesData";

export function Footer({ onOpenPreorder }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  const footerLinks = {
    Acoustics: [
      { label: "Beryllium Transducers", href: "#hero" },
      { label: "Hybrid ANC Microphones", href: "#modes" },
      { label: "Lossless Audio DAC", href: "#specs" },
      { label: "Harman Curve Calibration", href: "#modes" },
    ],
    Support: [
      { label: "Firmware Updates", href: "#" },
      { label: "Warranty Registration", href: "#" },
      { label: "Acoustic Vault Manual", href: "#" },
      { label: "Courier Tracking", href: "#" },
    ],
    Company: [
      { label: "Acoustic Heritage", href: "#" },
      { label: "Studio Collaborations", href: "#" },
      { label: "Sustainability Audit", href: "#" },
      { label: "Press Inquiries", href: "#" },
    ],
  };

  return (
    <footer
      className="bg-black border-t border-zinc-900 pt-20 pb-12 px-6 sm:px-10 text-zinc-400"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter & Pre-order Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Disc3 className="w-4 h-4 text-zinc-100" />
              </div>
              <span className="font-bold tracking-[0.2em] text-lg text-zinc-100 uppercase">
                SOVIO
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed mb-6">
              Acoustic engineering without compromise. Handcrafted in limited allocations for audio professionals, sound designers, and discerning listeners.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span>EST. 2024</span>
              <span>•</span>
              <span>BERYLLIUM ARCHITECTURE</span>
              <span>•</span>
              <span>FLAGSHIP SERIES</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200 mb-2">
              Receive Acoustic Lab Dispatches
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Direct access to limited production runs, frequency curve whitepapers, and firmware releases.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-emerald-400 flex items-center gap-2 font-mono">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subscribed. Welcome to the acoustic circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-zinc-900 text-xs">
          <div>
            <h4 className="font-mono uppercase tracking-widest text-zinc-200 mb-4">
              Acoustics
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.Acoustics.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-zinc-100 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-widest text-zinc-200 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.Support.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-zinc-100 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-widest text-zinc-200 mb-4">
              Heritage
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.Company.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-zinc-100 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-widest text-zinc-200 mb-4">
              Launch Allocation
            </h4>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Batch #04 currently in production. Ships with individual serialized calibration graphs.
            </p>
            <button
              type="button"
              onClick={onOpenPreorder}
              className="text-xs font-mono uppercase tracking-wider text-white underline underline-offset-4 hover:text-zinc-300 cursor-pointer"
            >
              Pre-Order Allocation →
            </button>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} SOVIO Acoustic Laboratories Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Pre-Order</a>
            <a href="#" className="hover:text-zinc-400">Compliance & Telemetry</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
