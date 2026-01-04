# Flustre - AI Communication Landing Page

A modern, interactive landing page for an enterprise-grade AI communication platform. Built with Next.js, featuring stunning visual effects including custom cursor interactions, portal transitions, and dynamic scroll animations.

## ✨ Features

### 🎨 Visual Effects
- **Custom Cursor System** - Interactive cursor with corner brackets that snap to elements
- **Portal Mask Effect** - Dynamic circular mask that follows cursor and expands on scroll
- **Glass Morphism** - Subtle backdrop blur and gradient effects throughout
- **Hover Animations** - Cards desaturate when idle, illuminate on hover with radial gradients
- **Portal Navigation** - Smooth portal expansion transition when navigating between pages
- **Particle Background** - Dynamic pixel snow effect for atmospheric depth

### 🧩 Components
- **Bento Grid Layout** - Showcase features in an elegant, asymmetric grid
- **Audio Visualizer** - Animated wave bars for emotional nuance feature
- **Scrolling Testimonials** - Three-row marquee with professional testimonial cards
- **Responsive Header** - Adaptive navigation with scroll-triggered styling
- **Professional Footer** - Comprehensive footer with wavy underlines on hover

### 🔧 Technical Features
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- GSAP for smooth animations
- Framer Motion for advanced interactions
- Custom hooks for scroll and mouse tracking
- Optimized for 60fps performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
saas-landing-page/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── contact/
│       └── page.tsx          # Contact page
├── components/
│   ├── TargetCursor.tsx      # Custom cursor component
│   ├── PixelSnow.tsx         # Particle background
│   ├── Galaxy.jsx            # Galaxy effect
│   ├── animata/
│   │   ├── bento-grid/
│   │   │   └── eight.tsx     # Feature bento grid
│   │   ├── container/
│   │   │   └── scrolling-testimonials.tsx
│   │   └── text/
│   │       └── cycle-text.tsx
│   └── ui/
│       └── marquee.tsx       # Marquee base component
└── lib/
    └── utils.ts              # Utility functions
```

## 🎯 Key Components

### TargetCursor
Interactive custom cursor with corner brackets that track mouse movement and snap to elements with the `cursor-target` class.

**Usage:**
```tsx
<TargetCursor 
  spinDuration={2}
  hideDefaultCursor={true}
  parallaxOn={true}
/>

// Add cursor-target class to any element
<button className="cursor-target">Hover me</button>
```

### Portal Transition
Smooth page transition effect that expands from the cursor position.

**Features:**
- Expands existing scroll portal mask
- Animates glass rim border
- 60fps GSAP animation
- Triggers on button click

### Bento Grid
Asymmetric grid layout showcasing 7 different feature cards with unique animations:
- Emotional Nuance (2x2) - Wave visualizer
- Zero-Lag Synapse (2x1) - Animated lines
- Ghost Privacy (1x1) - Spinning dashed ring
- 92 Dialects (1x1) - Language tags
- Tone Mirroring (1x1) - Gradient background
- Natural Breathing (1x1) - Pulsating glow
- Deep Context Memory (2x1) - Memory bars

## 🎨 Customization

### Colors
Main brand colors are defined throughout the codebase:
- Primary: `indigo-500/600`
- Accent: `orange-500`
- Background: `#05050a`
- Text: `white` with various opacity levels

### Cursor Settings
Modify cursor behavior in `TargetCursor.tsx`:
```tsx
spinDuration={2}        // Rotation speed when idle
hideDefaultCursor={true} // Hide default cursor
parallaxOn={true}       // Enable parallax effect
```

### Portal Settings
Adjust portal expansion in `page.tsx`:
```tsx
const portalRadius = 280 + scrollProgress * 2220; // Initial to max size
```

## 🌟 Effects Breakdown

### Scroll Portal Effect
The portal mask creates a "looking through" effect:
1. Starts at 280px radius
2. Expands to 2500px as user scrolls
3. Follows cursor with smooth interpolation
4. Glass rim border scales with portal

### Hover Effects
Cards and testimonials use a consistent hover pattern:
1. Desaturated/dimmed when idle (grayscale + brightness filters)
2. Full color on hover with smooth transition
3. Radial gradient glow follows mouse position
4. Border animates from white/10 to colored gradient

## 🔧 Performance Optimizations

- **RequestAnimationFrame** for smooth cursor tracking
- **GSAP** for hardware-accelerated animations
- **will-change** CSS property for animated elements
- **Threshold-based updates** to prevent excessive re-renders
- **GPU-accelerated transforms** for all animations

## 📦 Dependencies

### Core
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### Animation & Effects
- `gsap` - Animation engine
- `framer-motion` - React animation library

### Styling
- `tailwindcss` - Utility-first CSS
- `@tailwindcss/typography` - Typography plugin
- `tailwind-merge` - Utility for merging Tailwind classes
- `clsx` - Conditional class names

### Icons
- `lucide-react` - Icon library

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Built with ❤️ using Next.js and modern web technologies
