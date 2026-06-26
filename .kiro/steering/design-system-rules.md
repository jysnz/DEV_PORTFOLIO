---
inclusion: always
---

# Portfolio Design System

Tech stack: Next.js 15, React 19, TypeScript, Tailwind CSS 4.

## Critical Rules

- Background is ALWAYS `bg-bg-primary` (#1E0031). Never use pure black.
- Never hardcode hex colors. Use Tailwind token classes (e.g., `bg-bg-card`, `text-text-secondary`).
- Only two font families: `font-display` (Bebas Neue) for headings, `font-body` (Manrope) for everything else.
- All buttons and pills use `rounded-full`.
- Cards use `bg-bg-card` with `rounded-md` (12px).
- Form inputs use `bg-bg-input` with `rounded-sm` (4px).
- Section dividers: full-width `border-t border-border`.
- Accent `#C3B1FF` is only for CTAs, links, and highlights.
- Mobile-first responsive design.
- Semantic HTML with proper heading hierarchy.
- `'use client'` only when interactivity is required.

## Tailwind CSS 4 Theme (globals.css)

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #1E0031;
  --color-bg-card: #1A1A1A;
  --color-bg-input: #1A1A1A;
  --color-bg-icon: #222222;
  --color-bg-tag: #0A0A0A;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #C7C7C7;
  --color-text-dark: #0A0A0A;
  --color-accent: #C3B1FF;
  --color-border: #484848;
  --font-display: "Bebas Neue", cursive;
  --font-body: "Manrope", sans-serif;
  --radius-sm: 4px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
}
```

## Typography Scale

| Token | Font | Size | Weight | Line-height | Notes |
|-------|------|------|--------|-------------|-------|
| Heading/One | Bebas Neue | 101px | 400 | 0.9 | Hero heading |
| Heading/Two | Bebas Neue | 76px | 400 | 1.0 | Section titles |
| Heading/Three | Manrope | 32px | 500 | 1.4 | Card/project titles |
| Heading/Four | Manrope | 24px | 500 | 1.3 | Experience titles |
| Heading/Five | Manrope | 16px | 600 | 1.5 | Labels, uppercase |
| Body/Medium | Manrope | 18px | 400 | 1.5 | Paragraphs |
| Body/Small | Manrope | 16px | 500 | 1.6 | Form labels, nav |
| Misc/Button | Manrope | 16px | 700 | 1.0 | Uppercase |
| Misc/Link | Manrope | 16px | 700 | 1.5 | Uppercase, accent |
| Misc/Tag | Manrope | 14px | 500 | 1.5 | Project tags |

Responsive scale: mobile h1=48px h2=40px, tablet h1=72px h2=56px, desktop h1=101px h2=76px.

## Spacing

8px grid. Key values: section padding `py-20` (80px), content padding `px-[108px]`, nav padding `px-[60px]`, section gap 80–120px, card gap 48px, form field gap 24px.

## Layout

- Max page width: 1440px. Content width: 1224px (108px padding each side).
- Sections use a two-column flex layout: left (title) + right (content), `gap-6`.
- Project cards: image 600px + content flex-1, `gap-12`.
- Hero: text left (max-w 544px) + image positioned right.
- Stack to single column below `lg` (1024px).

## Breakpoints

- `sm`: 640px — minor adjustments
- `md`: 768px — tablet, reduce padding
- `lg`: 1024px — desktop two-column layouts
- `xl`: 1440px — full design width

## Component Architecture

### File structure

```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   └── about/page.tsx
├── components/
│   ├── ui/        (Button, IconButton, LinkButton, SkillChip, ProjectTag, FormInput)
│   ├── layout/    (Navbar, Footer, Section)
│   ├── sections/  (Hero, Projects, About, Skills, Experience, Contact)
│   └── cards/     (ProjectCard, ExperienceCard)
├── lib/           (types.ts, data.ts)
└── assets/icons/
```

### Conventions

- Named exports for reusable components. Default export for page components.
- All components accept `className?: string` for composition.
- Props interfaces named `ComponentNameProps`, defined above component.
- Use `cn()` utility (clsx + tailwind-merge) for class merging.
- Data-driven: project/experience content lives in `lib/data.ts`.
- Server Components by default. Mark `'use client'` only for forms, mobile nav toggle.

### Font loading (layout.tsx)

```typescript
import { Bebas_Neue, Manrope } from "next/font/google";
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });
// Apply: <body className={`${bebasNeue.variable} ${manrope.variable} font-body`}>
```

## Component Specs

### Button variants

| Variant | BG | Text | Padding | Extra |
|---------|-----|------|---------|-------|
| primary | accent | text-dark | pl-6 pr-1.5 py-5 | Trailing 42px circle w/ arrow |
| submit | accent | text-dark | px-10 py-5 | No icon |
| icon | bg-icon | — | centered 54px | 26px icon |
| link | transparent | accent | none | Underline + trailing icon |

All buttons: h-[54px], rounded-full, font-bold uppercase text-base.

### Skill Chip

`border border-border rounded-full px-10 py-5 text-text-primary font-bold uppercase text-base`. Hover: `hover:border-accent`.

### Project Card

Horizontal flex (stacks vertical on mobile). Left: 600px square bg-bg-card rounded-md, image centered. Right: title (h3, Heading/Three), description (Body/Medium, text-secondary), project info list (border-t rows), link buttons.

### Contact Form

Two-column: left has heading (Heading/Two), email, social icons, copyright. Right has form fields (label + input stacked, gap-2 within, gap-6 between) + submit button.

Input: `bg-bg-input rounded-sm px-4 py-3 text-lg text-text-primary font-body`. Label: `text-text-secondary text-base font-medium`.

## Accessibility

- Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- `aria-label` on icon-only links and nav.
- `<label>` elements associated with form inputs.
- Focus ring: `focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2`.
- Skip-nav link.
- `prefers-reduced-motion` respected on transitions.
- Proper alt text on meaningful images; `alt=""` on decorative ones.

## Animations

Subtle transitions only:
- Buttons: `transition-opacity duration-150 hover:opacity-90`
- Links: `transition-colors duration-150 hover:text-accent`
- Cards: `transition-transform duration-300 hover:scale-[1.02]`
- Chips: `transition-colors duration-200 hover:border-accent`

## Performance

- `next/image` for all images with explicit dimensions.
- React Server Components by default (static site, no dynamic data).
- Lazy load below-fold images.
- Font `display: swap` via next/font.
