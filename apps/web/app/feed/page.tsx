import type { Metadata } from "next"
import { getAggregatedFeed } from "@/lib/feed"
import { FeedPageClient } from "./feed-page.client"

export const metadata: Metadata = {
  title: "Feed | Ben Orozco",
  description: "Aggregated personal feed from blog posts, social updates, podcasts, and gists.",
}

export const revalidate = 1800

export default async function FeedPage() {
  const feed = await getAggregatedFeed()
  return <FeedPageClient feed={feed} />
}
