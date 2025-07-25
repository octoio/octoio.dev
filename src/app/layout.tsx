import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fira_Code } from "next/font/google";
import SearchProvider from "@/components/SearchProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  title: "Octoio | Game Development & Creative Projects",
  description:
    "Octoio's portfolio - Game development, creative projects, and technical exploration. From OCaml data pipelines to Unity games.",
  keywords: [
    "game development",
    "ocaml",
    "typescript",
    "unity",
    "react",
    "creative projects",
    "Octoio",
  ],
  authors: [{ name: "Octoio", url: "https://octoio.dev" }],
  creator: "Octoio",
  publisher: "Octoio",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Octoio",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable}`}
      >
        {children}
        <SearchProvider />
      </body>
    </html>
  );
}
