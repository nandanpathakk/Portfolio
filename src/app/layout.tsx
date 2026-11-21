import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactLenis } from "@/lib/lenis";
import ScrollManager from "@/components/ScrollManager";
import Nav from "@/components/Nav";
import { PortfolioAssistant } from "@/components/PortfolioAssistant";
import Analytics from "@/components/Analytics";

// Anek is one family drawn for both Latin and Devanagari, so the name can sit
// in both scripts without changing voice. Files live in ./fonts (SIL OFL).
const anek = localFont({
  src: "./fonts/AnekLatin.woff2",
  variable: "--font-anek",
  weight: "100 800",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});
// Subset to the glyphs in "नंदन पाठक" — it is only ever used for the name.
const anekDeva = localFont({
  src: "./fonts/AnekDevanagari-name.woff2",
  variable: "--font-anek-deva",
  weight: "100 800",
  display: "swap",
  preload: false,
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});
const newsreader = localFont({
  src: [
    { path: "./fonts/Newsreader.woff2", style: "normal" },
    { path: "./fonts/Newsreader-Italic.woff2", style: "italic" },
  ],
  variable: "--font-newsreader",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nandanpathak.vercel.app"),
  title: "Nandan Pathak, developer who likes the product side",
  description:
    "Nandan Pathak is a developer. He builds web and mobile products and writes up the decisions behind them. Open to developer and product management roles.",
  icons: {
    icon: "/images/favicon.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#121016",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anek.variable} ${anekDeva.variable} ${newsreader.variable}`}>
      <body className="overflow-x-hidden">
        {/* Before anything paints: stop the browser restoring an old scroll position on refresh. */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual'" }} />
        <Nav />
        <ReactLenis root>
          <ScrollManager />
          {children}
        </ReactLenis>
        <PortfolioAssistant />
        <Analytics />
      </body>
    </html>
  );
}
