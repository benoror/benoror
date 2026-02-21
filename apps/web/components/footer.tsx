"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Rss } from "lucide-react"
import { HOME, LINKS } from '@workspace/data/personal';
import { shortURL } from '@workspace/utils/url';
import { useAppTheme } from "@/hooks/use-app-theme"
import { pickBlueValue, pickThemeValue } from "@/lib/theme-styles"

import styles from './styles.module.css'

export const IconLink = ({
  Icon,
  link,
  text,
  className,
}: {
  Icon: React.ElementType
  link: string
  text: string
  className: string
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`${styles.socialIcon} ${className}`}
    aria-label={text}
    title={text}
  >
    <Icon className="h-6 w-6" />
  </a>
)

export const SocialIcons = ({ iconClassName = "text-sky-300 hover:text-white" }: { iconClassName?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex space-x-6"
  >
    <IconLink Icon={Github} link={LINKS.github_url} text={shortURL(LINKS.github_url)} className={iconClassName} />
    <IconLink Icon={Twitter} link={LINKS.twitter_url} text={shortURL(LINKS.twitter_url)} className={iconClassName} />
    <IconLink Icon={Linkedin} link={LINKS.linkedin_url} text={shortURL(LINKS.linkedin_url)} className={iconClassName} />
    <IconLink Icon={Mail} link={`mailto:${HOME.public_email}`} text={shortURL(HOME.public_email)} className={iconClassName} />
    <IconLink Icon={Rss} link={LINKS.blog_url} text={shortURL(LINKS.blog_url)} className={iconClassName} />
  </motion.div>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { isBlueDark, themeKind } = useAppTheme()
  const rootClass = pickThemeValue(themeKind, {
    outrun: "border-sky-900/20 bg-black/80",
    dark: "border-sky-900/30 bg-slate-950/85",
    light: "border-sky-200 bg-white/90",
  })
  const textClass = pickBlueValue(isBlueDark, "text-sky-300", "text-sky-700")
  const iconClass = pickBlueValue(isBlueDark, "text-sky-300 hover:text-white", "text-sky-700 hover:text-sky-900")
  const codeClass = pickBlueValue(isBlueDark, "text-sky-900", "text-sky-500")

  return (
    <footer className={`py-12 border-t backdrop-blur-md ${rootClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <SocialIcons iconClassName={iconClass} />
        </div>

        <div className="flex flex-col items-center justify-center space-y-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`text-sm flex flex-col items-center gap-4 ${textClass}`}
          >
            <a href="https://github.com/benoror/benoror" target="_blank" className="text-xs">
              Made with TypeScript, React, Next.js, Tailwind and shadcn/ui <Github className="w-4 h-4 mx-1 mb-1 inline" />
            </a>
            <div>
              © {currentYear} Ben Orozco. All rights reserved.
            </div>
            <code className={`text-xs ${codeClass}`}>
              nostr (<a href="https://primal.net/p/nprofile1qqsyr8m0f9sjjv5t3jzm29ry8faddqxfeguku477krth3decu8w0q2ctsxua2" target="_blank">primal.net</a>): npub1gx0k7jtp9yeghry9k52xgwn666qvnj3edetaavxh0zmn3cwu7q4s9v9x06
            </code>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
