"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageSliderProps {
  images: string[]
  alt: string
  autoplayInterval?: number
  className?: string
}

export default function ImageSlider({ images, alt, autoplayInterval = 1000, className = "" }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Create a placeholder image URL with dimensions
  const placeholderImage = "/placeholder.svg?height=400&width=600"

  // Filter out empty image sources and ensure we have at least one valid image
  const validImages = images.filter((img) => img && img.trim() !== "")
  const imageList = validImages.length > 0 ? validImages : [placeholderImage]

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
    if (autoplay && imageList.length > 1) {
      autoplayTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length)
      }, autoplayInterval)
    }

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current)
      }
    }
  }, [currentIndex, autoplay, imageList.length, autoplayInterval])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.1 }}
          className="relative w-full h-full"
        >
          <Image
            src={imageList[currentIndex] || "/placeholder.svg"}
            alt={`${alt} - image ${currentIndex + 1} of ${imageList.length}`}
            fill
            className="object-cover"
          />
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
