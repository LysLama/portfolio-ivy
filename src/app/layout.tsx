import type { Metadata } from "next";
import { Anton, Caveat, Dancing_Script, Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin", "vietnamese"],
  weight: "400",
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Absolute URLs for OG/Twitter images. Vercel injects the production domain,
// so this resolves correctly on deploy without hard-coding it; override with
// NEXT_PUBLIC_SITE_URL once a custom domain is attached.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nguyễn Ngọc Tường Vy — Fresher Planner",
  description:
    "Portfolio của Nguyễn Ngọc Tường Vy — Fresher Strategic Planner. Một planner tin rằng ý tưởng chỉ thuyết phục khi đứng trên sự thật được đọc đúng.",
  keywords: [
    "Nguyễn Ngọc Tường Vy",
    "Strategic Planner",
    "Fresher Planner",
    "Planning Intern",
    "FPT Online",
    "Portfolio",
    "Business Analytics",
  ],
  authors: [{ name: "Nguyễn Ngọc Tường Vy" }],
  creator: "Nguyễn Ngọc Tường Vy",
  openGraph: {
    title: "Nguyễn Ngọc Tường Vy — Fresher Strategic Planner",
    description:
      "Portfolio — một planner tin rằng ý tưởng chỉ thuyết phục khi đứng trên sự thật được đọc đúng. Data là cách mình đi tìm sự thật đó.",
    type: "website",
    locale: "vi_VN",
    siteName: "Vy Nguyen · Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nguyễn Ngọc Tường Vy — Fresher Strategic Planner Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Ngọc Tường Vy — Fresher Planner",
    description:
      "Portfolio — một planner tin rằng ý tưởng chỉ thuyết phục khi đứng trên sự thật được đọc đúng.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body
        suppressHydrationWarning
        className={`${anton.variable} ${oswald.variable} ${caveat.variable} ${dancingScript.variable} ${inter.variable} antialiased bg-ocean text-offwhite font-sans selection:bg-teal selection:text-ocean`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
