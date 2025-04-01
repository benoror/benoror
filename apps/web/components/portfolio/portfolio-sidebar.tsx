"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, Folder, FileText, Video, Search } from "lucide-react"
import type { PortfolioItem } from "@/data/portfolio-data"
import { motion, AnimatePresence } from "framer-motion"

interface PortfolioSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  projects: PortfolioItem[]
  publications: PortfolioItem[]
  talks: PortfolioItem[]
  onItemClick: (item: PortfolioItem) => void
}

export default function PortfolioSidebar({
  activeSection,
  onSectionChange,
  projects,
  publications,
  talks,
  onItemClick,
}: PortfolioSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    projects: true,
    publications: false,
    talks: false,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState<{
    projects: PortfolioItem[]
    publications: PortfolioItem[]
    talks: PortfolioItem[]
  }>({
    projects,
    publications,
    talks,
  })

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems({
        projects,
        publications,
        talks,
      })
      return
    }

    const query = searchQuery.toLowerCase()
    setFilteredItems({
      projects: projects.filter(
        (item) => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
      ),
      publications: publications.filter(
        (item) => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
      ),
      talks: talks.filter(
        (item) => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
      ),
    })
  }, [searchQuery, projects, publications, talks])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
    onSectionChange(section)
  }

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "projects":
        return <Folder className="h-4 w-4 text-blue-400" />
      case "publications":
        return <FileText className="h-4 w-4 text-green-400" />
      case "talks":
        return <Video className="h-4 w-4 text-purple-400" />
      default:
        return <Folder className="h-4 w-4" />
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto bg-blue-950/20 border-r border-blue-900/30 backdrop-blur-sm">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
            <input
              type="text"
              placeholder="Search portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-blue-950/40 border border-blue-800/50 rounded-md py-2 pl-10 pr-4 text-sm text-blue-100 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="space-y-1">
            {/* Projects Section */}
            <div>
              <button
                onClick={() => toggleSection("projects")}
                className={`w-full flex items-center justify-between p-2 rounded-md transition-colors ${
                  activeSection === "projects" ? "bg-blue-800/30 text-blue-100" : "hover:bg-blue-900/20 text-blue-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {getSectionIcon("projects")}
                  <span className="font-medium">Projects</span>
                  <span className="text-xs text-blue-400 bg-blue-900/40 px-1.5 py-0.5 rounded-full">
                    {filteredItems.projects.length}
                  </span>
                </div>
                {expandedSections.projects ? (
                  <ChevronDown className="h-4 w-4 text-blue-300" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-blue-300" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.projects && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 py-1 space-y-1">
                      {filteredItems.projects.map((project) => (
                        <motion.button
                          key={project.id}
                          onClick={() => onItemClick(project)}
                          className="w-full text-left flex items-center space-x-2 px-2 py-1.5 rounded-md text-sm hover:bg-blue-800/20 text-blue-300 hover:text-blue-100 transition-colors"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                          <span className="truncate">{project.title}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Publications Section */}
            <div>
              <button
                onClick={() => toggleSection("publications")}
                className={`w-full flex items-center justify-between p-2 rounded-md transition-colors ${
                  activeSection === "publications"
                    ? "bg-blue-800/30 text-blue-100"
                    : "hover:bg-blue-900/20 text-blue-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {getSectionIcon("publications")}
                  <span className="font-medium">Publications</span>
                  <span className="text-xs text-green-400 bg-green-900/40 px-1.5 py-0.5 rounded-full">
                    {filteredItems.publications.length}
                  </span>
                </div>
                {expandedSections.publications ? (
                  <ChevronDown className="h-4 w-4 text-blue-300" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-blue-300" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.publications && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 py-1 space-y-1">
                      {filteredItems.publications.map((publication) => (
                        <motion.button
                          key={publication.id}
                          onClick={() => onItemClick(publication)}
                          className="w-full text-left flex items-center space-x-2 px-2 py-1.5 rounded-md text-sm hover:bg-green-900/20 text-green-300 hover:text-green-100 transition-colors"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <span className="w-1 h-1 rounded-full bg-green-400"></span>
                          <span className="truncate">{publication.title}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Talks Section */}
            <div>
              <button
                onClick={() => toggleSection("talks")}
                className={`w-full flex items-center justify-between p-2 rounded-md transition-colors ${
                  activeSection === "talks" ? "bg-blue-800/30 text-blue-100" : "hover:bg-blue-900/20 text-blue-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {getSectionIcon("talks")}
                  <span className="font-medium">Talks</span>
                  <span className="text-xs text-purple-400 bg-purple-900/40 px-1.5 py-0.5 rounded-full">
                    {filteredItems.talks.length}
                  </span>
                </div>
                {expandedSections.talks ? (
                  <ChevronDown className="h-4 w-4 text-blue-300" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-blue-300" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.talks && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 py-1 space-y-1">
                      {filteredItems.talks.map((talk) => (
                        <motion.button
                          key={talk.id}
                          onClick={() => onItemClick(talk)}
                          className="w-full text-left flex items-center space-x-2 px-2 py-1.5 rounded-md text-sm hover:bg-purple-900/20 text-purple-300 hover:text-purple-100 transition-colors"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                          <span className="truncate">{talk.title}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden w-full bg-blue-950/20 border-b border-blue-900/30 backdrop-blur-sm">
        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
            <input
              type="text"
              placeholder="Search portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-blue-950/40 border border-blue-800/50 rounded-md py-2 pl-10 pr-4 text-sm text-blue-100 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="flex overflow-x-auto space-x-2 pb-2">
            <button
              onClick={() => toggleSection("projects")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md whitespace-nowrap ${
                activeSection === "projects" ? "bg-blue-800/50 text-blue-100" : "bg-blue-900/20 text-blue-300"
              }`}
            >
              {getSectionIcon("projects")}
              <span>Projects ({filteredItems.projects.length})</span>
            </button>

            <button
              onClick={() => toggleSection("publications")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md whitespace-nowrap ${
                activeSection === "publications" ? "bg-blue-800/50 text-blue-100" : "bg-blue-900/20 text-blue-300"
              }`}
            >
              {getSectionIcon("publications")}
              <span>Publications ({filteredItems.publications.length})</span>
            </button>

            <button
              onClick={() => toggleSection("talks")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md whitespace-nowrap ${
                activeSection === "talks" ? "bg-blue-800/50 text-blue-100" : "bg-blue-900/20 text-blue-300"
              }`}
            >
              {getSectionIcon("talks")}
              <span>Talks ({filteredItems.talks.length})</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

