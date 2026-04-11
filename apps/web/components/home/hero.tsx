"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HOME } from "@workspace/data/shared/profile"
import { SocialIcons } from "../ui/social-icons"
import OutrunGrid from "@/components/outrun-hero-background"
import { useAppTheme } from "@/hooks/use-app-theme"
import Link from "next/link"
import { getClasses } from "./hero.theme"

import styles from './home.module.css'

function shuffleImages(images: string[]) {
  const shuffled = [...images]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = current
  }
  return shuffled
}

export default function Hero() {
  const { themeKind } = useAppTheme()
  const classes = getClasses(themeKind)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const baseImages = useMemo(
    () => [
      "/images/ben/ben-bw.jpeg",
      "/images/ben/1ff66dbc-9c8b-4526-84dc-89d4f46ef8b0.jpg",
      "/images/ben/Gemini_Generated_Image_8mdk0g8mdk0g8mdk.png",
      "/images/ben/cyberpunk.jpg",
      "/images/ben/himekawa2.jpg",
      "/images/ben/himekawa4.jpg",
      "/images/ben/himekawa5.jpg",
    ],
    [],
  )
  const [images, setImages] = useState(baseImages)
  const ctaBaseClass =
    "inline-flex h-11 min-h-11 items-center justify-center rounded-md border px-6 text-sm font-medium leading-none shadow-sm backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"

  useEffect(() => {
    // Keep first render deterministic for SSR hydration, then randomize on client.
    setImages(shuffleImages(baseImages))
  }, [baseImages])

  useEffect(() => {
    const preloadLinks: HTMLLinkElement[] = []

    images.forEach((src) => {
      // Hint the browser to fetch carousel assets as early as possible.
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
      preloadLinks.push(link)

      const img = new Image()
      img.decoding = "async"
      img.src = src
    })

    return () => {
      preloadLinks.forEach((link) => link.remove())
    }
  }, [images])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section id="top" className={`min-h-screen flex flex-col justify-center items-center relative overflow-hidden ${classes.section}`}>
      {classes.showOutrunGrid && <OutrunGrid />}

      <div className="container mx-auto px-4 -py-12 z-10">
        <div className="flex flex-col items-center justify-center gap-12 text-center">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${styles.heroText} text-4xl md:text-6xl font-bold tracking-tighter`}
            >
              {HOME.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-xl md:text-2xl ${classes.subtitle}`}
            >
              {HOME.header}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center mt-6 mb-4"
          >
            <div className={styles.profileImage}>
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={images[activeImageIndex]}
                  src={images[activeImageIndex] || "/placeholder.svg"}
                  alt={`Ben Orozco profile ${activeImageIndex + 1}`}
                  className={styles.carouselImage}
                  loading="eager"
                  decoding="async"
                  initial={{
                    opacity: 0,
                    scale: 1.06,
                    filter: "blur(6px) saturate(120%)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px) saturate(100%)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.98,
                    filter: "blur(4px) saturate(110%)",
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <motion.div
                key={`sheen-${activeImageIndex}`}
                className={styles.transitionSheen}
                initial={{ x: "-130%", opacity: 0 }}
                animate={{ x: "130%", opacity: [0, 0.35, 0] }}
                transition={{ duration: 0.48, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-center -mt-8">
            <SocialIcons iconClassName={classes.socialIcon} containerClassName={classes.socialPanel} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-4 -mt-4"
          >
            <a
              href="#about"
              className={`${ctaBaseClass} ${classes.primaryButton}`}
            >
              Learn More
            </a>
            <Link
              href="/portfolio"
              className={`${ctaBaseClass} ${classes.secondaryButton}`}
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
