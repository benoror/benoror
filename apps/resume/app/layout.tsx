import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google"
import PrintButton from '@/components/PrintButton';
import DownloadPDFButton from '@/components/DownloadPDFButton';
import DownloadMarkdownButton from '@/components/DownloadMarkdownButton';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { Providers } from "@/components/providers"
import { LINKS } from "@workspace/data/personal";

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
  metadataBase: new URL(LINKS.resume.url),
  title: "Ben Orozco - Resume",
  description: "Resume of Ben Orozco",
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/resume.md",
      "application/pdf": "/Ben%20Orozco%20-%20Resume.pdf",
    },
  },
  openGraph: {
    type: "profile",
    url: LINKS.resume.url,
    title: "Ben Orozco - Resume",
    description: "Resume of Ben Orozco",
    siteName: "Ben Orozco Resume",
  },
  twitter: {
    card: "summary",
    title: "Ben Orozco - Resume",
    description: "Resume of Ben Orozco",
  },
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
          <div className="print:hidden fixed top-1 right-1 flex gap-2">
            <DownloadPDFButton />
            <PrintButton />
            <DownloadMarkdownButton />
            <ThemeToggleButton />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
