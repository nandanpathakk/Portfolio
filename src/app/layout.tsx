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
      <body className="bg-black text-white roboto-regular">
        {children}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500/30 border border-green-500 text-white text-sm px-4 py-1 rounded-full shadow-md">
          🚧 This portfolio is still under development. Stay tuned! 🚀
        </div>

      </body>
    </html>
  );
}