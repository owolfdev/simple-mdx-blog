import type { Metadata } from "next";
import Navbar from "@/components/navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next Blog",
  description: "Next.js static mdx blog starter template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body>
        <Navbar />
        <main className="py-8 sm:py-20 max-w-3xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
