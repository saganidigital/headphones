export const productDetails = {
  name: "SOVIO Apex",
  badge: "Flagship Acoustic Series",
  tagline: "Acoustic Transcendence. Precision Engineered.",
  description:
    "Handcrafted with 40mm Beryllium-coated diaphragms, quad-microphone hybrid ANC, and an ultra-lightweight aerospace composite headband.",
  price: 399,
  originalPrice: 449,
  currency: "$",
  stockStatus: "In Stock - Limited Launch Edition",
  rating: 4.96,
  reviewsCount: 1420,
};

export const heroScrollPhases = [
  {
    id: "phase-1",
    range: [0.0, 0.22],
    badge: "AESTHETIC & ERGONOMICS",
    title: "Sculpted for Pure Acoustic Weightlessness",
    description: "Every curve is engineered to disperse clamping pressure across 18 contact points with zero fatigue.",
    statValue: "254g",
    statLabel: "Ultra-Lightweight Frame",
    secondaryStat: "60h Battery",
  },
  {
    id: "phase-2",
    range: [0.26, 0.48],
    badge: "ACOUSTIC TRANSDUCTION",
    title: "Resonance That Hits the Sub-Bass Core",
    description: "Pulsating micro-chambers expand low-frequency depth down to 4Hz without muddling midrange vocal clarity.",
    statValue: "< 0.05%",
    statLabel: "Total Harmonic Distortion (THD)",
    secondaryStat: "4Hz - 48kHz",
  },
  {
    id: "phase-3",
    range: [0.52, 0.73],
    badge: "EXPLODED ARCHITECTURE",
    title: "40mm Beryllium-Coated Drivers",
    description: "Dual neodymium ring magnets paired with aerospace dampening membranes for surgical transient response.",
    statValue: "40mm",
    statLabel: "Custom Driver Core",
    secondaryStat: "Dual N52 Magnets",
  },
  {
    id: "phase-4",
    range: [0.77, 1.0],
    badge: "INTELLIGENT HYBRID ANC",
    title: "Silence the Chaos with -42dB Neutralization",
    description: "Quad-microphone spatial telemetry samples ambient noise 38,000 times per second to generate real-time anti-noise.",
    statValue: "-42dB",
    statLabel: "Noise Suppression",
    secondaryStat: "Quad-Mic Telemetry",
  },
];

export const colorways = [
  {
    id: "obsidian",
    name: "Obsidian Black",
    subtitle: "Stealth matte finish with micro-textured graphite accents",
    colorHex: "#18181b",
    ringClass: "ring-zinc-400",
    image: "/frames/frame_1.webp",
    accent: "text-zinc-200",
  },
  {
    id: "slate",
    name: "Graphite Slate",
    subtitle: "Subtle metallic shimmer inspired by architectural slate",
    colorHex: "#3f3f46",
    ringClass: "ring-zinc-300",
    image: "/frames/frame_30.webp",
    accent: "text-zinc-300",
  },
  {
    id: "platinum",
    name: "Lunar Titanium",
    subtitle: "High-contrast clean studio tone with laser-etched branding",
    colorHex: "#71717a",
    ringClass: "ring-zinc-200",
    image: "/frames/frame_240.webp",
    accent: "text-zinc-100",
  },
];

export const soundModes = [
  {
    id: "anc",
    name: "Hybrid ANC",
    tagline: "Active -42dB Ambient Mute",
    description:
      "Deep low-frequency rumble cancellation. Perfect for airplane cabins, busy coffee houses, and commute trains.",
    equalizerLevels: [15, 20, 25, 45, 60, 75, 80, 85, 90, 88, 85, 80],
    highlightDecibel: "-42 dB",
    badge: "Max Isolation",
    accentColor: "from-sky-500/20 to-sky-400/5",
    borderGlow: "border-sky-500/30",
  },
  {
    id: "transparency",
    name: "Spatial Transparency",
    tagline: "Crystal Natural Awareness",
    description:
      "Ultra-low latency audio pass-through allows conversation and street awareness without removing your headset.",
    equalizerLevels: [50, 65, 80, 90, 95, 90, 85, 90, 95, 85, 75, 65],
    highlightDecibel: "< 0.8ms Latency",
    badge: "Awareness",
    accentColor: "from-amber-500/20 to-amber-400/5",
    borderGlow: "border-amber-500/30",
  },
  {
    id: "audiophile",
    name: "Studio Reference Flat",
    tagline: "Uncompromised 24-bit Lossless",
    description:
      "Direct DAC pass-through with pure Harman-curve calibration. Zero artificial coloring or bass blooming.",
    equalizerLevels: [60, 62, 63, 65, 65, 66, 65, 65, 64, 63, 62, 60],
    highlightDecibel: "24-bit / 96kHz",
    badge: "Reference Hi-Res",
    accentColor: "from-emerald-500/20 to-emerald-400/5",
    borderGlow: "border-emerald-500/30",
  },
];

export const technicalSpecs = [
  {
    category: "Acoustic Engine",
    items: [
      { label: "Driver Size & Type", value: "40mm Custom Beryllium-Coated Diaphragm" },
      { label: "Frequency Response", value: "4 Hz – 48,000 Hz" },
      { label: "Total Harmonic Distortion (THD)", value: "< 0.05% @ 1kHz, 100dB SPL" },
      { label: "Acoustic Architecture", value: "Closed-Back Dual Bass-Reflex Chamber" },
      { label: "DAC Resolution", value: "Up to 24-bit / 96kHz Lossless via USB-C" },
    ],
  },
  {
    category: "Connectivity & Telemetry",
    items: [
      { label: "Bluetooth Protocol", value: "Bluetooth 5.4 Low-Energy with Dual Multipoint" },
      { label: "Supported Codecs", value: "LDAC, AAC, aptX Adaptive, SBC, LC3" },
      { label: "Microphone Array", value: "4× Beamforming MEMS with ENC Voice Isolation" },
      { label: "Wireless Range", value: "Up to 20 meters (65 ft) obstacle-free" },
    ],
  },
  {
    category: "Battery & Quick Charge",
    items: [
      { label: "ANC Enabled Battery Life", value: "Up to 45 hours continuous playback" },
      { label: "ANC Disabled Battery Life", value: "Up to 60 hours continuous playback" },
      { label: "Turbo-Charge Speed", value: "15 minutes charge = 8 hours playback" },
      { label: "Full Recharge Time", value: "70 minutes via USB-C Power Delivery" },
    ],
  },
  {
    category: "Chassis & Ergonomics",
    items: [
      { label: "Chassis Weight", value: "254 grams (8.9 oz)" },
      { label: "Ear Cushion Material", value: "Perforated Protein Leather over Viscoelastic Foam" },
      { label: "Headband Structure", value: "Aerospace-Grade Aluminum & Magnesium Alloy" },
      { label: "Foldable Geometry", value: "180° Swivel & Compact Flat-Fold" },
    ],
  },
];

export const competitorComparison = [
  {
    feature: "Driver Technology",
    sovio: "40mm Beryllium Coated",
    sony: "30mm Carbon Fiber",
    airpods: "40mm Dynamic Driver",
    bose: "35mm Bio-Cellulose",
  },
  {
    feature: "Max ANC Attenuation",
    sovio: "-42 dB",
    sony: "-38 dB",
    airpods: "-37 dB",
    bose: "-39 dB",
  },
  {
    feature: "Total Battery Life",
    sovio: "60 Hours",
    sony: "30 Hours",
    airpods: "20 Hours",
    bose: "24 Hours",
  },
  {
    feature: "Weight",
    sovio: "254g",
    sony: "250g",
    airpods: "384g",
    bose: "252g",
  },
  {
    feature: "Lossless USB-C Audio",
    sovio: "24-bit/96kHz Native",
    sony: "No (Analog only)",
    airpods: "No (Lightning/BT only)",
    bose: "No (Analog only)",
  },
  {
    feature: "Price",
    sovio: "$399",
    sony: "$399",
    airpods: "$549",
    bose: "$429",
  },
];

export const reviews = [
  {
    id: 1,
    author: "Julian Vance",
    role: "Senior Mastering Engineer, Abbey Road Alum",
    rating: 5,
    date: "2 days ago",
    title: "The closest thing to $2,000 open-backs in a portable wireless can.",
    content:
      "The transient speed of the beryllium driver is astonishing. Cymbals have zero splashiness, sub-bass down to 20Hz doesn't bleed into the vocals, and the ANC noise floor is dead silent.",
    verified: true,
  },
  {
    id: 2,
    author: "Elena Rostova",
    role: "Acoustic Architect & Sound Designer",
    rating: 5,
    date: "1 week ago",
    title: "Ergonomics are unmatched. Wore them on a 14-hour flight without tension.",
    content:
      "Most ANC headphones clamp your temporal bones after 3 hours. The weight distribution on the SOVIO Apex is remarkable. The companion app equalizer curves are genuinely mastering-grade.",
    verified: true,
  },
  {
    id: 3,
    author: "Marcus Chen",
    role: "Tech Editor, Audiophile Quarterly",
    rating: 5,
    date: "2 weeks ago",
    title: "Blows away the AirPods Max and Sony XM5 in build and soundstage.",
    content:
      "Having 24-bit lossless USB-C playback built directly into an ANC wireless headphone makes this my definitive daily driver for both desk mixing and commuting.",
    verified: true,
  },
];

export const inTheBoxItems = [
  { name: "SOVIO Apex Wireless Headphones", detail: "Launch Edition with laser-engraved serial" },
  { name: "Magnetic Hard-Shell Travel Vault", detail: "Impact-resistant ballistic weave with cable pouch" },
  { name: "Braided 3.5mm OFC Auxiliary Cable", detail: "1.2m gold-plated audiophile oxygen-free copper" },
  { name: "Braided USB-C to USB-C Hi-Res Cable", detail: "Supports 24-bit/96kHz digital lossless audio & fast charging" },
  { name: "Dual-Pin Airplane Audio Adapter", detail: "Gold-plated dual mono to 3.5mm stereo" },
  { name: "Acoustic Calibration Certificate", detail: "Individual unit frequency response curve graph" },
];

export const trustBadges = [
  { label: "30-Day Risk-Free Trial", subtext: "Free returns, full refund guaranteed" },
  { label: "2-Year Global Warranty", subtext: "Instant replacement coverage" },
  { label: "Complimentary Express Courier", subtext: "Insured carbon-neutral shipping" },
  { label: "Lossless Audio Guarantee", subtext: "Tested to 24-bit / 96kHz studio fidelity" },
];
