import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AtmosphericLayer from "@/components/ui/AtmosphericLayer";
import OrbWidget from "@/components/ui/OrbWidget";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { StacksProvider } from "@/components/providers/StacksProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
    weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Aegis Vault | Institutional Web3 Banking",
    description: "Secure your digital assets with institutional-grade Bitcoin native finance.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark relative" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                />
            </head>
            <body
                className={`${plusJakartaSans.variable} ${inter.variable} antialiased bg-black relative min-h-screen text-on-surface`}
                suppressHydrationWarning
            >
                <StacksProvider>
                    <SmoothScroll>
                        <div className="noise-overlay" />
                        <AtmosphericLayer />
                        {children}
                        <OrbWidget />
                    </SmoothScroll>
                </StacksProvider>
            </body>
        </html>
    );
}
