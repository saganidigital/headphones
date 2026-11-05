import React, { useState } from "react";
import { X, Check, ShieldCheck, Truck, RotateCcw, ArrowRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "./Button";
import { productDetails, colorways } from "../data/headphonesData";

export function PreOrderDrawer({ isOpen, onClose, selectedColor, onSelectColor }) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentColor = colorways.find((c) => c.id === selectedColor) || colorways[0];
  const unitPrice = productDetails.price;
  const subtotal = unitPrice * quantity;
  const originalSubtotal = productDetails.originalPrice * quantity;
  const savings = originalSubtotal - subtotal;

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"],
        });
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800/80 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  Direct Reserve
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Launch Batch
                </span>
              </div>
              <h2 className="text-xl font-bold text-zinc-100 mt-1">Pre-Order SOVIO Apex</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
              aria-label="Close pre-order drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white">Pre-Order Confirmed</h3>
                  <p className="text-sm text-zinc-400 max-w-xs mx-auto">
                    Your spot in the first production run of {currentColor.name} is secured. Serial certification will be emailed shortly.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Order Ref:</span>
                    <span className="text-zinc-200">#SV-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Selected Finish:</span>
                    <span className="text-zinc-200">{currentColor.name}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Quantity:</span>
                    <span className="text-zinc-200">{quantity} Unit(s)</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 border-t border-zinc-800 pt-2 font-semibold">
                    <span>Amount Paid:</span>
                    <span className="text-white">${subtotal} USD</span>
                  </div>
                </div>

                <Button variant="primary" size="md" className="w-full mt-6" onClick={handleReset}>
                  Done & Continue Browsing
                </Button>
              </div>
            ) : (
              <>
                {/* Product Summary Card */}
                <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <img
                    src={currentColor.image}
                    alt={currentColor.name}
                    className="w-20 h-20 object-cover rounded-xl bg-black border border-zinc-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-zinc-100 truncate">{productDetails.name}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{currentColor.name}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base font-bold text-white">${unitPrice}</span>
                      <span className="text-xs text-zinc-500 line-through">
                        ${productDetails.originalPrice}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        SAVE ${productDetails.originalPrice - unitPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-3">
                    Select Finish
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorways.map((c) => {
                      const isSelected = selectedColor === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => onSelectColor(c.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-zinc-800/80 border-zinc-400 text-white shadow-md shadow-black/40"
                              : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                            style={{ backgroundColor: c.colorHex }}
                          />
                          <span className="text-[11px] font-medium leading-tight">{c.name.split(" ")[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-300">Limited to 4 per customer</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center justify-center hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm font-semibold text-white w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(4, quantity + 1))}
                        disabled={quantity >= 4}
                        className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center justify-center hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Perks Included */}
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2.5">
                  <div className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                    Launch Edition Perks
                  </div>
                  <ul className="text-xs text-zinc-400 space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      Free Magnetic Hard-Shell Vault ($59 value)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      2-Year Extended Worldwide Warranty
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      Complimentary Air Courier with Real-Time Tracking
                    </li>
                  </ul>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Retail Price ({quantity}x)</span>
                    <span className="line-through">${originalSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Launch Savings</span>
                    <span>-${savings}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Express Shipping</span>
                    <span className="text-zinc-200 font-mono uppercase text-[11px]">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                    <span>Total Due Today</span>
                    <span>${subtotal} USD</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer */}
          {!isSuccess && (
            <div className="p-6 border-t border-zinc-800/80 bg-zinc-950 space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-between"
                onClick={handleCheckout}
                disabled={isSubmitting}
                icon={ArrowRight}
                iconPosition="right"
              >
                <span>{isSubmitting ? "Securing Allocation..." : `Reserve for $${subtotal}`}</span>
              </Button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-zinc-500 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5" /> 30-Day Guarantee
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Carbon-Neutral
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
