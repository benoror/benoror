"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import type { PortfolioItem } from "@workspace/data/portfolio"
import { Badge } from "@workspace/ui/components/badge"

interface PortfolioCardProps {
  item: PortfolioItem
  onClick: () => void
}

export default function PortfolioCard({ item, onClick }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-blue-950/20 backdrop-blur-sm border border-blue-900/30 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        boxShadow: "0 15px 30px rgba(0, 100, 255, 0.2)",
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 cursor-pointer overflow-hidden" onClick={onClick}>
        <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.3 }} className="h-full w-full">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <Badge variant="outline" className="bg-blue-900/50 text-blue-100 border-blue-400/30">
            {item.category}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h3 className="text-xl font-semibold cursor-pointer hover:text-blue-300 transition-colors" onClick={onClick}>
          {item.title}
        </h3>
        <p className="text-sm text-blue-200 line-clamp-3">{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-blue-950 text-blue-200">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between pt-2">
          <div className="flex space-x-2">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-100 transition-colors"
                aria-label={`Visit ${item.title}`}
              >
                <ExternalLink size={18} />
              </a>
            )}
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-100 transition-colors"
                aria-label={`GitHub repository for ${item.title}`}
              >
                <Github size={18} />
              </a>
            )}
          </div>
          <motion.button
            className="text-sm text-blue-300 hover:text-blue-100 transition-colors"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

