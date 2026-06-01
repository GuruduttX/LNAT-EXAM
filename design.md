# LNAT Exam India — Design System
## Complete UI/UX Reference for AI Code Assistants

> **Purpose:** Give this document to any AI coding assistant to produce components that are visually and technically consistent with the LNAT Exam India platform. Follow every rule here as a hard constraint, not a suggestion.

---

## 1. Tech Stack (Non-Negotiable)

| Layer | Tool | Version |
|-------|------|---------|
| Framework | **Next.js App Router** | 14+ |
| Styling | **Tailwind CSS** | 3.4+ |
| Animation | **Framer Motion** | 11+ |
| Icons | **Lucide React** | latest |
| Language | **TypeScript** | 5+ |
| Font delivery | Google Fonts via `next/font` or `@import` in global CSS | — |

### Next.js Rules
- All interactive/animated components must have `"use client"` at the top.
- Server Components are fine for static wrappers and layout shells.
- Use the App Router (`app/` directory). Never use `pages/`.
- Images from external URLs (Unsplash etc.) must be whitelisted in `next.config.js` under `images.domains`.

```js
// next.config.js
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
};
```

---

## 2. Colour Palette

These are the **only** colours used across the entire platform. Never introduce new brand colours without updating this document.

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `navy-900` | `#0A1628` | Darkest bg, deep hero overlays |
| `navy-800` | `#0D1B3E` | Primary dark bg, card headers, CTA buttons |
| `navy-700` | `#111D3C` | Gradient mid-stop |
| `navy-600` | `#162447` | Gradient end-stop, hover states |
| `gold-500` | `#C9A84C` | Primary accent — borders, icons, labels, highlights |
| `gold-400` | `#E8C96A` | Gradient end-stop for gold shimmer |
| `gold-700` | `#8B6914` | Dark gold text on light backgrounds |
| `cream-50` | `#F7F3EC` | Page background (light sections) |
| `cream-100` | `#FDFBF7` | Card background alternative |

### Semantic / Functional

| Token | Value | Usage |
|-------|-------|-------|
| `text-primary` | `#0D1B3E` | All body text on light bg |
| `text-muted` | `#64748B` (Tailwind `slate-500`) | Supporting / descriptive text |
| `text-subtle` | `#94A3B8` (Tailwind `slate-400`) | Metadata, labels, captions |
| `text-on-dark` | `#FFFFFF` | Text on navy backgrounds |
| `text-on-dark-muted` | `rgba(255,255,255,0.5)` | Supporting text on navy |
| `border-light` | `rgba(0,0,0,0.07)` | Default card borders (light sections) |
| `border-gold` | `rgba(201,168,76,0.2)` | Gold accent borders |
| `border-dark` | `rgba(201,168,76,0.15)` | Borders inside dark/navy cards |

### Accent Colours (per-university / per-card only)

Used only for university cards and differentiation cards. Never use as global brand colours.

```
Oxford:    #0D1B3E   Cambridge: #C9A84C   UCL:     #8B1A1A
LSE:       #1A5276   KCL:       #6C1F6E   Bristol: #B5451B
Durham:    #154360   SOAS:      #1B5E20   JGLS:    #C9A84C
```

### Tailwind Config Extension

Add to `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      navy: {
        900: "#0A1628",
        800: "#0D1B3E",
        700: "#111D3C",
        600: "#162447",
      },
      gold: {
        400: "#E8C96A",
        500: "#C9A84C",
        700: "#8B6914",
      },
      cream: {
        50:  "#F7F3EC",
        100: "#FDFBF7",
      },
    },
  },
},
```

---

## 3. Typography

### Font Family

**Primary font: Poppins** — used for ALL text across the platform.

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
```

Or with `next/font`:
```ts
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["300","400","500","600","700","800"] });
```

> **Never** use Cormorant Garamond, Libre Baskerville, or any serif font in new components. Those were used in an earlier design iteration and have been removed.

### Type Scale

| Role | Size | Weight | Tailwind classes |
|------|------|--------|-----------------|
| Hero heading | `clamp(1.9rem, 4.8vw, 3.8rem)` | 800 | `text-[clamp(1.9rem,4.8vw,3.8rem)] font-extrabold` |
| Section heading | `clamp(1.5rem, 3vw, 2.4rem)` | 800 | `text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold` |
| Sub-heading | `20px` | 700 | `text-xl font-bold` |
| Card title | `15px` | 700 | `text-[15px] font-bold` |
| Body / paragraph | `13–14px` | 400 | `text-[13px]` or `text-sm` |
| Small / meta | `11–12px` | 400–600 | `text-[11px]` or `text-xs` |
| Label / eyebrow | `9–10px` | 700 | `text-[9px] font-bold tracking-[0.18em] uppercase` |
| Stat number | `1.8rem–2.4rem` | 800 | `text-3xl font-extrabold` |

### Letter Spacing Rules
- Eyebrow labels: `tracking-[0.18em]` to `tracking-[0.2em]`
- Section headings: `tracking-tight` (`-0.025em`)
- Hero headings: `tracking-tight` or `tracking-[-0.03em]`
- Body text: default (`tracking-normal`)

### Gradient Text (Gold)

Used on key words in section headings and hero headlines. Always a single highlighted phrase, never the whole heading.

```tsx
<span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
  highlight phrase
</span>
```

---

## 4. Spacing & Layout

### Max Widths
| Context | Value | Tailwind |
|---------|-------|---------|
| Global page container | `1280px` | `max-w-5xl` or `max-w-[1280px]` |
| Content panels / tab panels | `768px` | `max-w-3xl` |
| Text blocks / paragraphs | `560–600px` | `max-w-xl` or `max-w-[560px]` |

### Section Padding
```
Vertical (desktop):  py-14 lg:py-20
Vertical (compact):  py-8 lg:py-10
Horizontal:          px-4 sm:px-6 lg:px-8
```

### Component Spacing Pattern
- Between sibling section cards: `space-y-5` or `gap-5`
- Between grid items: `gap-3` to `gap-5`
- Card internal padding: `p-4` to `p-6`
- Card header padding: `px-5 py-3.5`

### Border Radius Scale
| Token | Value | Usage |
|-------|-------|-------|
| `rounded-xl` | `12px` | Chips, pills, small containers |
| `rounded-2xl` | `16px` | Cards, panels, modals |
| `rounded-3xl` | `24px` | Image containers, large hero cards |
| `rounded-full` | `9999px` | Badges, avatar chips, pill buttons |

---

## 5. Background Treatments

### Light Section Background
```
bg-[#F7F3EC]   — standard warm cream (most sections)
bg-[#FDFBF7]   — slightly lighter cream (cards, alternating sections)
```
Always apply the dot-grid texture overlay on light sections:
```tsx
<div className="absolute inset-0 pointer-events-none
  [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
  [background-size:26px_26px]" />
```

### Dark / Navy Section Background
```tsx
// Solid navy
className="bg-[#0D1B3E]"

// Cinematic gradient (hero sections)
style={{ background: "linear-gradient(135deg, #0A1628 0%, #0D1B3E 60%, #111D3C 100%)" }}

// With gold ambient glow top-centre
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
  style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
```

### Full-Bleed Hero (with real image)
```tsx
<div className="absolute inset-0">
  <img src={url} className="w-full h-full object-cover object-center" />
  {/* Navy overlay */}
  <div className="absolute inset-0"
    style={{ background: "linear-gradient(110deg, rgba(9,16,36,0.84) 0%, rgba(13,27,62,0.72) 45%, rgba(9,16,36,0.55) 100%)" }} />
  {/* Gold shimmer */}
  <div className="absolute inset-0 pointer-events-none"
    style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(201,168,76,0.10) 0%, transparent 55%)" }} />
</div>
```

---

## 6. Component Patterns

### 6.1 Section Eyebrow Label

Always precedes a section heading. Consists of two short lines + centred text.

```tsx
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-[#C9A84C]/40" />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]">
        {text}
      </span>
      <div className="h-px w-8 bg-[#C9A84C]/40" />
    </div>
  );
}
```

### 6.2 Section Heading Block (centred)

```tsx
<div className="flex flex-col items-center text-center mb-10">
  <SectionLabel text="Section Label Here" />
  <h2 className="font-extrabold text-[#0D1B3E] tracking-tight leading-tight mb-3
    text-[clamp(1.5rem,3vw,2.4rem)]">
    Regular heading text{" "}
    <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
      Gold highlighted phrase
    </span>
  </h2>
  <p className="text-slate-500 text-[14px] leading-relaxed max-w-xl">
    Supporting description text goes here.
  </p>
</div>
```

### 6.3 Standard Card (light bg)

```tsx
<div className="rounded-2xl bg-white border border-black/[0.07] shadow-sm overflow-hidden
  transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  {/* Optional coloured top accent bar */}
  <div className="h-[3px]" style={{ background: accentColor }} />
  <div className="p-5">
    {/* content */}
  </div>
</div>
```

### 6.4 Dark Card (navy bg)

```tsx
<div className="rounded-2xl bg-[#0D1B3E] border border-[#C9A84C]/15
  shadow-[0_16px_40px_rgba(13,27,62,0.2)] overflow-hidden">
  <div className="p-5">
    {/* content */}
  </div>
</div>
```

### 6.5 SectionCard (with header bar)

Used for information-heavy panels with a labelled header:

```tsx
function SectionCard({
  title,
  children,
  accent = "#0D1B3E",
}: {
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-black/[0.07] shadow-sm overflow-hidden mb-5">
      <div
        className="flex items-center gap-2 px-5 py-3.5 border-b border-black/[0.05]"
        style={{ background: `${accent}06` }}
      >
        <div className="w-[3px] h-[18px] rounded-full" style={{ background: accent }} />
        <span className="text-[13px] font-bold text-[#0D1B3E]">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
```

### 6.6 Alert / Info Boxes

Three variants with consistent padding and icon placement:

```tsx
type AlertType = "tip" | "warning" | "info";

function AlertBox({ type, children }: { type: AlertType; children: React.ReactNode }) {
  const cfg: Record<AlertType, { cls: string; icon: React.ReactNode }> = {
    tip:     { cls: "bg-[#C9A84C]/[0.06] border-[#C9A84C]/25 text-[#8B6914]", icon: <Lightbulb size={14} /> },
    warning: { cls: "bg-red-500/[0.05] border-red-400/20 text-red-600",        icon: <AlertCircle size={14} /> },
    info:    { cls: "bg-[#0D1B3E]/[0.05] border-[#0D1B3E]/15 text-[#0D1B3E]", icon: <Info size={14} /> },
  };
  return (
    <div className={`flex gap-2.5 p-3 rounded-xl border mb-4 ${cfg[type].cls}`}>
      <span className="shrink-0 mt-0.5">{cfg[type].icon}</span>
      <span className="text-[12px] text-gray-700 leading-relaxed">{children}</span>
    </div>
  );
}
```

### 6.7 Pill / Badge

```tsx
// Gold pill
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
  bg-[#C9A84C]/[0.08] border border-[#C9A84C]/20
  text-[10px] font-bold tracking-[0.12em] uppercase text-[#C9A84C]">
  content
</span>

// Dark pill (on light bg)
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
  bg-[#0D1B3E]/[0.06] border border-[#0D1B3E]/12
  text-[10px] font-bold text-[#0D1B3E]">
  content
</span>

// White pill (on dark bg)
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
  bg-white/10 border border-white/15
  text-[10px] font-semibold text-white/70">
  content
</span>
```

### 6.8 Bullet List Item

```tsx
function BulletItem({
  text,
  danger,
  sub,
}: {
  text: string;
  danger?: boolean;
  sub?: string;
}) {
  return (
    <div className="flex gap-2.5 mb-2.5 items-start">
      <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]
        ${danger ? "bg-red-500" : "bg-[#C9A84C]"}`} />
      <div>
        <span className="text-[13px] text-gray-700 leading-relaxed">{text}</span>
        {sub && <div className="text-[11px] text-slate-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}
```

### 6.9 Stat Tile — Dark

```tsx
<div className="rounded-2xl p-5 bg-[#0D1B3E] border border-[#C9A84C]/15">
  <div className="text-[#C9A84C] font-extrabold text-3xl leading-none mb-1.5">
    {value}
  </div>
  <div className="text-white text-[13px] font-bold mb-1">{label}</div>
  <div className="text-white/40 text-[11px] leading-relaxed">{sub}</div>
</div>
```

### 6.10 Stat Tile — Light

```tsx
<div className="rounded-2xl p-5 bg-white border border-black/[0.07] shadow-sm">
  <div className="text-[#0D1B3E] font-extrabold text-3xl leading-none mb-1.5">
    {value}
  </div>
  <div className="text-[#0D1B3E] text-[13px] font-bold mb-1">{label}</div>
  <div className="text-slate-400 text-[11px] leading-relaxed">{sub}</div>
</div>
```

### 6.11 Primary CTA Button (Gold)

```tsx
<button
  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl
    font-bold text-sm text-[#0D1B3E] transition-all duration-300
    hover:scale-[1.02] active:scale-[0.98]"
  style={{
    background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
    boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
  }}
>
  Button Label
  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
</button>
```

### 6.12 Secondary CTA Button (Ghost)

```tsx
<button
  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl
    font-bold text-sm text-white border border-white/20 bg-white/[0.08]
    backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
>
  <Download size={13} className="text-[#C9A84C]" />
  Button Label
</button>
```

### 6.13 Tab Bar

```tsx
<div className="flex gap-1.5 p-1.5 rounded-2xl bg-white/80 backdrop-blur-sm
  border border-black/[0.07] shadow-md overflow-x-auto
  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActive(tab.id)}
      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl
        whitespace-nowrap shrink-0 text-[12px] font-bold
        transition-all duration-250 border-none cursor-pointer"
      style={{
        background: active === tab.id ? "#0D1B3E" : "transparent",
        color:      active === tab.id ? "#fff"    : "#64748B",
        boxShadow:  active === tab.id ? "0 4px 12px rgba(13,27,62,0.25)" : "none",
      }}
    >
      <span style={{ color: active === tab.id ? "#C9A84C" : "#94A3B8" }}>
        {tab.icon}
      </span>
      {tab.label}
    </button>
  ))}
</div>
```

### 6.14 Horizontal Scrollable Carousel

```tsx
<div className="flex gap-3.5 overflow-x-auto pb-4
  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  {items.map((item, i) => (
    <div key={i} className="shrink-0 w-[185px]">
      {/* card content */}
    </div>
  ))}
</div>
```

### 6.15 Glass Floating Card (on dark/image bg)

Used for floating info panels on hero sections:

```tsx
<div
  className="absolute rounded-2xl overflow-hidden"
  style={{
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(201,168,76,0.22)",
    boxShadow: "0 12px 40px rgba(13,27,62,0.14), 0 2px 8px rgba(201,168,76,0.1)",
  }}
>
  {/* content */}
</div>
```

---

## 7. Animation System (Framer Motion)

### 7.1 TypeScript — Required Imports

Always import types from `framer-motion` to avoid TS errors:

```ts
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  type Variants,       // ← for animation variant objects
  type Transition,     // ← for transition config objects
  type MotionProps,    // ← if spreading onto motion elements
} from "framer-motion";
```

### 7.2 Standard Variants

Copy these exactly. All components use these as the base:

```ts
// Fade up — for individual elements
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// Stagger container — wraps groups of fadeUp children
const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

// Fade in (no vertical movement) — for overlays, images
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// Scale in — for badges, chips, emblem elements
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};
```

> **Critical TypeScript note:** Always type variant objects as `Variants`. The `ease` array `[0.22, 1, 0.36, 1]` must be cast `as const` or typed as `[number, number, number, number]` to satisfy TS — without this it errors as `number[]`.

### 7.3 Scroll-triggered Animation Pattern

Every section uses `useInView` to trigger animations on scroll. The `once: true` flag ensures they only fire on first view:

```tsx
"use client";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

export default function MySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section ref={ref}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        content
      </motion.div>
    </section>
  );
}
```

### 7.4 Stagger Group Pattern

```tsx
<motion.div
  variants={stagger}
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
  className="grid grid-cols-3 gap-4"
>
  {items.map((item, i) => (
    <motion.div key={i} variants={fadeUp} custom={i * 0.06}>
      {/* child content */}
    </motion.div>
  ))}
</motion.div>
```

### 7.5 Tab Panel Transition (AnimatePresence)

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }}
  >
    {panels[activeTab]}
  </motion.div>
</AnimatePresence>
```

### 7.6 Hover Card Lift

For cards with hover elevation, use inline style transitions rather than Tailwind's `hover:` — more reliable for boxShadow:

```tsx
<div
  className="rounded-2xl bg-white border transition-all duration-300"
  style={{ border: "1px solid rgba(0,0,0,0.07)" }}
  onMouseEnter={(e) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)";
    el.style.transform = "translateY(-4px)";
  }}
  onMouseLeave={(e) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
    el.style.transform = "translateY(0)";
  }}
>
```

### 7.7 Animated Progress Bar

```tsx
<div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: inView ? `${percentage}%` : 0 }}
    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
    className="h-full rounded-full"
    style={{ background: "linear-gradient(90deg, #C9A84C, #E8C96A)" }}
  />
</div>
```

### 7.8 Infinite Marquee (Carousel Row)

```tsx
const CarouselRow = ({
  items,
  direction = 1,
  speed = 40,
}: {
  items: ItemType[];
  direction?: 1 | -1;
  speed?: number;
}) => {
  const repeated = [...items, ...items, ...items];
  const totalWidth = items.length * 280; // card width + gap

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex gap-5"
        animate={{ x: direction === 1 ? [-totalWidth, 0] : [0, -totalWidth] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ width: `${repeated.length * 280}px` }}
      >
        {repeated.map((item, i) => (
          <Card key={`${item.id}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
};
```

### 7.9 Cycling Text (AnimatePresence word swap)

```tsx
const CyclingText = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="relative inline-block" style={{ minWidth: "160px" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] as const }}
          className="inline-block bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]
            bg-clip-text text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
```

### 7.10 Float Animation (for glassmorphism cards)

```tsx
<motion.div
  animate={{ y: [0, -7, 0] }}
  transition={{
    duration: 4.5,
    repeat: Infinity,
    ease: "easeInOut",
    delay: 0.8,
  }}
>
  {/* floating card content */}
</motion.div>
```

---

## 8. Shadow System

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-card` | `0 2px 10px rgba(0,0,0,0.06)` | Default card |
| `shadow-card-hover` | `0 16px 40px rgba(0,0,0,0.12)` | Card on hover |
| `shadow-dark` | `0 16px 48px rgba(13,27,62,0.2)` | Navy panels |
| `shadow-dark-hover` | `0 24px 64px rgba(13,27,62,0.3)` | Navy panels on hover |
| `shadow-gold` | `0 4px 20px rgba(201,168,76,0.45)` | Gold CTA button |
| `shadow-tab-active` | `0 4px 12px rgba(13,27,62,0.25)` | Active tab pill |

In Tailwind config:
```ts
boxShadow: {
  "card":       "0 2px 10px rgba(0,0,0,0.06)",
  "card-hover": "0 16px 40px rgba(0,0,0,0.12)",
  "dark":       "0 16px 48px rgba(13,27,62,0.2)",
  "gold-btn":   "0 4px 20px rgba(201,168,76,0.45)",
},
```

---

## 9. Iconography

**Icon library:** Lucide React exclusively.

| Usage | Size | Colour |
|-------|------|--------|
| In card headers | `size={17}` | `text-[#C9A84C]` or accent colour |
| In tabs | `size={15}` | `text-[#94A3B8]` (inactive) / `text-[#C9A84C]` (active) |
| In alert boxes | `size={14}` | alert type colour |
| In body / bullets | `size={11}–{13}` | `text-[#C9A84C]` or `text-slate-400` |
| CTA button arrows | `size={14}` | inherits button text colour |

Icon in a rounded container (standard pattern):
```tsx
<div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
  style={{ background: `${accent}18`, color: accent }}>
  <SomeIcon size={18} strokeWidth={1.5} />
</div>
```

---

## 10. Image Handling

- All images are from **Unsplash** with `?w=600&q=80&auto=format&fit=crop` params.
- University/campus images always have a gradient overlay: `bg-gradient-to-t from-black/55 to-transparent`
- Images inside cards use `object-cover object-center` with a fixed container height.
- Hover zoom: `transition-transform duration-500` with `scale(1.07)` on hover.
- Always add `draggable={false}` on `<img>` tags inside carousels.

```tsx
<div className="relative h-[110px] overflow-hidden">
  <img
    src={url}
    alt={alt}
    draggable={false}
    className="w-full h-full object-cover transition-transform duration-500"
    style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
</div>
```

---

## 11. Section Architecture Pattern

Every page section follows this structure:

```tsx
"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

// Motion variants defined at module level (outside component)
const fadeUp: Variants = { ... };
const stagger: Variants = { ... };

export default function SectionName() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F7F3EC]">
      {/* Dot grid texture */}
      <div className="absolute inset-0 pointer-events-none
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]" />

      {/* Gold ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">

        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <SectionLabel text="Label Text" />
          <h2 className="font-extrabold text-[#0D1B3E] tracking-tight text-[clamp(1.5rem,3vw,2.4rem)] mb-3">
            Heading with{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Gold phrase
            </span>
          </h2>
        </motion.div>

        {/* Section body */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* content */}
        </motion.div>

      </div>
    </section>
  );
}
```

---

## 12. Responsive Rules

| Breakpoint | Behaviour |
|-----------|-----------|
| `sm` (640px+) | 2-column grids unlock |
| `md` (768px+) | Floating cards visible, hero visual visible |
| `lg` (1024px+) | Full 2-column section layouts, sticky sidebars |
| `xl` (1280px+) | Max container width reached, content centres |

- Mobile: single column, reduced padding, simplified animations.
- Floating glass cards (`absolute` positioned): `hidden md:block` — hide on mobile.
- Carousels: always available on all screen sizes via horizontal scroll.
- Hero height: `height: 100vh; maxHeight: 820px; minHeight: 600px`.

### Mobile-First Layout Rules

- Reduce vertical padding on mobile. Prefer `py-8 md:py-12 lg:py-20`; do not use large desktop spacing such as `py-20` without a smaller mobile override.
- Reduce large gaps and margins on mobile. Prefer `gap-4 md:gap-6 lg:gap-8` and `mb-6 md:mb-10 lg:mb-14`.
- Centre-align hero and section-heading content on mobile using `text-center items-center`; restore editorial left alignment where appropriate with `md:text-left md:items-start`.
- Stack CTA buttons on narrow screens with `flex-col sm:flex-row`; use full-width mobile buttons where helpful with `w-full sm:w-auto`.
- Convert suitable card grids, chips, tabs, metadata strips, and related-content sections into horizontally scrollable rows on mobile to reduce excessive vertical scrolling.
- Use `overflow-x-auto`, hidden scrollbars, `snap-x snap-mandatory`, and `shrink-0 snap-start` cards for swipeable mobile rows.
- Restore standard grids at tablet or desktop breakpoints with `md:grid md:grid-cols-2` or `lg:grid-cols-3`.
- Do not force every section into a carousel. Keep forms, long text, FAQs, and comparison tables vertically readable.
- Keep horizontal scrolling contained inside the component. Never cause page-level horizontal overflow.
- Use compact mobile card widths such as `w-[82vw] max-w-[320px] sm:w-[280px]`.

### Responsive Mobile Carousel Pattern

```tsx
<div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory
  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
  md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
  {items.map((item) => (
    <div
      key={item.id}
      className="w-[82vw] max-w-[320px] shrink-0 snap-start md:w-auto md:max-w-none"
    >
      {/* card */}
    </div>
  ))}
</div>
```

---

## 13. Anti-Patterns — Never Do These

| ❌ Don't | ✅ Do instead |
|---------|--------------|
| Use serif fonts (Cormorant, Baskerville) | Use Poppins only |
| Use `style={{ fontFamily: ... }}` inline | Rely on global Poppins via body class |
| Use `bg-white` for page backgrounds | Use `bg-[#F7F3EC]` or `bg-[#FDFBF7]` |
| Use `blue-*` or `indigo-*` Tailwind colours | Use `#0D1B3E` navy only |
| Define `Variants` as plain objects | Always type as `const x: Variants = {...}` |
| Use `ease: [0.22,1,0.36,1]` without `as const` | Cast as `[0.22,1,0.36,1] as const` |
| Use `localStorage` or `sessionStorage` | Use React state |
| Nest `<form>` tags in React | Use `onClick`/`onChange` handlers |
| Use Tailwind `hover:shadow-*` for boxShadow | Use `onMouseEnter`/`onMouseLeave` inline style |
| Use `pages/` directory | Use `app/` directory (App Router) |
| Import fonts with `<link>` in HTML | Use `@import` in globals.css or `next/font` |
| Write animation variants inside component body | Define at module level to avoid re-creation |

---

## 14. File & Folder Structure

```
app/
  layout.tsx          ← Root layout with Poppins font
  page.tsx            ← Home page

components/
  ui/                 ← Reusable primitives
    SectionLabel.tsx
    AlertBox.tsx
    SectionCard.tsx
    BulletItem.tsx
    InfoChip.tsx
    DarkChip.tsx
    StatTile.tsx
  home/               ← Page-specific sections
    HomeHero.tsx
    TrustedUniversities.tsx
    LNATOverview/
      LNATOverview.tsx
      WhyLNATDifferent.tsx
      WhyStudentsChoose.tsx
      ExamSnapshot.tsx
      SkillVisualization.tsx
      LNATJourney.tsx
    LNATExamPattern.tsx

lib/
  motion.ts           ← Shared Variants (fadeUp, stagger, etc.)
  constants.ts        ← University data, colours, etc.

styles/
  globals.css         ← Poppins import + base resets
```

### `lib/motion.ts` — Single source of truth for variants

```ts
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
```

---

## 15. Quick Reference Cheatsheet

```
BACKGROUNDS
  Light page:     bg-[#F7F3EC]
  Light card:     bg-[#FDFBF7] or bg-white
  Dark section:   bg-[#0D1B3E]
  Dark gradient:  linear-gradient(135deg, #0A1628, #0D1B3E, #111D3C)

BORDERS
  Light card:     border border-black/[0.07]
  Gold accent:    border border-[#C9A84C]/20
  Dark card:      border border-[#C9A84C]/15

TEXT
  Primary (light bg):   text-[#0D1B3E]
  Muted (light bg):     text-slate-500
  Subtle:               text-slate-400
  On dark bg:           text-white
  On dark muted:        text-white/50
  Gold accent:          text-[#C9A84C]
  Gold dark:            text-[#8B6914]
  Gold gradient:        bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent

RADIUS
  Pills/chips:    rounded-full
  Small elements: rounded-xl  (12px)
  Cards:          rounded-2xl (16px)
  Large images:   rounded-3xl (24px)

ANIMATION EASING
  Standard:       [0.22, 1, 0.36, 1] as const
  Duration fast:  0.32s
  Duration mid:   0.65s
  Duration slow:  1.0–1.2s

FONT
  All text:       font-family: 'Poppins', sans-serif
  Headings:       font-extrabold (800)
  Subheadings:    font-bold (700)
  Body:           font-normal (400) or font-medium (500)
  Labels:         font-bold (700) + tracking-[0.18em] + uppercase
```

---

*Last updated: May 2026 · LNAT Exam India Design System v1.0*
