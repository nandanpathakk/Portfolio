import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}