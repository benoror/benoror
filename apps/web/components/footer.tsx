"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, NotebookPen, Rss } from "lucide-react"
import { HOME, LINKS } from '@workspace/data/personal';
import { shortURL } from '@workspace/utils/url';
import { useAppTheme } from "@/hooks/use-app-theme"
import { getClasses } from "./footer.theme"

import styles from './styles.module.css'

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" />
    </svg>
  )
}

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
    <IconLink Icon={BlueskyIcon} link={LINKS.bluesky_url} text={shortURL(LINKS.bluesky_url)} className={iconClassName} />
    <IconLink Icon={Linkedin} link={LINKS.linkedin_url} text={shortURL(LINKS.linkedin_url)} className={iconClassName} />
    <IconLink Icon={Mail} link={`mailto:${HOME.public_email}`} text={shortURL(HOME.public_email)} className={iconClassName} />
    <IconLink Icon={NotebookPen} link={LINKS.blog_url} text={shortURL(LINKS.blog_url)} className={iconClassName} />
    <IconLink Icon={Rss} link={LINKS.feed_url} text={shortURL(LINKS.feed_url)} className={iconClassName} />
  </motion.div>
)

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
