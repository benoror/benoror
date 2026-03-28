import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | Ben Orozco",
  description: "Selected projects, publications, and talks by Ben Orozco.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    url: "/portfolio",
    title: "Portfolio | Ben Orozco",
    description: "Selected projects, publications, and talks by Ben Orozco.",
  },
  twitter: {
    card: "summary",
    title: "Portfolio | Ben Orozco",
    description: "Selected projects, publications, and talks by Ben Orozco.",
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
