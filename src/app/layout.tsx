import type { Metadata } from "next";
import "./globals.css";
import { Syne, JetBrains_Mono, Inter } from "next/font/google";
import { ReactLenis } from "@/lib/lenis";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
      <body className={`bg-background text-foreground ${syne.variable} ${jetbrains.variable} ${inter.variable} font-sans antialiased`}>
        <ReactLenis root>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}