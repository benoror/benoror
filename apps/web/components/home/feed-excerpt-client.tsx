"use client"

import { motion } from "framer-motion"
import { Rss } from "lucide-react"
import ExternalLink from "@/components/ui/external-link"
import { useAppTheme } from "@/hooks/use-app-theme"
import { getClasses } from "./feed-excerpt.theme"

export type FeedExcerptItem = {
  id: string
  title: string
  link: string
  sourceName: string
  sourceUrl: string
  sourceRssUrl?: string
}

export default function FeedExcerptClient({ items }: { items: FeedExcerptItem[] }) {
  const { themeKind } = useAppTheme()
  const classes = getClasses(themeKind)

  return (
    <section id="feed-excerpt" className="pb-20 md:pb-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`max-w-4xl mx-auto space-y-6 ${classes.panel}`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter text-center ${classes.heading}`}>
            Recent Activity
          </h2>

          {items.length === 0 ? (
            <p className={`text-center ${classes.body}`}>No feed items available right now.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className={`pt-3 first:pt-0 border-t first:border-t-0 ${classes.separator}`}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium underline-offset-4 hover:underline ${classes.body} ${classes.linkHover}`}
                  >
                    {item.title}
                  </a>
                  <div className={`text-sm mt-1 flex flex-wrap items-center gap-2 ${classes.source}`}>
                    <ExternalLink
                      href={item.sourceUrl}
                      target="_blank"
                      className={`transition-colors hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 ${classes.linkHover} ${classes.linkFocus}`}
                    >
                      {item.sourceName}
                    </ExternalLink>
                    {item.sourceRssUrl ? (
                      <a
                        href={item.sourceRssUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open RSS feed for ${item.sourceName}`}
                        className={`inline-flex items-center transition-colors focus-visible:outline-none focus-visible:ring-2 ${classes.linkHover} ${classes.linkFocus}`}
                      >
                        <Rss className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="pt-2 text-center">
            <a href="/feed" className={`text-sm underline underline-offset-4 ${classes.linkHover} ${classes.body}`}>
              View All
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
