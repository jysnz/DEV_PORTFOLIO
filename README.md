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
Data inserted/updated/deleted → Supabase trigger → webhook → cache invalidated → next visitor gets fresh data
```

| Optimization | Implementation |
|---|---|
| **ISR with on-demand revalidation** | `revalidate = false` + `/api/revalidate` endpoint |
| **React.cache()** | All Supabase queries deduplicated per render pass |
| **Suspense streaming** | Only navbar + hero block render; 8 sections stream independently |
| **fetch force-cache** | Supabase responses cached at fetch level |
| **Database webhooks** | pg_net triggers on all 13 tables call revalidation endpoint |
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

---

## Database Schema

All content is stored in Supabase PostgreSQL:

| Table | Description |
|-------|-------------|
| `site_config` | Site name, title, subtitle, email |
| `nav_links` | Navigation links with sort order |
| `social_links` | LinkedIn, GitHub links |
| `projects` | Portfolio projects |
| `project_info` | Key-value project details |
| `project_links` | Demo/GitHub links per project |
| `project_repositories` | Multiple repo links per project |
| `project_tech_stack` | Many-to-many project ↔ tech |
| `tech_stack` | Technologies with categories and icons |
| `achievements` | Awards with locations (lat/lng) |
| `certifications` | Certs with issuer and credentials |
| `publications` | Research papers with DOI/tags |
| `recommendations` | Testimonials with avatars |
| `revalidation_config` | Site URL + secret for webhooks |

### On-Demand Revalidation Flow

```sql
-- Trigger on every content table:
INSERT/UPDATE/DELETE on any table
  → notify_cache_invalidation() fires
  → pg_net sends POST to {site_url}/api/revalidate
  → Next.js invalidates page cache
  → Next visitor gets fresh data
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Supabase project (free tier works)
- GitHub personal access token (for contributions graph)

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GITHUB_TOKEN=your_github_pat
GITHUB_USERNAME=your_github_username
REVALIDATION_SECRET=your_random_secret_string
```

### Development

```bash
npm install
npm run dev
```

> Note: Caching is disabled in dev mode. All fetches are fresh.

### Production (local test)

```bash
npm run build
npx next start
```

### Deploy

Push to GitHub → auto-deploys on Vercel.

### Configure Webhooks

After deploying, run in Supabase SQL Editor:

```sql
UPDATE revalidation_config
SET site_url = 'https://your-domain.vercel.app',
    revalidation_secret = 'your-REVALIDATION_SECRET-value'
WHERE id = 1;
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
