import type { MetadataRoute } from "next"
import { LINKS } from "@workspace/data/shared/profile"
import { getPodcast, getPodcastEpisodeUrl, PODCAST_CANONICAL_URL } from "@/lib/podcast"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const websiteUrl = LINKS.website.url.replace(/\/$/, "")
  const now = new Date()
  const podcast = await getPodcast()
  const episodeEntries: MetadataRoute.Sitemap = podcast.episodes.map((episode) => ({
    url: getPodcastEpisodeUrl(episode.slug),
    lastModified: new Date(episode.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    {
      url: `${websiteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${websiteUrl}/feed`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: PODCAST_CANONICAL_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${websiteUrl}/feed.rss`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/feed.xml`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...episodeEntries,
  ]
}
