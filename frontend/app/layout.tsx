import type { Metadata } from "next";
import { Newsreader, DM_Sans } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const newsreader = Newsreader({ 
  subsets: ["latin"],
  variable: '--font-newsreader',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Socratic Reflection Engine",
  description:
    "AI-powered guided reflection for constructionist learners. GSoC 2026 prototype for Sugar Labs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased text-editorial-text bg-editorial-bg">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
