"use client"

import { portfolioItems } from "@workspace/data/portfolio"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"

export default function Portfolio() {
  const projects = portfolioItems.filter((item) => item.section === "projects")
  const publications = portfolioItems.filter((item) => item.section === "publications")
  const talks = portfolioItems.filter((item) => item.section === "talks")

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-black via-sky-950/10 to-black">
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-16">
            <section id="projects" className="scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Projects</h2>
              <PortfolioGrid items={projects} />
            </section>

            <section id="publications" className="scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Publications</h2>
              <PortfolioGrid items={publications} />
            </section>

            <section id="talks" className="scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Talks</h2>
              <PortfolioGrid items={talks} />
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

