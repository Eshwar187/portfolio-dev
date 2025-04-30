import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import BasicCursorWrapper from "../components/BasicCursorWrapper";
import PageTransition from "../components/PageTransition";
import AnimatedBackground from "../components/AnimatedBackground";
import LoadingScreen from "../components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "J Eshwar | Full-Stack Developer",
  description: "Portfolio of J Eshwar, a Full-Stack MERN Developer specializing in React, Node.js, MongoDB, Express.js, and PostgreSQL",
  icons: {
    icon: [
      { url: '/favicon.svg' },
    ],
    apple: [
      { url: '/favicon.svg' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#8A2BE2',
  openGraph: {
    title: "J Eshwar | Full-Stack Developer",
    description: "Portfolio of J Eshwar, a Full-Stack MERN Developer specializing in React, Node.js, MongoDB, Express.js, and PostgreSQL",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'J Eshwar Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "J Eshwar | Full-Stack Developer",
    description: "Portfolio of J Eshwar, a Full-Stack MERN Developer specializing in React, Node.js, MongoDB, Express.js, and PostgreSQL",
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        <LoadingScreen>
          <div className="stars-container fixed inset-0 z-[-1]">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
          </div>
          <AnimatedBackground />
          <Navigation />
          <BasicCursorWrapper />
          <main className="pt-24">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </LoadingScreen>
      </body>
    </html>
  );
}
