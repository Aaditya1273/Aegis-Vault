import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingOrb from "@/components/ui/FloatingOrb";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aegis-Vault | Self-Repaying Bitcoin Loans",
  description: "Mint aeUSD against sBTC collateral. Loans that pay themselves back using PoX rewards.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark bg-[#020202] text-foreground antialiased selection:bg-primary/30 min-h-screen relative`}>
        <div className="fixed inset-0 grid-background z-0 pointer-events-none" />
        <div className="fixed inset-0 noise-overlay z-[100] pointer-events-none" />
        <Navbar />
        <div className="relative z-10">
          {children}
        </div>
        <FloatingOrb />
      </body>
    </html>
  );
}
