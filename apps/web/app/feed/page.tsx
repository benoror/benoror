import type { Metadata } from "next"
import Link from "next/link"
import { Rss } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getAggregatedFeed } from "@/lib/feed"
import { LINKS } from "@workspace/data/personal"

export const metadata: Metadata = {
  title: "Feed | Ben Orozco",
  description: "Aggregated personal feed from blog posts, social updates, podcasts, and gists.",
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
})

const statusLabel: Record<"active" | "manual" | "private", string> = {
  active: "Active",
  manual: "Manual",
  private: "Private",
}

export const revalidate = 1800

export default async function FeedPage() {
  const feed = await getAggregatedFeed()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-24 flex-1">
        <div className="container mx-auto px-4 py-12 md:py-24 space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Feed</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A consolidated stream of my writing and activity, primarily powered by RSS/Atom and ordered
              by publish time.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={LINKS.feed_url}
                className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open consolidated RSS feed"
              >
                <Rss className="h-4 w-4" />
                Open consolidated RSS feed
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {feed.sources.map((source) => (
              <article
                key={source.id}
                className="rounded-lg border border-border/60 p-4 bg-background/70 backdrop-blur-sm space-y-2"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold">{source.name}</h2>
                  <span className="text-xs px-2 py-1 rounded-full border border-border/60 text-muted-foreground">
                    {statusLabel[source.status]}
                  </span>
                  {source.error ? (
                    <span className="text-xs px-2 py-1 rounded-full border border-amber-600/30 text-amber-500">
                      Feed unavailable
                    </span>
                  ) : null}
                </div>
                <div className="text-sm text-muted-foreground">
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
                {source.note ? <p className="text-sm text-muted-foreground">{source.note}</p> : null}
                {source.error ? <p className="text-sm text-amber-500">{source.error}</p> : null}
              </article>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Latest Items</h2>
            {feed.items.length === 0 ? (
              <p className="text-muted-foreground">No feed items available right now.</p>
            ) : (
              <ul className="space-y-3">
                {feed.items.map((item) => (
                  <li key={item.id} className="rounded-lg border border-border/60 p-4">
                    <div className="flex flex-col gap-2">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                      >
                        {item.title}
                      </a>
                      <div className="text-sm text-muted-foreground">
                        <span>{item.sourceName}</span>
                        {" · "}
                        <time dateTime={item.publishedAt}>{dateFormatter.format(new Date(item.publishedAt))}</time>
                      </div>
                      {item.summary ? <p className="text-sm text-muted-foreground">{item.summary}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Generated at {dateFormatter.format(new Date(feed.generatedAt))}. Looking for old posts? Visit{" "}
            <Link href="/portfolio" className="underline">
              Portfolio
            </Link>{" "}
            too.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
