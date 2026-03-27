"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Youtube, ClipboardPlus } from "lucide-react"
import type { PortfolioItem } from "@workspace/data/portfolio"
import ImageSlider from "./image-slider"
import { Badge } from "@workspace/ui/components/badge"
import { useAppTheme } from "@/hooks/use-app-theme"
import { getPortfolioCardClasses } from "./portfolio-card.theme"

interface PortfolioCardProps {
  item: PortfolioItem
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { isBlueDark, isOutrun, themeKind } = useAppTheme()
  const classes = getPortfolioCardClasses(themeKind, isBlueDark, isOutrun)

  // Determine if we should use the slider (if multiple images are provided)
  const useSlider = item.images.length > 0

  return (
    <motion.div
      className={`backdrop-blur-sm border rounded-lg overflow-hidden shadow-lg ${classes.root}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        boxShadow: classes.hoverShadow,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.3 }} className="h-full w-full">
          {useSlider ? (
            <ImageSlider images={item.images} alt={item.title} autoplayInterval={3000} className="h-full" />
          ) : (
            <Image src={item.images[0] || "/placeholder.svg"} alt={item.title} fill className="object-fill justify-start" />
          )}
        </motion.div>

        <div className={`absolute h-16 w-16 top-4 left-4 rounded-full border-2 ring-2 flex items-center justify-center ${classes.iconWrap}`}>
          <Image src={item.icon || "/placeholder.svg"} alt={item.title} fill className="rounded-full p-2" />
        </div>

        <div className={`absolute inset-0 ${classes.imageOverlay}`} />
        <div className="absolute bottom-0 left-0 p-4">
          <Badge variant="outline" className={`${classes.badge} mr-2`}>
            {item.category}
          </Badge>
          <Badge variant="outline" className={classes.badge}>
            {item.role}
          </Badge>
        </div>
        {item.circa && (
          <div className="absolute bottom-0 right-0 p-4">
            <Badge variant="outline" className={classes.yearBadge}>
              {item.circa}
            </Badge>
          </div>
        )}
      </div>

      <div className={`p-5 space-y-4 ${classes.body}`}>
        <h3
          className={`text-xl font-semibold transition-colors ${classes.title}`}
        >
          <a href={item.url} target="_blank" className="hover:no-underline">{item.title}</a>
        </h3>
        <p className={`text-sm leading-relaxed line-clamp-2 min-h-[2.8rem] ${classes.description}`}>{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className={classes.tech}>
              {tech}
            </Badge>
          ))}
        </div>

        <div className={`flex justify-between pt-3 border-t mt-3 ${classes.divider}`}>
          <div className="flex space-x-3">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${classes.link}`}
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
                className={`transition-colors ${classes.link}`}
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
                className={`transition-colors ${classes.link}`}
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
                className={`transition-colors ${classes.link}`}
                aria-label={`Other for ${item.title}`}
              >
                <ClipboardPlus size={18} />
              </a>
            )}
          </div>
          <motion.button
            className={`text-sm font-medium transition-colors ${classes.link}`}
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

