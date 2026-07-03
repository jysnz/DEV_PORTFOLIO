import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
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
  title: "Jayson Dela Cruz | Developer Portfolio",
  description:
    "A 4th-year information technology student. An aspiring full-stack developer and Philippine representative in the VEX Robotics World Championship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history)history.scrollRestoration='manual';window.scrollTo(0,0);`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body bg-bg-primary text-text-primary noise-overlay overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-contrast focus:rounded-full focus:font-bold"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
