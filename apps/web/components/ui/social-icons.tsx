"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, NotebookPen, Rss, Twitter } from "lucide-react"
import { HOME, LINKS } from "@workspace/data/personal"
import { shortURL } from "@workspace/utils/url"
import { useAppTheme } from "@/hooks/use-app-theme"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"

import styles from "../styles.module.css"

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

function IconLink({
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
      <IconLink
        Icon={Github}
        link={LINKS.github.url}
        text={shortURL(LINKS.github.url)}
        legend={LINKS.github.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
        tooltipShowArrow={false}
      />
      <IconLink
        Icon={Twitter}
        link={LINKS.twitter.url}
        text={shortURL(LINKS.twitter.url)}
        legend={LINKS.twitter.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
        tooltipShowArrow={false}
      />
      <IconLink
        Icon={BlueskyIcon}
        link={LINKS.bluesky.url}
        text={shortURL(LINKS.bluesky.url)}
        legend={LINKS.bluesky.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
        tooltipShowArrow={false}
      />
      <IconLink
        Icon={Linkedin}
        link={LINKS.linkedin.url}
        text={shortURL(LINKS.linkedin.url)}
        legend={LINKS.linkedin.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
        tooltipShowArrow={false}
      />
      <IconLink
        Icon={Mail}
        link={`mailto:${HOME.public_email}`}
        text={shortURL(HOME.public_email)}
        legend="Email"
        className={iconClassName}
        tooltipClassName={tooltipClassName}
        tooltipShowArrow={false}
      />
      <IconLink
        Icon={ObsidianIcon}
        link={LINKS.notes.url}
        text={shortURL(LINKS.notes.url)}
        legend={LINKS.notes.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
        tooltipShowArrow={false}
      />
      <IconLink
        Icon={NotebookPen}
        link={LINKS.blog.url}
        text={shortURL(LINKS.blog.url)}
        legend={LINKS.blog.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
        tooltipShowArrow={false}
      />
      <IconLink
        Icon={Rss}
        link={LINKS.feed_page.url}
        text={shortURL(LINKS.feed.url)}
        legend={LINKS.feed.legend}
        className={iconClassName}
        tooltipClassName={tooltipClassName}
        tooltipShowArrow={false}
      />
    </motion.div>
  )
}
