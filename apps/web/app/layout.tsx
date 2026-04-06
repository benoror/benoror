import ChatbotUI from "@/components/chatbot/chatbot-ui"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { LINKS } from "@workspace/data/personal"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(LINKS.website.url),
  title: "Ben Orozco | Full-stack Developer",
  description: "Personal website of Ben Orozco - Full-stack Developer, Leader, and Technologist",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/feed.rss", title: "RSS Feed" },
        { url: "/feed.xml", title: "RSS Feed (XML)" },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: LINKS.website.url,
    title: "Ben Orozco | Full-stack Developer",
    description: "Personal website of Ben Orozco - Full-stack Developer, Leader, and Technologist",
    siteName: "Ben Orozco",
  },
  twitter: {
    card: "summary",
    title: "Ben Orozco | Full-stack Developer",
    description: "Personal website of Ben Orozco - Full-stack Developer, Leader, and Technologist",
  },
}

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
        <Providers>
          {children}
          <ChatbotUI />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
