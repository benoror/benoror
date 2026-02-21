"use client"

import { useState } from "react"
import { portfolioItems } from "@workspace/data/portfolio"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import OutrunGrid from "@/components/outrun-hero-background"
import { motion } from "framer-motion"
import { cn } from '@workspace/ui/lib/utils';
import { useAppTheme } from "@/hooks/use-app-theme"
import { pickBlueValue, pickThemeValue } from "@/lib/theme-styles"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"projects" | "publications" | "talks">("projects")
  const { isBlueDark, isOutrun, themeKind } = useAppTheme()
  const pageClass = pickThemeValue(themeKind, {
    outrun: "",
    dark: "bg-gradient-to-b from-slate-950 via-sky-950/20 to-slate-950",
    light: "bg-gradient-to-b from-white via-sky-50 to-blue-50",
  })
  const headingClass = pickBlueValue(isBlueDark, "text-sky-300", "text-sky-800")
  const tabBorderClass = pickBlueValue(isBlueDark, "border-cyan-400/25", "border-sky-200")
  const activeTabClass = pickBlueValue(isBlueDark, "text-sky-100", "text-sky-800")
  const inactiveTabClass = pickBlueValue(isBlueDark, "text-sky-400 hover:text-sky-200", "text-sky-500 hover:text-sky-700")
  const tabCountClass = pickBlueValue(isBlueDark, "bg-sky-800/60 px-1.5 py-0.5 rounded-full", "bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full")
  const tabIndicatorClass = pickBlueValue(isBlueDark, "bg-sky-500", "bg-sky-600")
  const pageContentClass = pickThemeValue(themeKind, {
    outrun: "rounded-3xl border border-cyan-400/25 bg-slate-950/45 backdrop-blur-xl shadow-[0_24px_80px_rgba(2,8,23,0.65)] p-5 md:p-8",
    dark: "rounded-3xl border border-sky-700/35 bg-slate-950/55 backdrop-blur-xl shadow-[0_24px_80px_rgba(2,8,23,0.55)] p-5 md:p-8",
    light: "rounded-3xl border border-sky-200/80 bg-white/80 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.10)] p-5 md:p-8",
  })
  const headingAccentClass = pickThemeValue(themeKind, {
    outrun: "drop-shadow-[0_0_22px_rgba(34,211,238,0.35)]",
    dark: "",
    light: "",
  })
  const activeTabShellClass = pickThemeValue(themeKind, {
    outrun: "rounded-t-xl rounded-b-none border border-cyan-400/35 bg-slate-950/70 backdrop-blur-md shadow-[0_8px_24px_rgba(34,211,238,0.16)]",
    dark: "rounded-t-xl rounded-b-none border border-sky-700/40 bg-sky-900/30",
    light: "rounded-t-xl rounded-b-none border border-sky-300 bg-white/85 shadow-sm",
  })

  const projects = portfolioItems.filter((item) => item.section === "projects")
  const publications = portfolioItems.filter((item) => item.section === "publications")
  const talks = portfolioItems.filter((item) => item.section === "talks")

  const tabs = [
    { id: "projects", label: "Projects", count: projects.length },
    { id: "talks", label: "Talks", count: talks.length },
    { id: "publications", label: "Publications", count: publications.length },
  ]

  return (
    <main className={`min-h-screen flex flex-col ${pageClass}`}>
      {isOutrun && <OutrunGrid />}
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className={pageContentClass}>
          <h3 className={`text-1xl md:text-5xl font-bold mb-8 hero-text text-center ${headingClass} ${headingAccentClass}`}>Portfolio</h3>
          {/* Tab Navigation */}
          <div className={`flex flex-wrap gap-1 border-b mb-8 overflow-x-auto pb-0 ${tabBorderClass}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "projects" | "publications" | "talks")}
                className={cn(
                  "px-4 md:px-6 py-3 text-sm md:text-lg font-medium transition-colors relative whitespace-nowrap cursor-pointer border border-transparent",
                  activeTab === tab.id ? `${activeTabClass} ${activeTabShellClass}` : inactiveTabClass,
                )}
              >
                {tab.label}
                <span className={`ml-2 text-xs md:text-sm ${tabCountClass}`}>{tab.count}</span>

                {activeTab === tab.id && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${tabIndicatorClass}`}
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
          <div className={`min-h-[50vh]`}>
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
      </div>

      <Footer />
    </main>
  )
}

