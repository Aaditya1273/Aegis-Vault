import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TargetCursor from "@/components/ui/TargetCursor";

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
      <body className={`${inter.className} dark bg-background text-foreground antialiased selection:bg-primary/30`}>
        <TargetCursor targetSelector=".cursor-target, .btn-primary, .glass, a, button" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
