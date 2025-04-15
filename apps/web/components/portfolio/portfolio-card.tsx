"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Youtube, ClipboardPlus } from "lucide-react"
import type { PortfolioItem } from "@workspace/data/portfolio"
import { Badge } from "@workspace/ui/components/badge"

interface PortfolioCardProps {
  item: PortfolioItem
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-gradient-to-br from-sky-900/60 to-sky-900/60 backdrop-blur-sm border border-sky-500/30 rounded-lg overflow-hidden shadow-lg shadow-sky-900/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        boxShadow: "0 15px 30px rgba(0, 120, 255, 0.3)",
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.3 }} className="h-full w-full">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-fill" />
        </motion.div>

        <div className="absolute h-16 w-16 top-4 left-4 rounded-full bg-white border-2 border-sky-700/30 ring-2 ring-sky-200 flex items-center justify-center">
          <Image src={item.icon || "/placeholder.svg"} alt={item.title} fill className="rounded-full p-2" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/90 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <Badge variant="outline" className="bg-sky-700/70 text-sky-50 border-sky-400/50 mr-2">
            {item.category}
          </Badge>
          <Badge variant="outline" className="bg-sky-700/70 text-sky-50 border-sky-400/50">
            {item.role}
          </Badge>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <h3
          className="text-xl font-semibold text-sky-50 hover:text-sky-200 transition-colors"
        >
          <a href={item.url} target="_blank" className="hover:no-underline">{item.title}</a>
        </h3>
        <p className="text-sm text-sky-100 line-clamp-3">{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-sky-800/70 text-sky-100 border border-sky-500/20">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between pt-3 border-t border-sky-700/30 mt-3">
          <div className="flex space-x-3">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-200 hover:text-sky-50 transition-colors"
                aria-label={`Visit ${item.title}`}
              >
                <ExternalLink size={18} />
              </a>
            )}
            {item?.links?.github && (
              <a
                href={item?.links?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-200 hover:text-sky-50 transition-colors"
                aria-label={`GitHub repository for ${item.title}`}
              >
                <Github size={18} />
              </a>
            )}
            {item?.links?.video && (
              <a
                href={item?.links?.video}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-200 hover:text-sky-50 transition-colors"
                aria-label={`Video for ${item.title}`}
              >
                <Youtube size={18} />
              </a>
            )}
            {item?.links?.other && (
              <a
                href={item?.links?.other}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-200 hover:text-sky-50 transition-colors"
                aria-label={`Other for ${item.title}`}
              >
                <ClipboardPlus size={18} />
              </a>
            )}
          </div>
          <motion.button
            className="text-sm font-medium text-sky-200 hover:text-sky-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href={item.url} target="_blank" className="hover:no-underline">View</a>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

