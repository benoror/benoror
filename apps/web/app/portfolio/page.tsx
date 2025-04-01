"use client"

import { useState } from "react"
import { portfolioItems } from "@workspace/data/portfolio"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PortfolioSidebar from "@/components/portfolio/portfolio-sidebar"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import PortfolioDialog from "@/components/portfolio/portfolio-dialog"
import type { PortfolioItem } from "@workspace/data/portfolio"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<string>("projects")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const projects = portfolioItems.filter((item) => item.section === "projects")
  const publications = portfolioItems.filter((item) => item.section === "publications")
  const talks = portfolioItems.filter((item) => item.section === "talks")

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    // Scroll to section
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-black via-blue-950/30 to-black">
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <PortfolioSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          projects={projects}
          publications={publications}
          talks={talks}
          onItemClick={handleItemClick}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-16">
            <section id="projects" className="scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Projects</h2>
              <PortfolioGrid items={projects} onItemClick={handleItemClick} />
            </section>

            <section id="publications" className="scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Publications</h2>
              <PortfolioGrid items={publications} onItemClick={handleItemClick} />
            </section>

            <section id="talks" className="scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Talks</h2>
              <PortfolioGrid items={talks} onItemClick={handleItemClick} />
            </section>
          </div>
        </div>
      </div>

      {/* Detail Dialog */}
      <PortfolioDialog item={selectedItem} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

      <Footer />
    </main>
  )
}

