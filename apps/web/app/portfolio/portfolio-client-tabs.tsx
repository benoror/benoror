"use client"

import { useState } from "react"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import OutrunGrid from "@/components/outrun-hero-background"
import { motion } from "framer-motion"
import { useAppTheme } from "@/hooks/use-app-theme"
import { getClasses } from "./portfolio-page.theme"

interface PortfolioClientTabsProps {
  projects: any[]; // Adjust types as per your actual portfolio item structure
  publications: any[];
  talks: any[];
}

export default function PortfolioClientTabs({ projects, publications, talks }: PortfolioClientTabsProps) {
  const { themeKind } = useAppTheme()
  const classes = getClasses(themeKind)
  const [activeTab, setActiveTab] = useState<"projects" | "publications" | "talks">("projects")

  const tabs = [
    { id: "projects", label: "Projects", count: projects.length },
    { id: "talks", label: "Talks", count: talks.length },
    { id: "publications", label: "Publications", count: publications.length },
  ]

  return (
    <>
      {classes.showOutrunGrid && <OutrunGrid />}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className={classes.panel}>
          <h3 className={`text-1xl md:text-5xl font-bold mb-8 hero-text text-center ${classes.heading} ${classes.headingAccent}`}>Portfolio</h3>
          {/* Tab Navigation */}
          <div className={`flex flex-wrap gap-1 border-b mb-8 overflow-x-auto pb-0 ${classes.tabBorder}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "projects" | "publications" | "talks")}
                className={classes.tab(activeTab === tab.id)}
              >
                {tab.label}
                <span className={classes.tabCount}>{tab.count}</span>

                {activeTab === tab.id && (
                  <motion.div
                    className={classes.tabIndicator}
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
    </>
  )
}
