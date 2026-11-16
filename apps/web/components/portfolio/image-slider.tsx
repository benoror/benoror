"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useHasInteracted } from "@/hooks/use-has-interacted"

const VIDEO_MEDIA: Record<
  string,
  {
    mp4: string
    webm?: string
    poster: string
    width: number
    height: number
  }
> = {
  "/images/portfolio/bloxcraft.mp4": {
    mp4: "/images/portfolio/bloxcraft.mp4",
    poster: "/images/portfolio/bloxcraft-poster.png",
    width: 640,
    height: 480,
  },
  "/images/portfolio/gpg.nvim.mp4": {
    mp4: "/images/portfolio/gpg.nvim.mp4",
    webm: "/images/portfolio/gpg.nvim.webm",
    poster: "/images/portfolio/gpg.nvim-poster.png",
    width: 1152,
    height: 648,
  },
}

interface ImageSliderProps {
  images: string[]
  alt: string
  autoplayInterval?: number
  className?: string
  prioritizeFirstImage?: boolean
}

export default function ImageSlider({
  images,
  alt,
  autoplayInterval = 1000,
  className = "",
  prioritizeFirstImage = false,
}: ImageSliderProps) {
  const hasInteracted = useHasInteracted()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Create a placeholder image URL with dimensions
  const placeholderImage = "/placeholder.svg?height=400&width=600"

  // Filter out empty image sources and ensure we have at least one valid image
  const validImages = images.filter((img) => img && img.trim() !== "")
  const imageList = validImages.length > 0 ? validImages : [placeholderImage]
  const currentSource = imageList[currentIndex] || "/placeholder.svg"
  const videoMedia = VIDEO_MEDIA[currentSource]

  // Reset autoplay when manually navigating
  const resetAutoplay = () => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current)
      autoplayTimeoutRef.current = null
    }
    setAutoplay(false)
  }

  // const goToNext = () => {
  //   resetAutoplay()
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length)
  // }

  // const goToPrevious = () => {
  //   resetAutoplay()
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length)
  // }

  // Handle autoplay
  useEffect(() => {
    if (autoplay && hasInteracted && isNearViewport && imageList.length > 1) {
      autoplayTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length)
      }, autoplayInterval)
    }

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current)
      }
    }
  }, [currentIndex, autoplay, autoplayInterval, hasInteracted, imageList.length, isNearViewport])

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(Boolean(entry?.isIntersecting)),
      { rootMargin: "200px" },
    )
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isNearViewport) {
      void video.play().catch(() => {
        // Autoplay can still be denied by user-agent policy; the poster remains visible.
      })
    } else {
      video.pause()
    }
  }, [isNearViewport, videoMedia])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.1 }}
          className="relative w-full h-full"
        >
          {videoMedia ? (
            <video
              ref={videoRef}
              aria-label={`${alt} animation`}
              autoPlay={isNearViewport}
              className="h-full w-full object-cover"
              height={videoMedia.height}
              loop
              muted
              playsInline
              poster={videoMedia.poster}
              preload={isNearViewport ? "auto" : "metadata"}
              width={videoMedia.width}
            >
              {videoMedia.webm ? <source src={videoMedia.webm} type="video/webm" /> : null}
              <source src={videoMedia.mp4} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={currentSource}
              alt={`${alt} - image ${currentIndex + 1} of ${imageList.length}`}
              fetchPriority={prioritizeFirstImage && currentIndex === 0 ? "high" : undefined}
              fill
              priority={prioritizeFirstImage && currentIndex === 0}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, calc(100vw - 6rem)"
              className="object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {imageList.length > 1 && (
        <>
          {/* Navigation arrows */}
          {/* <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 z-10 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 z-10 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button> */}

          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
            {imageList.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  resetAutoplay()
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
