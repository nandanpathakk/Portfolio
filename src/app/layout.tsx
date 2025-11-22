import type { Metadata } from "next";
import "./globals.css";
import { Syne, JetBrains_Mono, Inter, Playfair_Display, Kalam, Rajdhani, Teko } from "next/font/google";
import { ReactLenis } from "@/lib/lenis";
import ScrollToTop from "@/components/ScrollToTop";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-elegant" });
const kalam = Kalam({ subsets: ["devanagari", "latin"], weight: ["400", "700"], variable: "--font-hindi" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-rajdhani" });
const teko = Teko({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-teko" });

export const metadata: Metadata = {
  title: "Nandan Pathak | Developer",
  description: "A journey into my world of frontend development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-background text-foreground ${syne.variable} ${jetbrains.variable} ${inter.variable} ${playfair.variable} ${kalam.variable} ${rajdhani.variable} ${teko.variable} font-sans antialiased overflow-x-hidden`}>
        <ReactLenis root>
          <ScrollToTop />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}