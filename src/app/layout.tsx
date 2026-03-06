import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono, Inter, Playfair_Display, Kalam, Teko } from "next/font/google";
import { ReactLenis } from "@/lib/lenis";
import ScrollReset from "@/components/ScrollReset";
import Nav from "@/components/Nav";
import { PortfolioAssistant } from "@/components/PortfolioAssistant";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-elegant" });
const kalam = Kalam({ subsets: ["devanagari", "latin"], weight: ["400", "700"], variable: "--font-hindi" });
const teko = Teko({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-teko" });

export const metadata: Metadata = {
  title: "Nandan Pathak | Developer",
  description: "Developer who builds things — web, mobile, APIs, and AI-assisted workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-background text-foreground ${jetbrains.variable} ${inter.variable} ${playfair.variable} ${kalam.variable} ${teko.variable} font-sans antialiased overflow-x-hidden`}>
        <ScrollReset />
        <Nav />
        <ReactLenis root>
          {children}
        </ReactLenis>
        <PortfolioAssistant />
      </body>
    </html>
  );
}