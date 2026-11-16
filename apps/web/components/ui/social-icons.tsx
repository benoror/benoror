"use client"

import { motion } from "framer-motion"
import { Mail, Rss } from "lucide-react"
import { HOME, LINKS } from "@workspace/data/shared/profile"
import { shortURL } from "@workspace/utils/url"
import { useAppTheme } from "@/hooks/use-app-theme"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { PlatformIcon } from "@/components/ui/platform-icon"

import styles from "../styles.module.css"

function IconLink({
  icon,
  link,
  text,
  legend,
  className,
  tooltipClassName,
}: {
  icon: React.ReactNode
  link: string
  text: string
  legend?: string
  className: string
  tooltipClassName?: string
}) {
  return (
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
          {icon}
        </a>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={14} className={tooltipClassName}>
        {legend ?? text}
      </TooltipContent>
    </Tooltip>
  )
}

export function SocialIcons({
  iconClassName = "text-sky-300 hover:text-white",
  containerClassName = "",
}: {
  iconClassName?: string
  containerClassName?: string
}) {
  const { themeKind } = useAppTheme()

  const tooltipClassName =
    themeKind === "outrun"
      ? "bg-slate-950/65 border border-cyan-300/25 text-cyan-100 backdrop-blur-md"
      : themeKind === "light"
        ? "bg-white/95 border border-sky-200/80 text-sky-800 backdrop-blur-md shadow-[0_10px_30px_rgba(15,23,42,0.10)]"
        : "bg-slate-950/70 border border-sky-300/20 text-sky-100 backdrop-blur-md"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex space-x-6 ${containerClassName}`}
    >
      <IconLink
        icon={<PlatformIcon platform="github" size={24} />}
        link={LINKS.github.url}
        text={shortURL(LINKS.github.url)}
        legend={LINKS.github.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
      />
      <IconLink
        icon={<PlatformIcon platform="x" size={24} />}
        link={LINKS.twitter.url}
        text={shortURL(LINKS.twitter.url)}
        legend={LINKS.twitter.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
      />
      <IconLink
        icon={<PlatformIcon platform="bluesky" size={24} />}
        link={LINKS.bluesky.url}
        text={shortURL(LINKS.bluesky.url)}
        legend={LINKS.bluesky.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
      />
      <IconLink
        icon={<PlatformIcon platform="linkedin" size={24} />}
        link={LINKS.linkedin.url}
        text={shortURL(LINKS.linkedin.url)}
        legend={LINKS.linkedin.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
      />
      <IconLink
        icon={<Mail aria-hidden="true" className="h-6 w-6 block shrink-0" />}
        link={`mailto:${HOME.public_email}`}
        text={shortURL(HOME.public_email)}
        legend="Email"
        className={iconClassName}
        tooltipClassName={tooltipClassName}
      />
      <IconLink
        icon={<PlatformIcon platform="notes" size={24} />}
        link={LINKS.notes.url}
        text={shortURL(LINKS.notes.url)}
        legend={LINKS.notes.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
      />
      <IconLink
        icon={<PlatformIcon platform="bear" size={24} />}
        link={LINKS.blog.url}
        text={shortURL(LINKS.blog.url)}
        legend={LINKS.blog.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
      />
      <IconLink
        icon={<Rss aria-hidden="true" className="h-6 w-6 block shrink-0" />}
        link={LINKS.feed_page.url}
        text={shortURL(LINKS.feed_page.url)}
        legend={LINKS.feed_page.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
      />
    </motion.div>
  )
}
