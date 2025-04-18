"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { LINKS } from '@workspace/data/personal';

import styles from './styles.module.css'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-md shadow-sm py-2 border-b border-sky-500/20" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-sky-100 hover:text-white hover:no-underline">
          Ben Orozco
        </Link>

        {isMobile ? (
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none text-sky-100"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isMenuOpen && (
              <div className="fixed inset-0 top-16 bg-black/90 backdrop-blur-md z-40 p-4">
                <nav className="flex flex-col space-y-6 text-lg">
                  <Link href="/" className={`${styles.navLink} text-sky-100 hover:no-underline`} onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                  <Link href="/portfolio" className={`${styles.navLink} text-sky-100 hover:no-underline`} onClick={() => setIsMenuOpen(false)}>
                    Portfolio
                  </Link>
                  <Link href={LINKS.resume_url} target="_blank" className={`${styles.navLink} text-sky-100 hover:no-underline`} onClick={() => setIsMenuOpen(false)}>
                    Resume
                  </Link>
                  <Link href={LINKS.blog_url} target="_blank" className={`${styles.navLink} text-sky-100 hover:no-underline`} onClick={() => setIsMenuOpen(false)}>
                    Blog
                  </Link>
                  <div className="pt-4">
                    <ModeToggle />
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-8">
            <nav className="flex space-x-8 text-sm font-medium">
              <Link href="/" className={`${styles.navLink} text-sky-100 hover:text-white hover:no-underline`}>
                Home
              </Link>
              <Link href="/portfolio" className={`${styles.navLink} text-sky-100 hover:text-white hover:no-underline`}>
                Portfolio
              </Link>
              <Link href={LINKS.resume_url} target="_blank" className={`${styles.navLink} text-sky-100 hover:text-white hover:no-underline`}>
                Resume
              </Link>
              <Link href={LINKS.blog_url} target="_blank" className={`${styles.navLink} text-sky-100 hover:text-white hover:no-underline`}>
                Blog
              </Link>
            </nav>
            <ModeToggle />
          </div>
        )}
      </div>
    </header>
  )
}
