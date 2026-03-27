import { getAggregatedFeed } from "@/lib/feed"
import FeedExcerptClient, { type FeedExcerptItem } from "./feed-excerpt-client"

export default async function FeedExcerpt() {
  const feed = await getAggregatedFeed()
  const items: FeedExcerptItem[] = feed.items.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.title,
    link: item.link,
    sourceName: item.sourceName,
  }))

  return <FeedExcerptClient items={items} />
}
