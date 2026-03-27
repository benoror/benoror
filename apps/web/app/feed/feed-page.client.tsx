"use client"

import Link from "next/link"
import { ExternalLink, Rss } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OutrunGrid from "@/components/outrun-hero-background"
import { LINKS } from "@workspace/data/personal"
import { useAppTheme } from "@/hooks/use-app-theme"
import type { AggregatedFeed, AggregatedFeedItem } from "@/lib/feed"
import { getClasses } from "./feed-page.theme"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
})

function FeedItemCard({
  item,
  sourceUrl,
  sourceRssUrl,
  classes,
}: {
  item: AggregatedFeedItem
  sourceUrl: string
  sourceRssUrl?: string
  classes: ReturnType<typeof getClasses>
}) {
  return (
    <li className={`${classes.card} p-4`}>
      <div className="flex flex-col gap-2">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className={`font-medium hover:underline ${classes.itemTitle}`}>
          {item.title}
        </a>
        <div className={`text-sm ${classes.meta} flex items-center justify-between gap-3`}>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 transition-colors hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 ${classes.link} ${classes.linkFocus}`}
            >
              {item.sourceName}
              <ExternalLink size={12} aria-hidden="true" className="opacity-70" />
            </a>
            <span>·</span>
            <time dateTime={item.publishedAt}>{dateFormatter.format(new Date(item.publishedAt))}</time>
          </div>
          {sourceRssUrl ? (
            <a
              href={sourceRssUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open RSS feed for ${item.sourceName}`}
              className={`inline-flex items-center transition-colors focus-visible:outline-none focus-visible:ring-2 ${classes.link} ${classes.linkFocus}`}
            >
              <Rss className="h-4 w-4" />
            </a>
          ) : null}
        </div>
        {item.summary ? <p className={`text-sm ${classes.body}`}>{item.summary}</p> : null}
      </div>
    </li>
  )
}

export function FeedPageClient({ feed }: { feed: AggregatedFeed }) {
  const { themeKind } = useAppTheme()
  const classes = getClasses(themeKind)
  const sourceById = new Map(feed.sources.map((source) => [source.id, source]))

  return (
    <main className={`min-h-screen flex flex-col ${classes.page}`}>
      {classes.showOutrunGrid && <OutrunGrid />}
      <Navbar />

      <section className="pt-24 flex-1">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className={`${classes.panel} space-y-12`}>
            <div className="space-y-4">
              <h1 className={`text-4xl md:text-5xl font-bold tracking-tighter ${classes.heading} ${classes.headingAccent}`}>Feed</h1>
              <p className={`text-xl max-w-3xl ${classes.body}`}>
                A consolidated stream of my writing and activity, powered by RSS/Atom.
              </p>
              <a
                href={LINKS.feed_url}
                className={`inline-flex items-center gap-2 text-sm underline underline-offset-4 ${classes.link}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open consolidated RSS feed"
              >
                <Rss className="h-4 w-4" />
                Consolidated RSS feed
              </a>
            </div>

            <div className="space-y-4">
              <h2 className={`text-2xl font-semibold tracking-tight ${classes.heading}`}>Latest Items</h2>
              {feed.items.length === 0 ? (
                <p className={classes.body}>No feed items available right now.</p>
              ) : (
                <ul className="space-y-3">
                  {feed.items.map((item) => {
                    const source = sourceById.get(item.sourceId)
                    return (
                      <FeedItemCard
                        key={item.id}
                        item={item}
                        sourceUrl={source?.siteUrl ?? item.sourceUrl}
                        sourceRssUrl={source?.rssUrl}
                        classes={classes}
                      />
                    )
                  })}
                </ul>
              )}
            </div>

            <p className={`text-xs ${classes.meta}`}>
              Generated at {dateFormatter.format(new Date(feed.generatedAt))}. Looking for old posts? Visit{" "}
              <Link href="/portfolio" className="underline">
                Portfolio
              </Link>{" "}
              too.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
