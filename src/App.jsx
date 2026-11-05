import React, { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { useFramePreloader } from "./hooks/useFramePreloader";

// Components
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { PreOrderDrawer } from "./components/PreOrderDrawer";

// Sections
import { Hero } from "./sections/Hero";
import { Colorways } from "./sections/Colorways";
import { SoundModes } from "./sections/SoundModes";
import { SpecsMatrix } from "./sections/SpecsMatrix";
import { Reviews } from "./sections/Reviews";
import { InTheBox } from "./sections/InTheBox";
import { TrustBadges } from "./sections/TrustBadges";
import { Footer } from "./sections/Footer";

export function App() {
  // Initialize Lenis smooth scroll linked to GSAP ScrollTrigger
  useLenis();

  // 100% Asset Gate Frame Preloader
  const { progress, isLoaded, images } = useFramePreloader();
  const [preloaderDismissed, setPreloaderDismissed] = useState(false);

  // E-Commerce drawer & colorway state
  const [preorderDrawerOpen, setPreorderDrawerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("obsidian");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-200 selection:text-zinc-950 relative">
      {/* 100% Preloader Gate */}
      {!preloaderDismissed && (
        <Preloader
          progress={progress}
          isLoaded={isLoaded}
          onComplete={() => setPreloaderDismissed(true)}
        />
      )}

      {/* Persistent Navigation Header */}
      <Navbar
        onOpenPreorder={() => setPreorderDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {/* 240-Frame Interactive Hero Scrubber */}
        <Hero
          images={images}
          isLoaded={isLoaded}
          onOpenPreorder={() => setPreorderDrawerOpen(true)}
        />

        {/* Industrial Design & Interactive Colorways */}
        <Colorways
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          onOpenPreorder={() => setPreorderDrawerOpen(true)}
        />

        {/* Sound Mode Equalizer Simulation */}
        <SoundModes />

        {/* Technical Specs & Flagship Competitor Matrix */}
        <SpecsMatrix />

        {/* Critical Audiophile Reviews */}
        <Reviews />

        {/* In The Box Packaging Showcase */}
        <InTheBox />

        {/* Customer Guarantees & Trust Badges */}
        <TrustBadges />
      </main>

      {/* Site Footer */}
      <Footer
        onOpenPreorder={() => setPreorderDrawerOpen(true)}
      />

      {/* Slide-over Interactive Pre-Order Checkout Drawer */}
      <PreOrderDrawer
        isOpen={preorderDrawerOpen}
        onClose={() => setPreorderDrawerOpen(false)}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />
    </div>
  );
}

export default App;
