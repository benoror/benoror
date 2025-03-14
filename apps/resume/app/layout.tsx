import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next";
import PrintButton from '@/components/PrintButton';
import DownloadPDFButton from '@/components/DownlaodPDFButton';
// import { Analytics } from "@vercel/analytics/react";

import "@workspace/ui/globals.css"
// import { Providers } from "@/components/providers"

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
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        {/* <Providers>{children}</Providers> */}
        {children}
        {/* <Analytics /> */}
        <div className="print:hidden absolute top-1 left-1">
        </div>
        <div className="absolute top-1 right-1 flex gap-2">
          <DownloadPDFButton />
          <PrintButton />
        </div>
      </body>
    </html>
  )
}
