import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SeatSweep — Kill ghost seats and zombie SaaS subscriptions",
  description:
    "SeatSweep scans your SaaS admin panels weekly to find ghost seats, inactive licenses, and forgotten subscriptions. Guaranteed savings — or it's free.",
  metadataBase: new URL("https://seatsweep.com"),
  openGraph: {
    title: "SeatSweep — Kill ghost seats and zombie SaaS",
    description:
      "Find the seats of people who quit. Stop paying for licenses no one uses. Average $4,800 saved per 10 employees.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
