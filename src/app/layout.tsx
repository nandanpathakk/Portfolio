import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "@/lib/fonts";


export const metadata: Metadata = {
  title: "Nandan Pathak | Frontend Explorer",
  description: "A journey into my world of frontend development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-black text-white press-start-2p-regular ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}