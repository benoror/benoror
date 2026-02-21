"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"
import { HOME } from "@workspace/data/personal"
import { SocialIcons } from "../footer"
import OutrunGrid from "@/components/outrun-hero-background"

import styles from './home.module.css'

export default function Hero() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const images = [
    "/images/ben-normal.jpeg",
    "/images/ben-dreamify.jpeg",
    "/images/ben-illustrated.jpeg",
    "/images/ben-bw.jpeg",
    "/images/ben-colorized.png",
    "/images/ben-laser-eyes.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled down to the About section
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        const aboutPosition = aboutSection.getBoundingClientRect().top
        setIsScrolled(aboutPosition < window.innerHeight / 2)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleArrowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = isScrolled ? "top" : "about"

    if (targetId === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <section id="top" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <OutrunGrid />

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
              className="text-xl md:text-2xl text-sky-700 dark:text-cyan-200/80"
            >
              {HOME.header}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <div className={styles.profileImage}>
              {images.map((src, index) => (
                <img
                  key={src}
                  src={src || "/placeholder.svg"}
                  alt={`Ben Orozco profile ${index + 1}`}
                  className={activeImageIndex === index ? styles.active : ""}
                />
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-center">
            <SocialIcons />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-md bg-sky-600 hover:bg-sky-700 dark:bg-cyan-600/80 dark:hover:bg-cyan-500/90 dark:shadow-[0_0_20px_rgba(34,211,238,0.35)] px-6 py-3 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Learn More
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-md border border-sky-400/30 bg-sky-950/30 hover:bg-sky-900/40 dark:border-cyan-400/30 dark:bg-cyan-950/20 dark:hover:bg-cyan-900/30 dark:shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm px-6 py-3 text-sm font-medium text-sky-100 dark:text-cyan-100 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View Portfolio
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <a
          href={isScrolled ? "#top" : "#about"}
          onClick={handleArrowClick}
          aria-label={isScrolled ? "Scroll to top" : "Scroll to about section"}
        >
          {isScrolled ? <ArrowUp className="h-6 w-6 text-sky-100 dark:text-cyan-300" /> : <ArrowDown className="h-6 w-6 text-sky-100 dark:text-cyan-300" />}
        </a>
      </div>
    </section>
  )
}
