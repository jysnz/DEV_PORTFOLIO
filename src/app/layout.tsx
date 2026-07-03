import type { Metadata } from "next";
import { Kalam, Inter, Patrick_Hand } from "next/font/google";
import { SketchDefs } from "@/components/sketch/SketchDefs";
import { PencilTrail } from "@/components/ui/PencilTrail";
import { SketchSelection } from "@/components/ui/SketchSelection";
import { ThemeInit } from "@/components/ui/ThemeInit";
import "./globals.css";

const kalam = Kalam({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-accent",
});

const siteTitle = "Jayson Dela Cruz | Developer Portfolio";
const siteDescription =
  "A 4th-year information technology student. An aspiring full-stack developer.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL in production so OG/Twitter image URLs resolve to the real domain.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaysontech.vercel.app"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Jayson Dela Cruz",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kalam.variable} ${inter.variable} ${patrickHand.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col font-body bg-paper-bg text-ink overflow-x-hidden">
        <ThemeInit />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-contrast focus:rounded-full focus:font-bold"
        >
          Skip to main content
        </a>

        <SketchDefs />

        {/* Paper grain texture — same asset for both themes, blend-mode flips per theme */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] mix-blend-multiply dark:opacity-[0.08] dark:mix-blend-screen"
          style={{ backgroundImage: "url('/textures/paper-grain.svg')", backgroundSize: "220px 220px" }}
        />
        {/* Faint graphite vignette in the corners for depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, color-mix(in srgb, var(--graphite-ink) 8%, transparent), transparent 35%), radial-gradient(circle at bottom right, color-mix(in srgb, var(--graphite-ink) 8%, transparent), transparent 35%)",
          }}
        />

        {children}
        <PencilTrail />
        <SketchSelection />
      </body>
    </html>
  );
}
