"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Youtube, ClipboardPlus } from "lucide-react"
import type { PortfolioItem } from "@workspace/data/portfolio"
import ImageSlider from "./image-slider"
import { Badge } from "@workspace/ui/components/badge"
import { useAppTheme } from "@/hooks/use-app-theme"
import { pickBlueValue, pickThemeValue } from "@/lib/theme-styles"

interface PortfolioCardProps {
  item: PortfolioItem
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { isBlueDark, isOutrun, themeKind } = useAppTheme()
  const rootClass = pickThemeValue(themeKind, {
    outrun: "bg-gradient-to-br from-slate-950/90 via-slate-900/85 to-sky-950/80 border-cyan-400/35 shadow-[0_16px_40px_rgba(2,12,27,0.65)]",
    dark: "bg-gradient-to-br from-slate-900 to-sky-950/70 border-sky-700/30 shadow-slate-900/30",
    light: "bg-gradient-to-br from-white to-sky-50/90 border-sky-200 shadow-sky-100/70",
  })
  const badgeClass = pickThemeValue(themeKind, {
    outrun: "bg-cyan-950/80 text-cyan-100 border-cyan-400/45",
    dark: "bg-sky-700/70 text-sky-50 border-sky-400/50",
    light: "bg-sky-100 text-sky-800 border-sky-300",
  })
  const yearBadgeClass = pickThemeValue(themeKind, {
    outrun: "bg-slate-950/80 text-cyan-100 border-cyan-500/35",
    dark: "bg-black/30 text-sky-50 border-none",
    light: "bg-white/80 text-sky-700 border-sky-200",
  })
  const titleClass = pickThemeValue(themeKind, {
    outrun: "text-cyan-50 hover:text-cyan-200",
    dark: "text-sky-50 hover:text-sky-200",
    light: "text-sky-900 hover:text-sky-700",
  })
  const descriptionClass = pickThemeValue(themeKind, {
    outrun: "text-sky-100/95",
    dark: "text-sky-100",
    light: "text-sky-700",
  })
  const techClass = pickThemeValue(themeKind, {
    outrun: "bg-slate-900/90 text-cyan-100 border border-cyan-500/30",
    dark: "bg-sky-800/70 text-sky-100 border border-sky-500/20",
    light: "bg-sky-100 text-sky-700 border border-sky-300",
  })
  const borderClass = pickBlueValue(isBlueDark, "border-sky-700/30", "border-sky-200")
  const linkClass = pickThemeValue(themeKind, {
    outrun: "text-cyan-200 hover:text-cyan-50",
    dark: "text-sky-200 hover:text-sky-50",
    light: "text-sky-700 hover:text-sky-900",
  })
  const imageOverlayClass = pickThemeValue(themeKind, {
    outrun: "bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-950/10",
    dark: "bg-gradient-to-t from-sky-900/90 to-transparent",
    light: "bg-gradient-to-t from-sky-900/90 to-transparent",
  })
  const iconWrapClass = pickThemeValue(themeKind, {
    outrun: "bg-slate-950/90 border-cyan-400/50 ring-cyan-300/35",
    dark: "bg-white border-sky-700/30 ring-sky-200",
    light: "bg-white border-sky-700/30 ring-sky-200",
  })
  const bodyClass = pickThemeValue(themeKind, {
    outrun: "bg-slate-950/45 backdrop-blur-md",
    dark: "",
    light: "",
  })

  // Determine if we should use the slider (if multiple images are provided)
  const useSlider = item.images.length > 0

  return (
    <motion.div
      className={`backdrop-blur-sm border rounded-lg overflow-hidden shadow-lg ${rootClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        boxShadow: isOutrun ? "0 16px 40px rgba(34, 211, 238, 0.22)" : "0 15px 30px rgba(0, 120, 255, 0.3)",
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

        <div className={`absolute h-16 w-16 top-4 left-4 rounded-full border-2 ring-2 flex items-center justify-center ${iconWrapClass}`}>
          <Image src={item.icon || "/placeholder.svg"} alt={item.title} fill className="rounded-full p-2" />
        </div>

        <div className={`absolute inset-0 ${imageOverlayClass}`} />
        <div className="absolute bottom-0 left-0 p-4">
          <Badge variant="outline" className={`${badgeClass} mr-2`}>
            {item.category}
          </Badge>
          <Badge variant="outline" className={badgeClass}>
            {item.role}
          </Badge>
        </div>
        {item.circa && (
          <div className="absolute bottom-0 right-0 p-4">
            <Badge variant="outline" className={yearBadgeClass}>
              {item.circa}
            </Badge>
          </div>
        )}
      </div>

      <div className={`p-5 space-y-4 ${bodyClass}`}>
        <h3
          className={`text-xl font-semibold transition-colors ${titleClass}`}
        >
          <a href={item.url} target="_blank" className="hover:no-underline">{item.title}</a>
        </h3>
        <p className={`text-sm leading-relaxed line-clamp-3 ${descriptionClass}`}>{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className={techClass}>
              {tech}
            </Badge>
          ))}
        </div>

        <div className={`flex justify-between pt-3 border-t mt-3 ${borderClass}`}>
          <div className="flex space-x-3">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${linkClass}`}
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
                className={`transition-colors ${linkClass}`}
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
                className={`transition-colors ${linkClass}`}
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
                className={`transition-colors ${linkClass}`}
                aria-label={`Other for ${item.title}`}
              >
                <ClipboardPlus size={18} />
              </a>
            )}
          </div>
          <motion.button
            className={`text-sm font-medium transition-colors ${linkClass}`}
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

