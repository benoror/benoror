import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next";
import PrintButton from '@/components/PrintButton';
import DownloadPDFButton from '@/components/DownloadPDFButton';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { Providers } from "@/components/providers"
// import { Analytics } from "@vercel/analytics/react";

import "@workspace/ui/globals.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Ben Orozco - Resume",
  description: "Resume of Ben Orozco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          {/* <Analytics /> */}
          <div className="print:hidden fixed top-1 right-1 flex gap-2">
            <DownloadPDFButton />
            <PrintButton />
            <ThemeToggleButton />
          </div>
        </Providers>
      </body>
    </html>
  )
}
