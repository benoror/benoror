"use client"

import { useState } from "react"
import { portfolioItems } from "@workspace/data/portfolio"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import { motion } from "framer-motion"
import { cn } from '@workspace/ui/lib/utils';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"projects" | "publications" | "talks">("projects")

  const projects = portfolioItems.filter((item) => item.section === "projects")
  const publications = portfolioItems.filter((item) => item.section === "publications")
  const talks = portfolioItems.filter((item) => item.section === "talks")

  const tabs = [
    { id: "projects", label: "Projects", count: projects.length },
    { id: "talks", label: "Talks", count: talks.length },
    { id: "publications", label: "Publications", count: publications.length },
  ]

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-black via-sky-950/10 to-black">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <h3 className="text-1xl md:text-5xl font-bold mb-8 hero-text text-center text-sky-300">Portfolio</h3>
        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-sky-700/30 mb-8 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "projects" | "publications" | "talks")}
              className={cn(
                "px-4 md:px-6 py-3 text-sm md:text-lg font-medium transition-colors relative whitespace-nowrap cursor-pointer",
                activeTab === tab.id ? "text-sky-100" : "text-sky-400 hover:text-sky-200",
              )}
            >
              {tab.label}
              <span className="ml-2 text-xs md:text-sm bg-sky-800/60 px-1.5 py-0.5 rounded-full">{tab.count}</span>

              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500"
                  layoutId="activeTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="min-h-[50vh]">
          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              key="projects"
            >
              <PortfolioGrid items={projects} />
            </motion.div>
          )}

          {activeTab === "publications" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              key="publications"
            >
              <PortfolioGrid items={publications} />
            </motion.div>
          )}

          {activeTab === "talks" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              key="talks"
            >
              <PortfolioGrid items={talks} />
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

