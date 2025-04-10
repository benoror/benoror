"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Rss } from "lucide-react"

import styles from './styles.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-blue-900/20 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex space-x-6"
          >
            <a
              href="https://github.com/benoror"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} text-blue-300 hover:text-white`}
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/benoror"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} text-blue-300 hover:text-[#00acee]`}
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/benoror"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} text-blue-300 hover:text-[#0077B5]`}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:ben@orozco.xyz"
              className={`${styles.socialIcon} text-blue-300 hover:text-[#00ccff]`}
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="/blog/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} text-blue-300 hover:text-[#0088ff]`}
              aria-label="RSS Feed"
            >
              <Rss className="h-6 w-6" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm text-blue-300"
          >
            © {currentYear} Ben Orozco. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
