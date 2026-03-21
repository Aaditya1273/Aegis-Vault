import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
    title: "Aegis Vault | Institutional Web3 Banking",
    description: "High-fidelity PoX-backed Bitcoin collateralized loans.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />
            </head>
            <body
                className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
