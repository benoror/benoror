"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, NotebookPen, Rss } from "lucide-react"
import { HOME, LINKS } from '@workspace/data/personal';
import { shortURL } from '@workspace/utils/url';
import { useAppTheme } from "@/hooks/use-app-theme"
import { getClasses } from "./footer.theme"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"

import styles from './styles.module.css'

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current ${className ?? ""}`}
      style={{
        maskImage: "url('/images/icons/bluesky.svg')",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskImage: "url('/images/icons/bluesky.svg')",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
      }}
    />
  )
}

function ObsidianIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current ${className ?? ""}`}
      style={{
        maskImage: "url('/images/icons/obsidian.svg')",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "115%",
        WebkitMaskImage: "url('/images/icons/obsidian.svg')",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "115%",
      }}
    />
  )
}

export const IconLink = ({
  Icon,
  link,
  text,
  legend,
  className,
  tooltipClassName,
  tooltipShowArrow,
}: {
  Icon: React.ElementType
  link: string
  text: string
  legend?: string
  className: string
  tooltipClassName?: string
  tooltipShowArrow?: boolean
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center leading-none ${styles.socialIcon} ${className}`}
        aria-label={legend ?? text}
        title={text}
      >
        <Icon className="h-6 w-6 block shrink-0" />
      </a>
    </TooltipTrigger>
    <TooltipContent
      side="top"
      sideOffset={14}
      className={tooltipClassName}
      showArrow={tooltipShowArrow}
    >
      {legend ?? text}
    </TooltipContent>
  </Tooltip>
)

export const SocialIcons = ({
  iconClassName = "text-sky-300 hover:text-white",
  containerClassName = "",
}: {
  iconClassName?: string
  containerClassName?: string
}) => {
  const { themeKind } = useAppTheme()

  const tooltipClassName =
    themeKind === "outrun"
      ? "bg-slate-950/65 border border-cyan-300/25 text-cyan-100 backdrop-blur-md"
      : themeKind === "light"
        ? "bg-slate-950/65 border border-slate-700/25 text-sky-100 backdrop-blur-md"
        : "bg-slate-950/70 border border-sky-300/20 text-sky-100 backdrop-blur-md"
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex space-x-6 ${containerClassName}`}
    >
      <IconLink Icon={Github} link={LINKS.github.url} text={shortURL(LINKS.github.url)} legend={LINKS.github.legend} className={iconClassName} tooltipClassName={tooltipClassName} tooltipShowArrow={false} />
      <IconLink Icon={Twitter} link={LINKS.twitter.url} text={shortURL(LINKS.twitter.url)} legend={LINKS.twitter.legend} className={iconClassName} tooltipClassName={tooltipClassName} tooltipShowArrow={false} />
      <IconLink Icon={BlueskyIcon} link={LINKS.bluesky.url} text={shortURL(LINKS.bluesky.url)} legend={LINKS.bluesky.legend} className={iconClassName} tooltipClassName={tooltipClassName} tooltipShowArrow={false} />
      <IconLink Icon={Linkedin} link={LINKS.linkedin.url} text={shortURL(LINKS.linkedin.url)} legend={LINKS.linkedin.legend} className={iconClassName} tooltipClassName={tooltipClassName} tooltipShowArrow={false} />
      <IconLink Icon={Mail} link={`mailto:${HOME.public_email}`} text={shortURL(HOME.public_email)} legend="Email" className={iconClassName} tooltipClassName={tooltipClassName} tooltipShowArrow={false} />
      <IconLink Icon={ObsidianIcon} link={LINKS.notes.url} text={shortURL(LINKS.notes.url)} legend={LINKS.notes.legend} className={iconClassName} tooltipClassName={tooltipClassName} tooltipShowArrow={false} />
      <IconLink Icon={NotebookPen} link={LINKS.blog.url} text={shortURL(LINKS.blog.url)} legend={LINKS.blog.legend} className={iconClassName} tooltipClassName={tooltipClassName} tooltipShowArrow={false} />
      <IconLink Icon={Rss} link={LINKS.feed.url} text={shortURL(LINKS.feed.url)} legend={LINKS.feed.legend} className={iconClassName} tooltipClassName={tooltipClassName} tooltipShowArrow={false} />
    </motion.div>
  )
}

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
