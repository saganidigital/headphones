import React, { useState, useEffect } from "react";
import { Disc3, ShoppingBag, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { productDetails } from "../data/headphonesData";

export function Navbar({ onOpenPreorder, cartCount = 0 }) {
  const [isBubble, setIsBubble] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "hero", label: "Overview", href: "#hero" },
    { id: "colorways", label: "Finishes", href: "#colorways" },
    { id: "modes", label: "Sound Modes", href: "#modes" },
    { id: "specs", label: "Specifications", href: "#specs" },
    { id: "reviews", label: "Reviews", href: "#reviews" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Detect whether the user has scrolled past the hero pinned scrub animation
          const heroElement = document.getElementById("hero");
          if (heroElement) {
            const rect = heroElement.getBoundingClientRect();
            // When hero bottom reaches near/above the viewport, animation is complete!
            // Rect.bottom <= window.innerHeight * 0.45 triggers the morph into the bubble
            const pastHeroAnimation = rect.bottom <= window.innerHeight * 0.45;
            setIsBubble(pastHeroAnimation);
          } else {
            setIsBubble(window.scrollY > 800);
          }

          // Active section spy
          const sectionElements = navLinks.map((link) => ({
            id: link.id,
            el: document.getElementById(link.id),
          }));

          const scrollPosition = window.scrollY + window.innerHeight * 0.35;

          for (let i = sectionElements.length - 1; i >= 0; i--) {
            const item = sectionElements[i];
            if (item.el) {
              const top = item.el.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection(item.id);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeLink = navLinks.find((l) => l.id === activeSection) || navLinks[0];

  return (
    <>
      {/* Outer Floating Bar Wrapper */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isBubble
            ? "pt-3 sm:pt-4 px-3 sm:px-6 flex justify-center"
            : "pt-4 sm:pt-5 px-6 sm:px-8 w-full"
        }`}
      >
        {/* Inner Nav Capsule / Full Bar */}
        <div
          className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isBubble
              ? "w-auto max-w-[95vw] sm:max-w-fit mx-auto flex items-center justify-between gap-2.5 sm:gap-4 py-1.5 px-3 sm:py-2 sm:px-4 bg-zinc-950/85 backdrop-blur-2xl border border-zinc-700/60 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.05)] ring-1 ring-white/10 rounded-full animate-bubble"
              : "w-full max-w-7xl mx-auto flex items-center justify-between py-2 px-0 bg-transparent border-transparent rounded-none"
          }`}
        >
          {/* Brand Monogram & Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
            aria-label="SOVIO Home"
          >
            <div
              className={`rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-zinc-500 ${
                isBubble ? "w-7 h-7 sm:w-8 sm:h-8" : "w-8 h-8"
              }`}
            >
              <Disc3 className="w-4 h-4 text-zinc-100" />
            </div>
            <span
              className={`font-bold tracking-[0.2em] text-zinc-100 uppercase transition-all duration-300 ${
                isBubble
                  ? "text-xs sm:text-sm hidden sm:inline"
                  : "text-base inline"
              }`}
            >
              SOVIO
            </span>
          </a>

          {/* Separator when in bubble mode */}
          {isBubble && (
            <div className="h-4 w-px bg-zinc-800 hidden md:block shrink-0" />
          )}

          {/* Center Navigation Links */}
          <nav
            className={`transition-all duration-300 ${
              isBubble
                ? "hidden md:flex items-center gap-1"
                : "hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1 text-xs uppercase tracking-wider transition-all duration-200 rounded-full font-medium ${
                    isActive
                      ? isBubble
                        ? "bg-zinc-800/90 text-white shadow-sm ring-1 ring-white/10"
                        : "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Active section pill on mobile when in bubble mode */}
          {isBubble && (
            <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono uppercase text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{activeLink.label}</span>
            </div>
          )}

          {/* Separator when in bubble mode */}
          {isBubble && (
            <div className="h-4 w-px bg-zinc-800 hidden sm:block shrink-0" />
          )}

          {/* Right Action: Launch Offer + Pre-Order Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Show full pricing text only when in wide hero header */}
            {!isBubble && (
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono">
                  Launch Offer
                </span>
                <span className="text-sm font-semibold text-zinc-100">
                  ${productDetails.price}
                  <span className="text-xs text-zinc-500 line-through ml-1.5 font-normal">
                    ${productDetails.originalPrice}
                  </span>
                </span>
              </div>
            )}

            {/* In Bubble mode: compact pre-order pill */}
            {isBubble ? (
              <button
                type="button"
                onClick={onOpenPreorder}
                className="group relative inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md shadow-white/10 hover:shadow-white/20 active:scale-95 cursor-pointer"
                aria-label="Open Pre-Order checkout"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-zinc-900" />
                <span className="hidden sm:inline">Pre-Order</span>
                <span className="font-mono text-[11px] bg-zinc-950 text-zinc-100 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                  ${productDetails.price}
                </span>
              </button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenPreorder}
                icon={ShoppingBag}
                aria-label="Open Pre-Order checkout"
              >
                <span>Pre-Order</span>
                {cartCount > 0 && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-zinc-950 text-zinc-100 text-[10px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            )}

            {/* Mobile hamburger menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 sm:p-2 md:hidden text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-900 border border-zinc-800 transition-colors ${
                isBubble ? "p-1.5" : "p-2"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-fadeIn">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <Disc3 className="w-5 h-5 text-zinc-100" />
              <span className="font-bold tracking-[0.2em] text-sm text-zinc-100 uppercase">
                SOVIO APEX
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-semibold flex items-center justify-between border-b border-zinc-800/80 pb-3 transition-colors ${
                    isActive ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                    <span>{link.label}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500" />
                </a>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-zinc-400 text-sm">Special Launch Pricing</span>
              <span className="text-lg font-bold text-white">
                ${productDetails.price}{" "}
                <span className="text-sm text-zinc-500 line-through">
                  ${productDetails.originalPrice}
                </span>
              </span>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreorder();
              }}
              icon={ShoppingBag}
            >
              Pre-Order SOVIO Apex
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
