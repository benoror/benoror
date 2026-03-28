"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import { useAppTheme } from "@/hooks/use-app-theme"
import { getClasses } from "./footer.theme"
import { SocialIcons } from "./ui/social-icons"


export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { themeKind } = useAppTheme()
  const classes = getClasses(themeKind)

  return (
    <footer className={`py-12 border-t backdrop-blur-md ${classes.root}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <SocialIcons iconClassName={classes.icon} />
        </div>

        <div className="flex flex-col items-center justify-center space-y-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`text-sm flex flex-col items-center gap-4 ${classes.text}`}
          >
            <a href="https://github.com/benoror/benoror" target="_blank" className="text-xs">
              Made with TypeScript, React, Next.js, Tailwind and shadcn/ui <Github className="w-4 h-4 mx-1 mb-1 inline" />
            </a>
            <div>
              © {currentYear} Ben Orozco. All rights reserved.
            </div>
            <code className={`text-xs ${classes.code}`}>
              nostr (<a href="https://primal.net/p/nprofile1qqsyr8m0f9sjjv5t3jzm29ry8faddqxfeguku477krth3decu8w0q2ctsxua2" target="_blank">primal.net</a>): npub1gx0k7jtp9yeghry9k52xgwn666qvnj3edetaavxh0zmn3cwu7q4s9v9x06
            </code>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
