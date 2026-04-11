"use client"

import Link from "next/link"
import { Rss } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OutrunGrid from "@/components/outrun-hero-background"
import ExternalLink from "@/components/ui/external-link"
import FeedItemBody from "@/components/feed/feed-item-body"
import { LINKS } from "@workspace/data/shared/profile"
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
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-[1.03rem] font-medium hover:underline ${classes.itemTitle}`}
        >
          {item.title}
        </a>
        <div className={`text-[0.92rem] ${classes.meta} flex flex-wrap items-center gap-2`}>
            <ExternalLink
              href={sourceUrl}
              target="_blank"
              className={`inline-flex items-center gap-1 transition-colors hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 ${classes.link} ${classes.linkFocus}`}
            >
              {item.sourceName}
            </ExternalLink>
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
          <span>·</span>
          <time dateTime={item.publishedAt}>{dateFormatter.format(new Date(item.publishedAt))}</time>
        </div>
        <FeedItemBody
          body={item.body ?? item.summary}
          bodyFormat={item.bodyFormat}
          codeLanguage={item.codeLanguage}
          continueHref={item.link}
          continueLinkClassName={`text-sm underline underline-offset-4 ${classes.link}`}
          className={`text-[1.01rem] ${classes.body}`}
        />
        {item.alsoSharedTo && item.alsoSharedTo.length > 0 ? (
          <div className={`flex justify-end text-xs ${classes.meta}`}>
            <span className="mr-1">Also shared to:</span>
            <span className="flex flex-wrap items-center justify-end gap-1">
              {item.alsoSharedTo.map((shared, index) => (
                <span key={`${item.id}-${shared.sourceId}-${index}`}>
                  <a
                    href={shared.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline underline-offset-4 ${classes.link}`}
                  >
                    {shared.sourceName}
                  </a>
                  {index < item.alsoSharedTo!.length - 1 ? "," : ""}
                </span>
              ))}
            </span>
          </div>
        ) : null}
      </div>
    </li>
  )
}

type FeedPagination = {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
}

const getPageHref = (page: number) => (page <= 1 ? "/feed" : `/feed?page=${page}`)

function FeedPaginationControls({
  pagination,
  classes,
}: {
  pagination: FeedPagination
  classes: ReturnType<typeof getClasses>
}) {
  if (pagination.totalPages <= 1) {
    return null
  }

  return (
    <nav aria-label="Feed pagination" className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <Link
        href={getPageHref(Math.max(1, pagination.currentPage - 1))}
        aria-disabled={pagination.currentPage <= 1}
        className={`text-sm underline underline-offset-4 ${
          pagination.currentPage <= 1 ? "pointer-events-none opacity-50" : classes.link
        }`}
      >
        Previous
      </Link>

      <span className={`text-sm ${classes.meta}`}>
        Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalItems} items)
      </span>

      <Link
        href={getPageHref(Math.min(pagination.totalPages, pagination.currentPage + 1))}
        aria-disabled={pagination.currentPage >= pagination.totalPages}
        className={`text-sm underline underline-offset-4 ${
          pagination.currentPage >= pagination.totalPages ? "pointer-events-none opacity-50" : classes.link
        }`}
      >
        Next
      </Link>
    </nav>
  )
}

export function FeedPageClient({
  feed,
  pagination,
}: {
  feed: AggregatedFeed
  pagination: FeedPagination
}) {
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
                href={LINKS.feed.url}
                className={`inline-flex items-center gap-2 text-sm underline underline-offset-4 ${classes.link}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open consolidated RSS feed"
              >
                <Rss className="h-4 w-4" /> RSS
              </a>
            </div>

            <div className="space-y-4">
              <h2 className={`text-2xl font-semibold tracking-tight ${classes.heading}`}>Latest Items</h2>
              {feed.items.length === 0 ? (
                <p className={classes.body}>No feed items available right now.</p>
              ) : (
                <>
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
                  <FeedPaginationControls pagination={pagination} classes={classes} />
                </>
              )}
            </div>

            <p className={`text-xs ${classes.meta}`}>
              Generated at {dateFormatter.format(new Date(feed.generatedAt))}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
