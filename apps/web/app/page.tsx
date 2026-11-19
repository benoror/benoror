import Navbar from "@/components/navbar"
import Hero from "@/components/home/hero"
import About from "@/components/home/about"
import FeedExcerpt from "@/components/home/feed-excerpt"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const revalidate = 1800

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Ben Orozco | Engineering Leader & Builder",
    description: "Personal website of Ben Orozco - Engineering Leader, VP Engineering & CTO, and Founder",
  },
  twitter: {
    card: "summary",
    title: "Ben Orozco | Engineering Leader & Builder",
    description: "Personal website of Ben Orozco - Engineering Leader, VP Engineering & CTO, and Founder",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <FeedExcerpt />
      <Footer />
    </main>
  )
}
