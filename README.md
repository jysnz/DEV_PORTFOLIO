# Jayson Dela Cruz — Developer Portfolio

A hand-drawn sketch-themed developer portfolio built with modern web technologies. Features a notebook/pencil aesthetic with rough.js-rendered borders, paper textures, and interactive animations.

**Live:** [jaysontech.vercel.app](https://jaysontech.vercel.app)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| Animations | Motion (Framer Motion), rough.js |
| 3D | Three.js, React Three Fiber |
| Maps | D3-geo, TopoJSON |
| Deployment | Vercel |

---

## Features

- **Sketch Theme** — Hand-drawn borders via rough.js, paper grain textures, pencil cursor, notebook ruled lines
- **Dark/Light Mode** — Theme toggle with localStorage persistence, CSS custom properties
- **Responsive** — Mobile-first design, stacks to single column below 1024px
- **Streaming** — Suspense boundaries with skeleton fallbacks for below-fold content
- **On-Demand Revalidation** — Supabase database webhooks invalidate cache only when data changes
- **Image Optimization** — Lazy loading with shimmer skeleton placeholders via BlurImage component
- **GitHub Contributions** — Live contribution graph fetched from GitHub GraphQL API
- **Interactive Globe** — D3-geo orthographic projection showing achievement locations
- **Draggable Card Stack** — Motion-powered photo stack in the hero section
- **Pencil Trail** — Canvas-based cursor trail effect
- **Sketch Selection** — Custom text selection with SVG rough.js highlight

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, theme, paper texture
│   ├── page.tsx                # Home page with Suspense streaming
│   ├── globals.css             # Tailwind theme, animations, notebook styles
│   └── api/revalidate/         # On-demand cache invalidation endpoint
├── components/
│   ├── ui/                     # Reusable UI (Button, BlurImage, Carousel, etc.)
│   ├── layout/                 # Navbar, Footer, Section
│   ├── sections/               # Page sections + Streamable wrappers
│   ├── cards/                  # ProjectCard, AchievementCard
│   ├── sketch/                 # SketchBorder, SketchDivider, CrossHatchOverlay
│   └── skeletons/              # Suspense fallback skeletons
├── hooks/
│   └── useRoughShape.ts        # Hook for rough.js SVG border rendering
├── lib/
│   ├── supabase.ts             # Supabase client with fetch caching
│   ├── queries.ts              # Data queries wrapped in React.cache()
│   ├── github.ts               # GitHub contributions GraphQL fetch
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
└── assets/icons/               # SVG icon components
```

---

## Performance Optimizations

### Caching Strategy

```
No data changes → Serve cached page indefinitely (0ms response)
Data changed → Supabase trigger → webhook → cache invalidated → next visitor gets fresh data
```

| Optimization | Implementation |
|---|---|
| **On-demand revalidation** | Page cache stays indefinitely until data changes |
| **React.cache()** | All queries deduplicated per render pass |
| **Suspense streaming** | Only navbar + hero block render; 8 sections stream independently |
| **Fetch caching** | Supabase responses cached at fetch level |
| **Database webhooks** | pg_net triggers on all content tables call revalidation endpoint |
| **BlurImage** | Lazy loading + shimmer skeleton + opacity fade-in |
| **next/image** | Automatic size optimization, format conversion |
| **next/font** | Zero layout shift, font-display: swap |

### Console Analytics

The app logs performance data to the server console:

```
┌─────────────────────────────────────────────────────┐
│           📊 PAGE RENDER ANALYTICS                  │
├─────────────────────────────────────────────────────┤
│ ✅ SERVING FROM CACHE — no data changes detected    │
├─────────────────────────────────────────────────────┤
│ 🟢 Critical path:           3.2ms              │
└─────────────────────────────────────────────────────┘

│ 🟢 [CACHED]  projects           2.1ms
│ 🟢 [CACHED]  techStack          1.8ms
│ 🟢 [CACHED]  achievements       1.5ms
```

When data is updated:

```
🔴 CACHE INVALIDATED | UPDATE on "projects" | 2026-07-04T06:04:45.480Z

┌─────────────────────────────────────────────────────┐
│           📊 PAGE RENDER ANALYTICS                  │
├─────────────────────────────────────────────────────┤
│ 🔄 FRESH FETCH — cache miss or invalidated          │
├─────────────────────────────────────────────────────┤
│ 🟡 Critical path:         320.5ms              │
└─────────────────────────────────────────────────────┘

│ 🔴 [FRESH]  projects         809.2ms  █████████████████████
│ 🟡 [FRESH]  techStack        459.3ms  ████████████
```

---

## Design System

- **Theme:** Notebook/sketch aesthetic with paper textures and pencil-drawn borders
- **Fonts:** Kalam (display/headings), Inter (body), Patrick Hand (accent)
- **Colors:** Paper backgrounds with graphite ink, red pencil accent
- **Borders:** rough.js hand-drawn SVG rectangles with hover emphasis
- **Cursors:** Custom pencil SVG cursors
- **Dark mode:** CSS custom properties swap all colors

---

## Getting Started

### Prerequisites

- Node.js 20+
- Supabase project (free tier works)
- GitHub personal access token (for contributions graph)

### Development

```bash
npm install
npm run dev
```

> Caching is disabled in dev mode. All fetches are fresh.

### Production (local test)

```bash
npm run build
npx next start
```

### Deploy

Push to GitHub → auto-deploys on Vercel.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## License

Private project. All rights reserved.
