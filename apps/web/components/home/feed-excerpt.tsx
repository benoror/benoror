import { getAggregatedFeed } from "@/lib/feed"
import FeedExcerptClient, { type FeedExcerptItem } from "./feed-excerpt-client"

export default async function FeedExcerpt() {
  const feed = await getAggregatedFeed()
  const sourceById = new Map(feed.sources.map((source) => [source.id, source]))
  const items: FeedExcerptItem[] = feed.items.slice(0, 5).map((item) => {
    const source = sourceById.get(item.sourceId)

    return {
      id: item.id,
      title: item.title,
      link: item.link,
      sourceName: item.sourceName,
      sourceUrl: source?.siteUrl ?? item.sourceUrl,
      sourceRssUrl: source?.rssUrl,
    }
  })

  return <FeedExcerptClient items={items} />
}
