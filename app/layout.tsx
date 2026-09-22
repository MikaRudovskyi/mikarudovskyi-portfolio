import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import CyberCursor from "@/components/ui/CyberCursor";
import MatrixRain from "@/components/ui/MatrixRain";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--display-font",
  weight: ["500", "600", "700"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--body-font",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--data-font",
  weight: ["400", "500"],
});

const SITE_URL = "https://mykhailorudovskyi.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mykhailo Rudovskyi - Portfolio",
  description:
    "Portfolio of Mykhailo Rudovskyi — Full-Stack Engineer and Support Engineer with a background in backend development, APIs, software architecture and telecommunications (SIP, RTP, SMPP, VoIP).",
  openGraph: {
    title: "Mykhailo Rudovskyi — Full-Stack Engineer | Support Engineer | Telecom",
    description:
      "Full-Stack Engineer and Support Engineer building production-ready web applications and working with real telecom systems.",
    url: SITE_URL,
    siteName: "Mykhailo Rudovskyi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mykhailo Rudovskyi — Full-Stack Engineer | Support Engineer | Telecom",
    description:
      "Full-Stack Engineer and Support Engineer building production-ready web applications and working with real telecom systems.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans bg-bg text-text antialiased cursor-none">
        {children}
        <div className="crt-lines" />
        <CyberCursor />
      </body>
    </html>
  );
}