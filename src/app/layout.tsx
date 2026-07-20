import type { Metadata } from "next";
import { Anton, Caveat, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin", "vietnamese"],
  weight: "400",
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

export const metadata: Metadata = {
  metadataBase: new URL("https://vy-nguyen-portfolio.local"),
  title: "Nguyễn Ngọc Tường Vy — Fresher Planner",
  description:
    "Portfolio của Nguyễn Ngọc Tường Vy — Junior Strategic Planner. Một planner tin rằng ý tưởng chỉ thuyết phục khi đứng trên sự thật được đọc đúng.",
  keywords: [
    "Nguyễn Ngọc Tường Vy",
    "Strategic Planner",
    "Junior Planner",
    "Planning Intern",
    "FPT Online",
    "Portfolio",
    "Business Analytics",
  ],
  authors: [{ name: "Nguyễn Ngọc Tường Vy" }],
  creator: "Nguyễn Ngọc Tường Vy",
  openGraph: {
    title: "Nguyễn Ngọc Tường Vy — Junior Strategic Planner",
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
        alt: "Nguyễn Ngọc Tường Vy — Junior Strategic Planner Portfolio",
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
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
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
        className={`${anton.variable} ${caveat.variable} ${dancingScript.variable} ${inter.variable} antialiased bg-ocean text-offwhite font-sans selection:bg-teal selection:text-ocean`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
