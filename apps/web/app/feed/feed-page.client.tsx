"use client"

import Link from "next/link"
import { Rss } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OutrunGrid from "@/components/outrun-hero-background"
import { LINKS } from "@workspace/data/personal"
import { useAppTheme } from "@/hooks/use-app-theme"
import type { AggregatedFeed, AggregatedFeedItem, AggregatedFeedSource } from "@/lib/feed"
import { getClasses } from "./feed-page.theme"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
})

const statusLabel: Record<"active" | "manual" | "private", string> = {
  active: "Active",
  manual: "Manual",
  private: "Private",
}

function FeedSourceCard({
  source,
  classes,
}: {
  source: AggregatedFeedSource
  classes: ReturnType<typeof getClasses>
}) {
  return (
    <article className={`${classes.card} p-4 space-y-2`}>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className={`text-base font-semibold ${classes.itemTitle}`}>{source.name}</h2>
        <span className={`text-xs px-2 py-1 rounded-full border ${classes.badge}`}>{statusLabel[source.status]}</span>
        {source.error ? (
          <span className={`text-xs px-2 py-1 rounded-full border ${classes.warningBadge}`}>Feed unavailable</span>
        ) : null}
      </div>
      <div className={`text-sm ${classes.meta}`}>
        <a href={source.siteUrl} target="_blank" rel="noopener noreferrer" className="underline">
          Source site
        </a>
        {source.rssUrl ? (
          <>
            {" · "}
            <a href={source.rssUrl} target="_blank" rel="noopener noreferrer" className="underline">
              RSS/Atom
            </a>
          </>
        ) : null}
      </div>
      {source.note ? <p className={`text-sm ${classes.body}`}>{source.note}</p> : null}
      {source.error ? <p className={`text-sm ${classes.warningText}`}>{source.error}</p> : null}
    </article>
  )
}

function FeedItemCard({
  item,
  classes,
}: {
  item: AggregatedFeedItem
  classes: ReturnType<typeof getClasses>
}) {
  return (
    <li className={`${classes.card} p-4`}>
      <div className="flex flex-col gap-2">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className={`font-medium hover:underline ${classes.itemTitle}`}>
          {item.title}
        </a>
        <div className={`text-sm ${classes.meta}`}>
          <span>{item.sourceName}</span>
          {" · "}
          <time dateTime={item.publishedAt}>{dateFormatter.format(new Date(item.publishedAt))}</time>
        </div>
        {item.summary ? <p className={`text-sm ${classes.body}`}>{item.summary}</p> : null}
      </div>
    </li>
  )
}

export function FeedPageClient({ feed }: { feed: AggregatedFeed }) {
  const { themeKind } = useAppTheme()
  const classes = getClasses(themeKind)

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

            <div className="grid gap-4 md:grid-cols-2">
              {feed.sources.map((source) => (
                <FeedSourceCard key={source.id} source={source} classes={classes} />
              ))}
            </div>

            <div className="space-y-4">
              <h2 className={`text-2xl font-semibold tracking-tight ${classes.heading}`}>Latest Items</h2>
              {feed.items.length === 0 ? (
                <p className={classes.body}>No feed items available right now.</p>
              ) : (
                <ul className="space-y-3">
                  {feed.items.map((item) => (
                    <FeedItemCard key={item.id} item={item} classes={classes} />
                  ))}
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
